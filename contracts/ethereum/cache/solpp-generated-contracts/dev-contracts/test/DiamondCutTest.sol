pragma solidity ^0.8.0;

// SPDX-License-Identifier: UNLICENSED



import "../../zksync/libraries/Diamond.sol";
import "../../zksync/facets/Getters.sol";

contract DiamondCutTest is GettersFacet {
    function diamondCut(Diamond.DiamondCutData memory _diamondCut) external {
        Diamond.diamondCut(_diamondCut);
    }
}
