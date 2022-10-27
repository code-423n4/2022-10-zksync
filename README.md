## ⭐️ Sponsor: Edit this README

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
We are releasing mart contracts for [zkSync version 2.0](https://v2.zksync.io/) - a general-purpose zero knowledge rollup solution for Ethereum. For more information and fundamental concepts please refer to the documentation [here](https://v2-docs.zksync.io/dev/#fundamental-topics).

This repository contains Layer 1 (i.e. Ethereum mainnet) and some Layer 2 contracts of zkSync v2.0, a set of Solidity smart contracts that take care of governance, upgradability, L1 <-> L2 communication, bridging, allow listing etc. A detailed description of these smart contracts and their purpose can be found [here](https://matterlabs.notion.site/zkSync-2-0-smart-contracts-overview-fad227fac94241898417771e4a415f83).

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
| [ethereum/contracts/zksync/DiamondProxy.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/DiamondProxy.sol) | 55 |  |
| [ethereum/contracts/zksync/DiamondInit.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/DiamondInit.sol) | 63 |  |
| [ethereum/contracts/zksync/Config.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/Config.sol) | 82 | |
| [ethereum/contracts/zksync/Storage.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/Storage.sol) | 102 | |
| [ethereum/contracts/zksync/facets/Base.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/facets/Base.sol) | 25 | |
| [ethereum/contracts/zksync/facets/DiamondCut.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/facets/DiamondCut.sol) | 137 | |
| [ethereum/contracts/zksync/facets/Executor.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/facets/Executor.sol) | 388 | |
| [ethereum/contracts/zksync/facets/Getters.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/facets/Getters.sol) | 188 | |
| [ethereum/contracts/zksync/facets/Governance.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/facets/Governance.sol) | 110 | |
| [ethereum/contracts/zksync/facets/Mailbox.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/facets/Mailbox.sol) | 232 | |
| Verifier| | |
| [ethereum/contracts/zksync/Verifier.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/Verifier.sol) | 237 | |
| [ethereum/contracts/zksync/Plonk4VerifierWithAccessToDNext.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/Plonk4VerifierWithAccessToDNext.sol) | 705 | |
| Libraries | | |
| [ethereum/contracts/zksync/libraries/Diamond.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/libraries/Diamond.sol) | 291 | |
| [ethereum/contracts/zksync/libraries/Merkle.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/libraries/Merkle.sol) | 39 | |
| [ethereum/contracts/zksync/libraries/PairingsBn254.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/libraries/PairingsBn254.sol) | 276 | |
| [ethereum/contracts/zksync/libraries/TranscriptLib.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/libraries/TranscriptLib.sol) | 47 | |
| [ethereum/contracts/zksync/libraries/PriorityQueue.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/libraries/PriorityQueue.sol) | 81 | |
| Interfaces | | |
| [ethereum/contracts/zksync/interfaces/IDiamondCut.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/interfaces/IDiamondCut.sol) | 36 |  |
| [ethereum/contracts/zksync/interfaces/IExecutor.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/interfaces/IExecutor.sol) | 86 |  |
| [ethereum/contracts/zksync/interfaces/IGetters.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/interfaces/IGetters.sol) | 75 |  |
| [ethereum/contracts/zksync/interfaces/IGovernance.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/interfaces/IGovernance.sol) | 49 |  |
| [ethereum/contracts/zksync/interfaces/IMailbox.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/interfaces/IMailbox.sol) | 102 |  |
| [ethereum/contracts/zksync/interfaces/IZkSync.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/zksync/interfaces/IZkSync.sol) | 11 |  |

### Bridges

| Contract | SLOC | Libraries used |  
| ----------- | ----------- | ----------- |
| [ethereum/contracts/bridge/L1ERC20Bridge.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/bridge/L1ERC20Bridge.sol) | 288 | [`@openzeppelin/*`](<(https://openzeppelin.com/contracts/)>) |
| [ethereum/contracts/bridge/L1EthBridge.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/bridge/L1EthBridge.sol) | 246 | [`@openzeppelin/*`](<(https://openzeppelin.com/contracts/)>) |
| [ethereum/contracts/bridge/interfaces/IL1Bridge.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/bridge/interfaces/IL1Bridge.sol) | 42 |  |
| [ethereum/contracts/bridge/interfaces/IL2Bridge.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/bridge/interfaces/IL2Bridge.sol) | 26 |  |

### Other

| Contract | SLOC | Libraries used |  
| ----------- | ----------- | ----------- |
| [ethereum/contracts/common/AllowList.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/common/AllowList.sol) | 165 |  |
| [ethereum/contracts/common/AllowListed.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/common/AllowListed.sol) | 19 |  |
| [ethereum/contracts/common/L2ContractHelper.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/common/L2ContractHelper.sol) | 88 |  |
| [ethereum/contracts/common/ReentrancyGuard.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/common/ReentrancyGuard.sol) | 87 |  |
| [ethereum/contracts/libraries/UncheckedMath.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/common/libraries/UncheckedMath.sol) | 17 |  |
| [ethereum/contracts/libraries/UnsafeBytes.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/common/libraries/UnsafeBytes.sol) | 45 |  |
| [ethereum/contracts/interfaces/IAllowList.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/ethereum/contracts/common/interfaces/IAllowList.sol) | 70 |  |


## L2 contracts

| Contract | SLOC | Libraries used |  
| ----------- | ----------- | ----------- |
| Bridges |  |  |
| [zksync/contracts/bridge/L2ERC20Bridge.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/zksync/contracts/bridge/L2ERC20Bridge.sol) | 125 | TODO |
| [zksync/contracts/bridge/L2ETHBridge.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/zksync/contracts/bridge/L2ETHBridge.sol) | 87 | |
| [zksync/contracts/bridge/L2StandardERC20.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/zksync/contracts/bridge/L2StandardERC20.sol) | 131 | TODO |
| [zksync/contracts/bridge/interfaces/IL1Bridge.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/zksync/contracts/bridge/interfaces/IL1Bridge.sol) | 14 |  |
| [zksync/contracts/bridge/interfaces/IL2Bridge.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/zksync/contracts/bridge/interfaces/IL2Bridge.sol) | 40 |  |
| [zksync/contracts/bridge/interfaces/IL2EthInitializable.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/zksync/contracts/bridge/interfaces/IL2EthInitializable.sol) | 7 |  |
| [zksync/contracts/bridge/interfaces/IL2StandardToken.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/zksync/contracts/bridge/interfaces/IL2StandardToken.sol) | 17 |  |
| Other | | |
| [zksync/contracts/ExternalDecoder.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/zksync/contracts/ExternalDecoder.sol) | 18 | |
| [zksync/contracts/L2ContractHelper.sol](https://github.com/code-423n4/2022-10-zksync/blob/contest-prepare/zksync/contracts/L2ContractHelper.sol) | 43 | |


## Out of scope

- [ethereum/contracts/dev-contracts/test](https://github.com/code-423n4/2022-10-zksync/tree/contest-prepare/ethereum/contracts/dev-contracts/test)

# Tests

All contracts are divided into `ethereum` and `zksync` subfolders, each of which contains a hardhat project with related contracts.

## L1 contracts

Select the correct folder:

```console
  cd ethereum
```

Install dependencies:

```console
  yarn
```

Run tests:
```console
  yarn test
```

## L2 contracts

Select the correct folder:

```console
  cd zksync
```

Install dependencies:

```console
  yarn
```

Run tests:
```console
  yarn test
```
