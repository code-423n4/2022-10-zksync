pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT OR Apache-2.0



import {L2ContractHelper} from "../L2ContractHelper.sol";

import "./interfaces/IL1Bridge.sol";
import "./interfaces/IL2Bridge.sol";
import "./interfaces/IL2EthInitializable.sol";
import "./interfaces/IL2StandardToken.sol";

/// @author Matter Labs
/// @dev This contract is used for bridging the ether from L1.
contract L2ETHBridge is IL2Bridge {
    /// @dev The total amount of tokens that have been minted
    uint256 public totalSupply;

    /// @dev Mapping of address to the balance
    mapping(address => uint256) public balanceOf;

    /// @dev Address of the L1 bridge counterpart
    address public override l1Bridge;

    /// @dev System contract that is responsible for storing and changing ether balances
    IL2StandardToken constant ETH_TOKEN_SYSTEM_CONTRACT_ADDRESS = IL2StandardToken(address(0x800a));

    /// @dev Ether native coin has no real address on L1, so a conventional zero address is used
    address constant CONVENTIONAL_ETH_ADDRESS = address(0);

    constructor(address _l1Bridge) {
        l1Bridge = _l1Bridge;

        IL2EthInitializable(address(ETH_TOKEN_SYSTEM_CONTRACT_ADDRESS)).initialization(address(this));
    }

    /// @dev Finalize the deposit and mint ether to the deposited address
    /// @param _l1Sender The account address that initiate the deposit on L1
    /// @param _l2Receiver The account address that would receive minted ether
    /// @param _l1Token The address of the token that was locked on the L1. Always should be equal to zero (conventional value)
    /// @param _amount Total amount of ether deposited from L1
    function finalizeDeposit(
        address _l1Sender,
        address _l2Receiver,
        address _l1Token,
        uint256 _amount,
        bytes calldata // _data
    ) external {
        // Only L1 bridge counterpart can initiate and finalize the deposit
        require(msg.sender == l1Bridge, "ni");
        require(_l1Token == CONVENTIONAL_ETH_ADDRESS);

        ETH_TOKEN_SYSTEM_CONTRACT_ADDRESS.bridgeMint(_l2Receiver, _amount);

        emit FinalizeDeposit(_l1Sender, _l2Receiver, CONVENTIONAL_ETH_ADDRESS, _amount);
    }

    /// @dev Initiate withdrawal ethers from L2 contract to the L1
    /// NOTE: In order to get funds on L1, receiver should finalise deposit on L1 counterpart
    function withdraw(
        address _l1Receiver,
        address _l2Token,
        uint256 _amount
    ) external override {
        require(_l2Token == CONVENTIONAL_ETH_ADDRESS, "zn");

        ETH_TOKEN_SYSTEM_CONTRACT_ADDRESS.bridgeBurn(msg.sender, _amount);
        bytes memory message = _getL1WithdrawMessage(_l1Receiver, _amount);
        L2ContractHelper.sendMessageToL1(message);

        emit WithdrawalInitiated(msg.sender, _l1Receiver, CONVENTIONAL_ETH_ADDRESS, _amount);
    }

    /// @dev Get the "withdrawal initialized" fact message to be sent on L1
    function _getL1WithdrawMessage(address _to, uint256 _amount) internal pure returns (bytes memory) {
        return abi.encodePacked(IL1Bridge.finalizeWithdrawal.selector, _to, _amount);
    }

    /// @notice Address of the L2 token by its L1 couterpart
    function l2TokenAddress(address) public pure returns (address) {
        return CONVENTIONAL_ETH_ADDRESS;
    }

    /// @notice Address of the L1 token by its L2 couterpart
    function l1TokenAddress(address) public pure override returns (address) {
        return CONVENTIONAL_ETH_ADDRESS;
    }
}
