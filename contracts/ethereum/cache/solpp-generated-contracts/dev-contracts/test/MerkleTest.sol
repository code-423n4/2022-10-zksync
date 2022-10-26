pragma solidity ^0.8.0;

// SPDX-License-Identifier: UNLICENSED



import "../../zksync/libraries/Merkle.sol";

contract MerkleTest {
    function calculateRoot(
        bytes32[] calldata _path,
        uint256 _index,
        bytes32 _itemHash
    ) external pure returns (bytes32) {
        return Merkle.calculateRoot(_path, _index, _itemHash);
    }
}
