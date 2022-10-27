## ⭐️ Sponsor: Edit this README

Under "SPONSORS ADD INFO HERE" heading below, include the following:

- [ ] Under the "Scope" heading, provide the name of each contract and:
  - [ ] source lines of code (excluding blank lines and comments) in each
  - [ ] external contracts called in each
  - [ ] libraries used in each
---

# zkSync v2 contest details
- Total Prize Pool: $165,500 USDC
  - HM awards: $127,500 USDC
  - QA report awards: $15,000 USDC
  - Gas report awards: $7,500 USDC
  - Judge + presort awards: $15,000 USDC
  - Scout awards: $500 USDC
- Join [C4 Discord](https://discord.gg/code4rena) to register
- Submit findings [using the C4 form](https://code4rena.com/contests/2022-10-zksync-v2-contest/submit)
- [Read our guidelines for more details](https://docs.code4rena.com/roles/wardens)
- Starts October 28, 2022 20:00 UTC
- Ends November 9, 2022 20:00 UTC

## C4udit / Publicly Known Issues

1. Merke library ([Merkle.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/libraries/Merkle.sol)) does not checkt that \_path length is equal to the tree height.
2. [UPGRADE\_NOTICE\_PERIOD](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/hardhat.config.ts#L9) is set to 0 during alpha.
3. `supportsInterface` of `ERC-165` standard is not implemented.
4. Solidity version is not pinned in the source files. It is pinned in the [config](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/hardhat.config.ts#L82) instead.

The C4audit output for the contest can be found here, [include link to C4udit report], within an hour of contest opening.

*Note for C4 wardens: Anything included in the C4udit output is considered a publicly known issue and is ineligible for awards.*

# Overview

We are releasing Layer 1 smart contracts for [zkSync version 2.0](https://v2.zksync.io/) - a general-purpose zero knowledge rollup solution for Ethereum. For more information and fundamental concepts please refer to the documentation [here](https://v2-docs.zksync.io/dev/#fundamental-topics).

This repository contains Layer 1 (i.e. Ethereum mainnet) part of zkSync v2.0, a set of Solidity smart contracts that take care of governance, upgradability, L1 to L2 communication, etc. Detailed description of these smart contracts and their purpose can be found [here](https://matterlabs.notion.site/zkSync-2-0-smart-contracts-overview-fad227fac94241898417771e4a415f83).

Please pay special attention to any issues allowing:
- Unauthorized upgrade
- Successful verification of an invalid block
- Execution of an unverified block

While we are in Alpha version of the system it is assumed that Matter Labs, an operator/governor behind zkSync, is not malicious. Any findings that require governor privileges will therefore be considered irrelevant.

# Scope

## L1 contracts

### zkSync

| Contract | SLOC | Libraries used |  
| ----------- | ----------- | ----------- |
| Diamond | | |
| [ethereum/contracts/zksync/DiamondProxy.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/DiamondProxy.sol) | TODO |  |
| [ethereum/contracts/zksync/DiamondInit.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/DiamondInit.sol) | TODO |  |
| [ethereum/contracts/zksync/Config.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/Config.sol) | TODO | TODO |
| [ethereum/contracts/zksync/Storage.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/Storage.sol) | TODO | TODO |
| ethereum/contracts/zksync/facets/Base.sol | TODO | TODO |
| ethereum/contracts/zksync/facets/DiamondCut.sol | TODO | TODO |
| ethereum/contracts/zksync/facets/Executor.sol | TODO | TODO |
| ethereum/contracts/zksync/facets/Getters.sol | TODO | TODO |
| ethereum/contracts/zksync/facets/Governance.sol | TODO | TODO |
| ethereum/contracts/zksync/facets/Mailbox.sol | TODO | TODO |
| Verifier| | |
| [ethereum/contracts/zksync/Verifier.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/Verifier.sol) | TODO | TODO |
| [ethereum/contracts/zksync/Plonk4VerifierWithAccessToDNext.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/Plonk4VerifierWithAccessToDNext.sol) | TODO | TODO |
| Libraries | | |
| ethereum/contracts/zksync/libraries/Diamond.sol | TODO | TODO |
| ethereum/contracts/zksync/libraries/Merkle.sol | TODO | TODO |
| ethereum/contracts/zksync/libraries/PairingsBn254.sol | TODO | TODO |
| ethereum/contracts/zksync/libraries/TranscriptLib.sol | TODO | TODO |
| ethereum/contracts/zksync/libraries/PriorityQueue.sol | TODO | TODO |
| Interfaces | | |
| ethereum/contracts/zksync/interfaces/IDiamondCut.sol | TODO |  |
| ethereum/contracts/zksync/interfaces/IExecutor.sol | TODO |  |
| ethereum/contracts/zksync/interfaces/IGetters.sol | TODO |  |
| ethereum/contracts/zksync/interfaces/IGovernance.sol | TODO |  |
| ethereum/contracts/zksync/interfaces/IMailbox.sol | TODO |  |
| ethereum/contracts/zksync/interfaces/IZkSync.sol | TODO |  |

### Bridges

| Contract | SLOC | Libraries used |  
| ----------- | ----------- | ----------- |
| ethereum/contracts/bridge/L1ERC20Bridge.sol | TODO | TODO |
| ethereum/contracts/bridge/L1EthBridge.sol | TODO | TODO |
| ethereum/contracts/bridge/interfaces/IL1Bridge.sol | TODO |  |
| ethereum/contracts/bridge/interfaces/IL2Bridge.sol | TODO |  |

### Other

| Contract | SLOC | Libraries used |  
| ----------- | ----------- | ----------- |
| ethereum/contracts/common/AllowList.sol | TODO |  |
| ethereum/contracts/common/AllowListed.sol | TODO |  |
| ethereum/contracts/common/L2ContractHelper.sol | TODO |  |
| ethereum/contracts/common/ReentrancyGuard.sol | TODO |  |
| ethereum/contracts/libraries/UncheckedMath.sol | TODO |  |
| ethereum/contracts/libraries/UnsafeBytes.sol | TODO |  |
| ethereum/contracts/interfaces/IAllowList.sol | TODO |  |


## L2 contracts

| Contract | SLOC | Libraries used |  
| ----------- | ----------- | ----------- |
| Bridges |  |  |
| zksync/contracts/bridge/L2ERC20Bridge.sol | TODO | TODO |
| zksync/contracts/bridge/L2ETHBridge.sol | TODO | TODO |
| zksync/contracts/bridge/L2StandardERC20.sol | TODO | TODO |
| zksync/contracts/bridge/interfaces/IL1Bridge.sol | TODO |  |
| zksync/contracts/bridge/interfaces/IL2Bridge.sol | TODO |  |
| zksync/contracts/bridge/interfaces/IL2EthInitializable.sol | TODO |  |
| zksync/contracts/bridge/interfaces/IL2StandardToken.sol | TODO |  |
| Other | | |
| zksync/contracts/ExternalDecoder.sol | TODO | |
| zksync/contracts/L2ContractHelper.sol | TODO | |


## Out of scope

**Tests and hardhat plugins?**
*List any files/contracts that are out of scope for this audit.*

**Please confirm or edit the following scoping details**

# Tests

*Provide every step required to build the project from a fresh git clone, as well as steps to run the tests with a gas report.* 

*Note: Many wardens run Slither as a first pass for testing.  Please document any known errors with no workaround.* 
