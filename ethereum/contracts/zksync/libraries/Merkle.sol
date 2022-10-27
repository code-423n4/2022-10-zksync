// SPDX-License-Identifier: MIT OR Apache-2.0

pragma solidity ^0.8.0;

import "../../common/libraries/UncheckedMath.sol";

/// @author Matter Labs
library Merkle {
    using UncheckedMath for uint256;

    /// @dev Calculate Merkle root by the provided Merkle proof.
    /// NOTE: When using this function, check that the _path length is equal to the tree height to prevent shorter/longer paths attack
    /// @param _path Merkle path from the leaf to the root
    /// @param _index Leaf index in the tree
    /// @param _itemHash Hash of leaf content
    /// @return The Merkle root
    function calculateRoot(
        bytes32[] calldata _path,
        uint256 _index,
        bytes32 _itemHash
    ) internal pure returns (bytes32) {
        uint256 pathLength = _path.length;
        require(pathLength > 0, "xc");
        require(pathLength < 256, "bt");
        require(_index < 2**pathLength, "pz");

        bytes32 currentHash = _itemHash;
        for (uint256 i = 0; i < pathLength; i = i.uncheckedInc()) {
            if (_index % 2 == 0) {
                currentHash = keccak256(abi.encode(currentHash, _path[i]));
            } else {
                currentHash = keccak256(abi.encode(_path[i], currentHash));
            }
            _index /= 2;
        }

        return currentHash;
    }
}
