pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT OR Apache-2.0



import "./interfaces/IL1Bridge.sol";
import "./interfaces/IL2Bridge.sol";

import "../common/interfaces/IAllowList.sol";
import "../common/AllowListed.sol";
import "../common/libraries/UnsafeBytes.sol";
import "../common/L2ContractHelper.sol";
import "../common/ReentrancyGuard.sol";

/// @author Matter Labs
/// @notice Default bridge for the native ether to zkSync 2.0.
/// @notice This smart contracts is the only one way to get native ether inside the L2.
contract L1EthBridge is IL1Bridge, AllowListed, ReentrancyGuard {
    /// @dev The smart contract that manages the list with permission to call contract functions
    IAllowList immutable allowList;

    /// @dev zkSync smart contract used to interact with L2 via asynchronous L2 <-> L1 communication
    IMailbox immutable zkSyncMailbox;

    /// @dev Ergs limit for requesting L2 deposit finalization transaction
    /// NOTE: constant is not calculated accurately, because ergs count in L2 is not stable yet
    uint256 constant DEPOSIT_ERGS_LIMIT = 2097152;

    /// @dev Ergs limit for requesting L1 -> L2 transaction of deploying L2 bridge instance
    /// NOTE: constant is not calculated accurately, because ergs count in L2 is not stable yet
    uint256 constant DEPLOY_L2_BRIDGE_COUNTERPART_ERGS_LIMIT = 2097152;

    /// @dev Ether native coin has no real address on L1, so a conventional zero address is used.
    address constant CONVENTIONAL_ETH_ADDRESS = address(0);

    /// @dev A mapping L2 block number => message number => flag
    /// @dev Used to indicate that zkSync L2 -> L1 message was already processed
    mapping(uint256 => mapping(uint256 => bool)) public isWithdrawalFinalized;

    /// @dev A mapping account => L1 token address => L2 deposit transaction hash => amount
    /// @dev Used for saving the number of deposited funds, to claim them in case the deposit transaction will fail
    mapping(address => mapping(bytes32 => uint256)) depositAmount;

    /// @dev The address of deployed L2 bridge counterpart
    address public l2Bridge;

    /// @dev Contract is expected to be used as proxy implementation.
    /// @dev Initialize the implementation to prevent Parity hack.
    constructor(IMailbox _mailbox, IAllowList _allowList) reentrancyGuardInitializer {
        zkSyncMailbox = _mailbox;
        allowList = _allowList;
    }

    /// @dev Initializes a contract bridge for later use. Expected to be used in the proxy.
    /// @dev Deploys L2 bridge counterpart during initialization.
    /// @param _l2BridgeBytecode a raw bytecode of the L2 bridge contract, that will be deployed on L2.
    function initialize(bytes calldata _l2BridgeBytecode) external reentrancyGuardInitializer {
        bytes32 create2Salt = bytes32(0);
        bytes memory create2Input = abi.encode(address(this));
        bytes32 l2BridgeBytecodeHash = L2ContractHelper.hashL2Bytecode(_l2BridgeBytecode);
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
        bytes[] memory factoryDeps = new bytes[](1);
        factoryDeps[0] = _l2BridgeBytecode;
        zkSyncMailbox.requestL2Transaction(
            DEPLOYER_SYSTEM_CONTRACT_ADDRESS,
            0,
            deployL2BridgeCalldata,
            DEPLOY_L2_BRIDGE_COUNTERPART_ERGS_LIMIT,
            factoryDeps
        );
    }

    /// @notice Initiates a deposit by locking funds on the contract and sending the request
    /// of processing an L2 transaction where ether would be minted
    /// @param _l2Receiver The account address that should receive funds on L2
    /// @param _l1Token The L1 token address which is deposited. Always should be equal to zero
    /// @param _amount The total amount of ether to be bridged
    /// @return txHash The L2 transaction hash of deposit finalization
    function deposit(
        address _l2Receiver,
        address _l1Token,
        uint256 _amount
    ) external payable nonReentrant senderCanCallFunction(allowList) returns (bytes32 txHash) {
        require(_l1Token == CONVENTIONAL_ETH_ADDRESS, "bx");

        // Will revert if msg.value is less than the amount of the deposit
        uint256 zkSyncFee = msg.value - _amount;
        bytes memory l2TxCalldata = _getDepositL2Calldata(msg.sender, _l2Receiver, _amount);
        txHash = zkSyncMailbox.requestL2Transaction{value: zkSyncFee}(
            l2Bridge,
            0, // L2 msg.value
            l2TxCalldata,
            DEPOSIT_ERGS_LIMIT,
            new bytes[](0)
        );

        // Save the deposit amount, to claim funds back if the L2 transaction will failed
        depositAmount[msg.sender][txHash] = _amount;

        emit DepositInitiated(msg.sender, _l2Receiver, _l1Token, _amount);
    }

    /// @dev Serialize the transaction calldata for the L2 bridge counterpart
    function _getDepositL2Calldata(
        address _l1Sender,
        address _l2Receiver,
        uint256 _amount
    ) internal pure returns (bytes memory txCalldata) {
        txCalldata = abi.encodeCall(
            IL2Bridge.finalizeDeposit,
            (_l1Sender, _l2Receiver, CONVENTIONAL_ETH_ADDRESS, _amount, hex"")
        );
    }

    /// @dev Withdraw funds from the initiated deposit, that failed when finalizing on L2
    /// @param _depositSender The address of the deposit initiator
    /// @param _l1Token The address of the deposited L1 token (should always be zero)
    /// @param _l2TxHash The L2 transaction hash of the deposit finalization
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
    ) external override nonReentrant senderCanCallFunction(allowList) {
        require(_l1Token == CONVENTIONAL_ETH_ADDRESS, "sj");

        // Checks
        uint256 amount = depositAmount[_depositSender][_l2TxHash];
        require(amount != 0);

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
        require(success, "ju");

        // Effects
        delete depositAmount[_depositSender][_l2TxHash];
        // Interactions
        _withdrawFunds(_depositSender, amount);

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
    ) external override nonReentrant senderCanCallFunction(allowList) {
        require(!isWithdrawalFinalized[_l2BlockNumber][_l2MessageIndex], "jj");

        L2Message memory l2ToL1Message = L2Message({
            txNumberInBlock: _l2TxNumberInBlock,
            sender: l2Bridge,
            data: _message
        });

        (address l1Receiver, uint256 amount) = _parseL2WithdrawalMessage(_message);

        bool success = zkSyncMailbox.proveL2MessageInclusion(
            _l2BlockNumber,
            _l2MessageIndex,
            l2ToL1Message,
            _merkleProof
        );
        require(success, "rj");

        isWithdrawalFinalized[_l2BlockNumber][_l2MessageIndex] = true;
        _withdrawFunds(l1Receiver, amount);

        emit WithdrawalFinalized(l1Receiver, CONVENTIONAL_ETH_ADDRESS, amount);
    }

    /// @dev Decode the withdraw message that came from L2
    function _parseL2WithdrawalMessage(bytes memory _message)
        internal
        pure
        returns (address l1Receiver, uint256 amount)
    {
        // Check that the message length is correct.
        // It should be equal to the length of the function signature + address + uint256 = 4 + 20 + 32 = 56 (bytes).
        require(_message.length == 56);

        (uint32 functionSignature, uint256 offset) = UnsafeBytes.readUint32(_message, 0);
        require(bytes4(functionSignature) == this.finalizeWithdrawal.selector);

        (l1Receiver, offset) = UnsafeBytes.readAddress(_message, offset);
        (amount, offset) = UnsafeBytes.readUint256(_message, offset);
    }

    /// @notice Transfer ether from the contract to the receiver
    /// @dev Reverts only if the transfer call failed
    function _withdrawFunds(address _to, uint256 _amount) internal {
        bool callSuccess;
        // Low-level assembly call, to avoid any memory copying (save gas)
        assembly {
            callSuccess := call(gas(), _to, _amount, 0, 0, 0, 0)
        }
        require(callSuccess);
    }

    /// @notice The L2 token address that would be minted for deposit of the given L1 token
    /// @dev Ignore function input and always return zero address as a only one token that the bridge process
    function l2TokenAddress(address) public pure returns (address) {
        return CONVENTIONAL_ETH_ADDRESS;
    }
}
