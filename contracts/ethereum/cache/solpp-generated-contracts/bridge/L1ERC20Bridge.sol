pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT OR Apache-2.0



import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./interfaces/IL1Bridge.sol";
import "./interfaces/IL2Bridge.sol";

import "../common/interfaces/IAllowList.sol";
import "../common/AllowListed.sol";
import "../common/libraries/UnsafeBytes.sol";
import "../common/ReentrancyGuard.sol";
import "../common/L2ContractHelper.sol";

/// @author Matter Labs
/// @notice Smart contract that allows depositing ERC20 tokens from Ethereum to zkSync v2.0
/// @dev It is standard implementation of ERC20 Bridge that can be used as a refference
/// for any other custom token bridges.
contract L1ERC20Bridge is IL1Bridge, AllowListed, ReentrancyGuard {
    using SafeERC20 for IERC20;

    /// @dev The smart contract that manages the list with permission to call contract functions
    IAllowList immutable allowList;

    /// @dev zkSync smart contract that used to operate with L2 via asynchronous L2 <-> L1 communication
    IMailbox immutable zkSyncMailbox;

    /// @dev Ergs limit for requesting L2 deposit finalization transaction
    /// NOTE: constant is not calculated accurately, because ergs count in L2 is not stable yet
    uint256 constant DEPOSIT_ERGS_LIMIT = 2097152;

    /// @dev Ergs limit for requesting L1 -> L2 transaction of deploying L2 bridge instance
    /// NOTE: constant is not calculated accurately, because ergs count in L2 is not stable yet
    uint256 constant DEPLOY_L2_BRIDGE_COUNTERPART_ERGS_LIMIT = 2097152;

    /// @dev A mapping L2 block number => message number => flag
    /// @dev Used to indicate that zkSync L2 -> L1 message was already processed
    mapping(uint256 => mapping(uint256 => bool)) public isWithdrawalFinalized;

    /// @dev A mapping account => L1 token address => L2 deposit transaction hash => amount
    /// @dev Used for saving the number of deposited funds, to claim them in case the deposit transaction will fail
    mapping(address => mapping(address => mapping(bytes32 => uint256))) depositAmount;

    /// @dev The address of deployed L2 bridge counterpart
    address public l2Bridge;

    /// @dev The address of the factory that deploys proxy for L2 tokens
    address public l2TokenFactory;

    /// @dev The bytecode hash of the L2 token contract
    bytes32 public l2ProxyTokenBytecodeHash;

    /// @dev Contract is expected to be used as proxy implementation.
    /// @dev Initialize the implementation to prevent Parity hack.
    constructor(IMailbox _mailbox, IAllowList _allowList) reentrancyGuardInitializer {
        zkSyncMailbox = _mailbox;
        allowList = _allowList;
    }

    /// @dev Initializes a contract bridge for later use. Expected to be used in the proxy
    /// @dev During initialization deploys L2 bridge counterpart as well as provides some factory deps for it
    /// @param _factoryDeps A list of raw bytecodes that are needed for deployment of the L2 bridge
    /// @notice _factoryDeps[0] == a raw bytecode of L2 bridge
    /// @notice _factoryDeps[1] == a raw bytecode of token proxy
    /// @param _l2TokenFactory Pre-calculated address of L2 token beacon proxy
    /// @notice At the time of the function call, it is not yet deployed in L2, but knowledge of its address
    /// @notice is necessary for determining L2 token address by L1 address, see `l2TokenAddress(address)` function
    /// @param _governor Address which can change L2 token implementation
    function initialize(
        bytes[] memory _factoryDeps,
        address _l2TokenFactory,
        address _governor
    ) external reentrancyGuardInitializer {
        // We are expecting to see the exect two bytecodes that are needed to initiailize the bridge
        require(_factoryDeps.length == 2, "mk");
        l2ProxyTokenBytecodeHash = L2ContractHelper.hashL2Bytecode(_factoryDeps[1]);
        l2TokenFactory = _l2TokenFactory;

        bytes32 create2Salt = bytes32(0);
        bytes memory create2Input = abi.encode(address(this), l2ProxyTokenBytecodeHash, _governor);
        bytes32 l2BridgeBytecodeHash = L2ContractHelper.hashL2Bytecode(_factoryDeps[0]);
        bytes memory deployL2BridgeCalldata = abi.encodeCall(
            IContractDeployer.create2,
            (create2Salt, l2BridgeBytecodeHash, create2Input)
        );

        l2Bridge = L2ContractHelper.computeCreate2Address(
            address(this),
            create2Salt,
            l2BridgeBytecodeHash,
            keccak256(create2Input)
        );

        zkSyncMailbox.requestL2Transaction(
            DEPLOYER_SYSTEM_CONTRACT_ADDRESS,
            0,
            deployL2BridgeCalldata,
            DEPLOY_L2_BRIDGE_COUNTERPART_ERGS_LIMIT,
            _factoryDeps
        );
    }

    /// @notice Initiates a deposit by locking funds on the contract and sending the request
    /// of processing an L2 transaction where tokens would be minted
    /// @param _l2Receiver The account address that should receive funds on L2
    /// @param _l1Token The L1 token address which is deposited
    /// @param _amount The total amount of tokens to be bridged
    /// @return txHash The L2 transaction hash of deposit finalization
    function deposit(
        address _l2Receiver,
        address _l1Token,
        uint256 _amount
    ) external payable nonReentrant senderCanCallFunction(allowList) returns (bytes32 txHash) {
        uint256 amount = _depositFunds(msg.sender, IERC20(_l1Token), _amount);
        require(amount > 0, "1T"); // empty deposit amount

        bytes memory l2TxCalldata = _getDepositL2Calldata(msg.sender, _l2Receiver, _l1Token, amount);
        txHash = zkSyncMailbox.requestL2Transaction{value: msg.value}(
            l2Bridge,
            0, // L2 msg.value
            l2TxCalldata,
            DEPOSIT_ERGS_LIMIT,
            new bytes[](0)
        );

        // Save the deposited amount to claim funds on L1 if the deposit failed on L2
        depositAmount[msg.sender][_l1Token][txHash] = amount;

        emit DepositInitiated(msg.sender, _l2Receiver, _l1Token, amount);
    }

    /// @dev Transfers tokens from the depositor address to the smart contract address
    /// @return The difference between the contract balance before and after the transferring funds
    function _depositFunds(
        address _from,
        IERC20 _token,
        uint256 _amount
    ) internal returns (uint256) {
        uint256 balanceBefore = _token.balanceOf(address(this));
        _token.safeTransferFrom(_from, address(this), _amount);
        uint256 balanceAfter = _token.balanceOf(address(this));

        return balanceAfter - balanceBefore;
    }

    /// @dev Generate a calldata for calling the deposit finalization on the L2 bridge contract
    function _getDepositL2Calldata(
        address _l1Sender,
        address _l2Receiver,
        address _l1Token,
        uint256 _amount
    ) internal view returns (bytes memory txCalldata) {
        bytes memory gettersData = _getERC20Getters(_l1Token);

        txCalldata = abi.encodeCall(
            IL2Bridge.finalizeDeposit,
            (_l1Sender, _l2Receiver, _l1Token, _amount, gettersData)
        );
    }

    /// @dev Receives and parses (name, symbol, decimals) from the token contract
    function _getERC20Getters(address _token) internal view returns (bytes memory data) {
        (, bytes memory data1) = _token.staticcall(abi.encodeCall(IERC20Metadata.name, ()));
        (, bytes memory data2) = _token.staticcall(abi.encodeCall(IERC20Metadata.symbol, ()));
        (, bytes memory data3) = _token.staticcall(abi.encodeCall(IERC20Metadata.decimals, ()));
        data = abi.encode(data1, data2, data3);
    }

    /// @dev Withdraw funds from the initiated deposit, that failed when finalizing on L2
    /// @param _depositSender The address of the deposit initiator
    /// @param _l1Token The address of the deposited L1 ERC20 token
    /// @param _l2TxHash The L2 transaction hash of the failed deposit finalization
    /// @param _l2BlockNumber The L2 block number where the deposit finalization was processed
    /// @param _l2MessageIndex The position in the L2 logs Merkle tree of the l2Log that was sent with the message
    /// @param _l2TxNumberInBlock The L2 transaction number in a block, in which the log was sent
    /// @param _merkleProof The Merkle proof of the processing L1 -> L2 transaction with deposit finalization
    function claimFailedDeposit(
        address _depositSender,
        address _l1Token,
        bytes32 _l2TxHash,
        uint256 _l2BlockNumber,
        uint256 _l2MessageIndex,
        uint16 _l2TxNumberInBlock,
        bytes32[] calldata _merkleProof
    ) external nonReentrant senderCanCallFunction(allowList) {
        // Bootloader sends an L2 -> L1 log only after processing the L1 -> L2 transaction.
        // Thus, we can verify that the deposit (L1 -> L2 transaction) was included in the L2 block with failed status.
        //
        // The semantics of such L2 -> L1 log is always:
        // - sender = BOOTLOADER_ADDRESS
        // - key = hash(L1ToL2Transaction)
        // - value = status of the processing transaction (1 - success & 0 for fail)
        // - isService = true (just a conventional value)
        // - l2ShardId = 0 (means that L1 -> L2 transaction was processed in a rollup shard, other shards are not available yet anyway)
        // - txNumberInBlock = number of transaction in the block
        L2Log memory l2Log = L2Log({
            l2ShardId: 0,
            isService: true,
            txNumberInBlock: _l2TxNumberInBlock,
            sender: BOOTLOADER_ADDRESS,
            key: _l2TxHash,
            value: bytes32(0)
        });
        bool success = zkSyncMailbox.proveL2LogInclusion(_l2BlockNumber, _l2MessageIndex, l2Log, _merkleProof);
        require(success, "yn");

        uint256 amount = depositAmount[_depositSender][_l1Token][_l2TxHash];
        require(amount > 0, "y1");

        delete depositAmount[_depositSender][_l1Token][_l2TxHash];
        // Withdraw funds
        IERC20(_l1Token).safeTransfer(_depositSender, amount);

        emit ClaimedFailedDeposit(_depositSender, _l1Token, amount);
    }

    /// @notice Finalize the withdrawal and release funds
    /// @param _l2BlockNumber The L2 block number where the withdrawal was processed
    /// @param _l2MessageIndex The position in the L2 logs Merkle tree of the l2Log that was sent with the message
    /// @param _l2TxNumberInBlock The L2 transaction number in a block, in which the log was sent
    /// @param _message The L2 withdraw data, stored in an L2 -> L1 message
    /// @param _merkleProof The Merkle proof of the inclusion L2 -> L1 message about withdrawal initialization
    function finalizeWithdrawal(
        uint256 _l2BlockNumber,
        uint256 _l2MessageIndex,
        uint16 _l2TxNumberInBlock,
        bytes calldata _message,
        bytes32[] calldata _merkleProof
    ) external nonReentrant senderCanCallFunction(allowList) {
        require(!isWithdrawalFinalized[_l2BlockNumber][_l2MessageIndex], "pw");

        L2Message memory l2ToL1Message = L2Message({
            txNumberInBlock: _l2TxNumberInBlock,
            sender: l2Bridge,
            data: _message
        });

        (address l1Receiver, address l1Token, uint256 amount) = _parseL2WithdrawalMessage(l2ToL1Message.data);
        // Preventing the stack too deep error
        {
            bool success = zkSyncMailbox.proveL2MessageInclusion(
                _l2BlockNumber,
                _l2MessageIndex,
                l2ToL1Message,
                _merkleProof
            );
            require(success, "nq");
        }

        isWithdrawalFinalized[_l2BlockNumber][_l2MessageIndex] = true;
        // Withdraw funds
        IERC20(l1Token).safeTransfer(l1Receiver, amount);

        emit WithdrawalFinalized(l1Receiver, l1Token, amount);
    }

    /// @dev Decode the withdraw message that came from L2
    function _parseL2WithdrawalMessage(bytes memory _l2ToL1message)
        internal
        pure
        returns (
            address l1Receiver,
            address l1Token,
            uint256 amount
        )
    {
        // Check that the message length is correct.
        // It should be equal to the length of the function signature + address + address + uint256 = 4 + 20 + 20 + 32 = 76 (bytes).
        require(_l2ToL1message.length == 76, "kk");

        (uint32 functionSignature, uint256 offset) = UnsafeBytes.readUint32(_l2ToL1message, 0);
        require(bytes4(functionSignature) == this.finalizeWithdrawal.selector, "nt");

        (l1Receiver, offset) = UnsafeBytes.readAddress(_l2ToL1message, offset);
        (l1Token, offset) = UnsafeBytes.readAddress(_l2ToL1message, offset);
        (amount, offset) = UnsafeBytes.readUint256(_l2ToL1message, offset);
    }

    /// @return The L2 token address that would be minted for deposit of the given L1 token
    function l2TokenAddress(address _l1Token) public view returns (address) {
        bytes32 constructorInputHash = keccak256(abi.encode(address(l2TokenFactory), ""));
        bytes32 salt = bytes32(uint256(uint160(_l1Token)));

        return L2ContractHelper.computeCreate2Address(l2Bridge, salt, l2ProxyTokenBytecodeHash, constructorInputHash);
    }
}
