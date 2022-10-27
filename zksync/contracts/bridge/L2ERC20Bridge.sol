// SPDX-License-Identifier: MIT OR Apache-2.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

import "./interfaces/IL1Bridge.sol";
import "./interfaces/IL2Bridge.sol";
import "./interfaces/IL2StandardToken.sol";

import "./L2StandardERC20.sol";
import {L2ContractHelper} from "../L2ContractHelper.sol";

/// @author Matter Labs
/// @notice The "default" bridge implementation for the ERC20 tokens.
contract L2ERC20Bridge is IL2Bridge {
    /// @dev The address of the L1 bridge counterpart.
    address public override l1Bridge;

    /// @dev Contract that store the implementation address for token.
    /// @dev For more details see https://docs.openzeppelin.com/contracts/3.x/api/proxy#UpgradeableBeacon.
    UpgradeableBeacon public l2TokenFactory;

    /// @dev Bytecode hash of the proxy for tokens deployed by the bridge.
    bytes32 l2TokenProxyBytecodeHash;

    /// @dev A mapping l2 token address => l1 token address
    mapping(address => address) public override l1TokenAddress;

    constructor(
        address _l1Bridge,
        bytes32 _l2TokenProxyBytecodeHash,
        address _governor
    ) {
        l1Bridge = _l1Bridge;

        l2TokenProxyBytecodeHash = _l2TokenProxyBytecodeHash;
        address l2StandardToken = address(new L2StandardERC20{salt: bytes32(0)}());
        l2TokenFactory = new UpgradeableBeacon{salt: bytes32(0)}(l2StandardToken);
        l2TokenFactory.transferOwnership(_governor);
    }

    /// @notice Finalize the deposit and mint funds
    /// @param _l1Sender The account address that initiate the deposit on L1
    /// @param _l2Receiver The account address that would receive minted ether
    /// @param _l1Token The address of the token that was locked on the L1. Always should be equal to zero (conventional value)
    /// @param _amount Total amount of tokens deposited from L1
    /// @param _data The additional data that user can pass with the deposit
    function finalizeDeposit(
        address _l1Sender,
        address _l2Receiver,
        address _l1Token,
        uint256 _amount,
        bytes calldata _data
    ) external override {
        // Only L1 bridge counterpart can initiate and finalize the deposit
        require(msg.sender == l1Bridge, "mq");

        address expectedL2Token = l2TokenAddress(_l1Token);
        if (l1TokenAddress[expectedL2Token] == address(0)) {
            address deployedToken = _deployL2Token(_l1Token, _data);
            require(deployedToken == expectedL2Token, "mt");
            l1TokenAddress[expectedL2Token] = _l1Token;
        }

        IL2StandardToken(expectedL2Token).bridgeMint(_l2Receiver, _amount);

        emit FinalizeDeposit(_l1Sender, _l2Receiver, expectedL2Token, _amount);
    }

    /// @dev Deploys and initialize the L2 token for the L1 counterpart
    function _deployL2Token(address _l1Token, bytes calldata _data) internal returns (address) {
        bytes32 salt = _getCreate2Salt(_l1Token);

        BeaconProxy l2Token = new BeaconProxy{salt: salt}(address(l2TokenFactory), "");
        L2StandardERC20(address(l2Token)).bridgeInitialize(_l1Token, _data);

        return address(l2Token);
    }

    /// @notice Initiates a withdrawal by burning funds on the contract and sending the message to L1
    /// where tokens would be unlocked
    /// @param _l1Receiver The account address that should receive funds on L1
    /// @param _l2Token The L2 token address which is withdrawn
    /// @param _amount The total amount of tokens to be withdrawn
    function withdraw(
        address _l1Receiver,
        address _l2Token,
        uint256 _amount
    ) external override {
        IL2StandardToken(_l2Token).bridgeBurn(msg.sender, _amount);

        address l1Token = l1TokenAddress[_l2Token];
        require(l1Token != address(0), "yh");

        bytes memory message = _getL1WithdrawMessage(_l1Receiver, l1Token, _amount);
        L2ContractHelper.sendMessageToL1(message);

        emit WithdrawalInitiated(msg.sender, _l1Receiver, _l2Token, _amount);
    }

    /// @dev Encode the message for l2ToL1log sent with withdraw initialization
    function _getL1WithdrawMessage(
        address _to,
        address _l1Token,
        uint256 _amount
    ) internal pure returns (bytes memory) {
        return abi.encodePacked(IL1Bridge.finalizeWithdrawal.selector, _to, _l1Token, _amount);
    }

    /// @return Address of an L2 token counterpart
    function l2TokenAddress(address _l1Token) public view override returns (address) {
        bytes32 constructorInputHash = keccak256(abi.encode(address(l2TokenFactory), ""));
        bytes32 salt = _getCreate2Salt(_l1Token);

        return
            L2ContractHelper.computeCreate2Address(address(this), salt, l2TokenProxyBytecodeHash, constructorInputHash);
    }

    /// @dev Convert the L1 token address to the create2 salt of deployed L2 token
    function _getCreate2Salt(address _l1Token) internal pure returns (bytes32 salt) {
        salt = bytes32(uint256(uint160(_l1Token)));
    }
}
