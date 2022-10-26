pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT OR Apache-2.0



/// @author Matter Labs
interface IL1Bridge {
    function finalizeWithdrawal(
        uint256 _l2BlockNumber,
        uint256 _l2MessageIndex,
        uint16 _l2TxNumberInBlock,
        bytes calldata _message,
        bytes32[] calldata _merkleProof
    ) external;
}
