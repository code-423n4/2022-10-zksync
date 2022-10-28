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

1. Merke library ([Merkle.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/libraries/Merkle.sol)) does not check that *\_path* length is equal to the tree height.
2. [UPGRADE\_NOTICE\_PERIOD](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/hardhat.config.ts#L6) is set to 0 during alpha.
3. `supportsInterface` of `ERC-165` standard is not implemented.
4. Solidity version is not pinned in the source files. It is pinned in the [config](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/hardhat.config.ts#L21) instead.
5. Implementation of the Diamond Cut is not fully EIP-2535 compatible, because of missing check for that replaced facet is distinct from old one.
6. `unfreezeDiamond`/`emergencyFreezeDiamond`/`cancelDiamondCutProposal` are susceptible to reorg attack.
7. L1 -> L2 transactions are free, which can lead to DoS attack.

The C4udit output for the contest can be found here, [include link to C4udit report], within an hour of contest opening.

*Note for C4 wardens: Anything included in the C4udit output is considered a publicly known issue and is ineligible for awards.*

# Overview

zkSync 2.0 is a permissionless general-purpose ZK rollup. Similar to many L1 blockchains and sidechains it enables deployment and interaction with Turing-complete smart contracts.

Although the audit is focused on the L1 part, a few notes to have a wider picture:

- L2 smart contracts are executed on a zkEVM.
- zkEVM bytecode is different from the L1 EVM.
- There is a Solidity and Vyper compilers for L2 smart contracts.
- There is a standard way to pass messages between L1 and L2. That is a part of the protocol.
- There is no escape hatch mechanism yet, but it is planned to have one.

More can be read in the [documentation](https://v2-docs.zksync.io/dev/fundamentals/rollups.html).

## Glossary

- Governor - privileged address that controls the upgradability of the network and sets other privileged addresses.
- Validator/Operator - a privileged address that can commit/verify/execute L2 blocks.
- Facet - implementation contract. The word comes from the EIP-2535.
- Security council - set of trusted addresses that can decrease upgrade timelock.
- Ergs - a unit that measures the amount of computational effort required to execute specific operations on the zkSync v2 network. Analog of the gas on Ethereum.

## Overview

The main idea of the protocol is to make the VM execution off-chain and commit zk/validity proof of its correctness onchain.

Besides that, all data that is needed to restore the L2 state are also pushed onchain. There are two approaches, publishing inputs of L2 transactions onchain and publishing the state transition diff. Currently, zkSync follows the second option.

### L1 Smart contracts

#### Diamond

Technically, the L1 smart contract acts as a connector between Ethereum (L1) and zkSync (L2). It is this that checks the validity proof and data availability, handles L2 <-> L1 communication, finalizes L2 state transition, etc.

In addition to the L1 contract, there are important contracts in L2, they also can execute some logic. These L2 contracts are called system contracts, using L2 <-> L1 communication they can affect L1 and L2. L2 system contracts are not included in the scope of this audit, but they are mentioned in L1 contracts, specifically on `ExecutorFacet`. More details in [docs](https://v2-docs.zksync.io/dev/developer-guides/contracts/system-contracts.html).

#### DiamondProxy

The main contract uses [EIP-2535](https://eips.ethereum.org/EIPS/eip-2535) diamond proxy pattern. It is an in-house implementation that is inspired by the [mudgen reference implementation](https://github.com/mudgen/Diamond). It has no external functions, only the fallback that delegates a call to one of the facets (target/implementation contract). So even an upgrade system is a separate facet that can be replaced.

One of the differences from the reference implementation is access freezability. Each of the facets has an associated parameter, that indicates if it is possible to freeze the access to the facet. The privileged actor can freeze the **diamond** (not a specific facet!) and all facets with the marker `isFreezable` should be inaccessible until the governor unfreezes the diamond. Note, that it is a very dangerous thing since the diamond proxy can freeze the upgrade system and then the diamond will be frozen forever.

#### DiamondInit

It is a one-function contract, that implements the logic of initialing diamond proxy. It is called only once on the diamond constructor and is not saved in the diamond as a facet.

Implementation detail - function returns a magic value just like it is designed in [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271), but the magic value is 32 bytes in size.

#### DiamondCutFacet

These smart contracts manage the freezing/unfreezing and upgrades of the diamond proxy. That being said, the contract must never be frozen.

Currently freezing and unfreezing are implemented as access control functions. It is fully controlled by the governor but can be changed later. The governor can call `emergencyFreezeDiamond` to freeze the diamond and `unfreezeDiamond` to restore it.

Another purpose of `DiamondCutFacet` is to upgrade the facets. The upgrading is split into 2-3 phases:

- `proposeDiamondCut` - propose an upgrade by the governor.
- `approveEmergencyDiamondCutAsSecurityCouncilMember` - approve the upgrade by security council.
- `executeDiamondCutProposal` - finalize the upgrade.

The upgrade itself characterizes by three variables:

- `facetCuts` - a set of changes to the facets (adding new facets, removing facets, and replacing them).
- pair `(address _initAddress, bytes _calldata)` for initializing the upgrade by making a delegate call to `_initAddress` with `_calldata` inputs.

NOTE: `proposeDiamondCut` - commits data associated with an upgrade but does not execute it. While the upgrade is associated with `facetCuts` and `(address _initAddress, bytes _calldata)` the upgrade will be committed to the `facetCuts` and `_initAddress`. This is done on purpose, to leave some freedom to the governor to change calldata for the upgrade between proposing and executing it.

#### GettersFacet

Separate facet, whose only function is providing `view` and `pure` methods. It also implements [diamond loupe](https://eips.ethereum.org/EIPS/eip-2535#diamond-loupe) which makes managing facets easier.

#### GovernanceFacet

Controls changing of the privileged addresses such as governor and validators. Compact contract with a couple of functions, that are only needed to change the governor, validators or one of the parameters of the system (L2 bootloader bytecode hash, verifier address, verifier parameters, etc).

#### MailboxFacet

The facet that handles L2 <-> L1 communication, an overview for which can be found in [docs](https://v2-docs.zksync.io/dev/developer-guides/bridging/l1-l2-interop.html).

The Mailbox only cares about transferring information from L2 to L1 and the other way but does not hold or transfer any assets (ETH, ERC20 tokens, or NFTs).

L1 -> L2 communication is implemented as requesting an L2 transaction on L1 and executing it on L2. This means a user can call the function on L1 contract to save the data about the transaction in some queue. Later on, a validator can process such transactions on L2 and mark them as processed on the L1 priority queue. Currently, it is used only for sending information from L1 to L2 or implementing a multi-layer protocol, but it is planned to use a priority queue for the censor-resistance mechanism. Relevant functions for L1 -> L2 communication: `requestL2Transaction`/`l2TransactionBaseCost`/`serializeL2Transaction`.

NOTE: For each executed transaction L1 -> L2, the system program necessarily sends an L2 -> L1 log. 

The semantics of such L2 -> L1 log are always:
- sender = BOOTLOADER_ADDRESS
- key = hash(L1ToL2Transaction)
- value = status of the processing transaction (1 - success & 0 for fail)
- isService = true (just a conventional value)
- l2ShardId = 0 (means that L1 -> L2 transaction was processed in a rollup shard, other shards are not available yet anyway)
- txNumberInBlock = number of transaction in the block

L2 -> L1 communication, in contrast to L1 -> L2 communication, is based only on transferring the information, and not on the transaction execution on L1.

From the L2 side, there is a special zkEVM opcode that saves `l2ToL1Log` in the L2 block. A validator will send all `l2ToL1Logs` when sending an L2 block to L1 (see `ExecutorFacet`). Later on, a user will be able to both read his `l2ToL1log` on L1 and *prove* that s/he sent it.

From the L1 side, for each L2 block, a Merkle root with such logs in leaves is calculated. Thus, a user can provide Merkle proof for each `l2ToL1Logs`.

*NOTE*: The `l2ToL1Log` structure consists of fixed-size fields! Because of this, it is inconvenient to send a lot of data from L2 and to prove that they were sent on L1 using only `l2ToL1log`. To send a variable-length message we use this trick:

- One of the system contracts accepts an arbitrary length message and sends a fixed length message with parameters `senderAddress == this`, `marker == true`, `key == msg.sender`, `value == keccak256(message)`.
- The contract on L1 accepts all sent messages and if the message came from this system contract it requires that the preimage of `value` be provided.

#### ExecutorFacet

A contract that accepts L2 blocks, enforces data availability and checks the validity of zk-proofs.

The state transition is divided into three stages:

- `commitBlocks` - check L2 block timestamp, process the L2 logs, save data for a block, and prepare data for zk-proof.
- `proveBlocks` - validate zk-proof.
- `executeBlocks` - finalize the state, marking L1 -> L2 communication processing, and saving Merkle tree with L2 logs.

When a block is committed, we process L2 -> L1 logs. The information we are checking is related to L2 and is not included in the scope of this contest. Here are the invariants that are expected there:

- The only one L2 -> L1 log from the `L2_SYSTEM_CONTEXT_ADDRESS`, with the `key == l2BlockTimestamp` and `value == l2BlockHash`.
- Several (or none) logs from the `L2_KNOWN_CODE_STORAGE_ADDRESS` with the `key == bytecodeHash`, where bytecode is marked as a known factory dependency.
- Several (or none) logs from the `L2_BOOTLOADER_ADDRESS` with the `key == canonicalTxHash` where `canonicalTxHash` is a hash of processed L1 -> L2 transaction.
- Several (of none) logs from the `L2_TO_L1_MESSENGER` with the `key == hashedMessage` where `hashedMessage` is a hash of an arbitrary-length message that is sent from L2
- Several (or none) logs from other addresses with arbitrary parameters.

#### Bridges

Bridges are completely separate contracts from the Diamond. They are a wrapper for L1 <-> L2 communication on contracts on both L1 and L2. The one counterpart locks funds and sends a request to mint bridged assets on another side. On the opposite, the user can burn funds on one side and unlock them on the other.

We propose two "default" bridge implementations for ERC20 tokens and ether. Please note, that anyone can create a different bridge by the same principle, "default" implementation is needed for the convenience to bridge any asset without developing a separate mechanism for bridging. 

The ether bridge is special because it is the only place where native L2 ether can be minted. Other than that, it is just a smart contract without any special system preferences.

##### L1Bridge

- `deposit` - lock funds inside the contract and send request to mint bridged assets on L2.
- `claimFailedDeposit` - unlock funds if the deposit was initiated but then failed on L2.
- `finalizeWithdrawal` - unlock funds for the valid withdraw request from L2.

##### L2Bridge

- `withdraw` - initiate a withdrawal by burning funds on the contract and sending the message to L1.
- `finalizeDeposit` - finalize the deposit and mint funds on L2.

#### Allowlist

The auxiliary contract controls the permission access list. It is used in bridges and diamond proxies to control which addresses can interact with them in the Alpha release. 

### L2 specifics 

Although the interaction with L2 is very similar to what is in L1, the system has differences and unique concepts. Rules for generating l2 addresses, ergs (gas) metering and system contracts are something to consider when reviewing the code.

#### Deployment

The L2 deployment process is different from Ethereum. 

In L1, the deployment always goes through two opcodes `create` and `create2`, each of which provides its address derivation. The parameter of these opcodes is the so-called "init bytecode" - a bytecode that returns the bytecode to be deployed. This works well in L1 but is sub-optimal for L2.

In the case of L2, there are also two ways to deploy contracts - `create` and `create2`. However, the expected input parameters for `create` and `create2` are different. It accepts the hash of the bytecode, rather than the full bytecode. Therefore, users pay less for contract creation and don't need to send the full contract code by the network whenever deploy. But how does the validator know the preimage of the bytecode hashes to execute the code? 

Here comes the concept of factory dependencies! Factory dependencies are a list of bytecode hashes whose preimages were shown on L1 (data is always available). Such bytecode hashes can be deployed, others - no. Note that they can be added to the system by either L2 transaction or L1 -> L2 communication, where you can specify the full bytecode and the system will mark it as known and allow you to deploy it.

Besides that, due to the bytecode differences for L1 and L2 contracts, we decided to make address derivation different. This applies to both `create` and `create2` and means that the contract deployed in L1 cannot have a collision with a contract in L2. Please note that EOA address derivation is the same as on Ethereum. 

Thus:

- L2 contracts are deployed by bytecode hash, not by full bytecode
- Factory dependencies - list of bytecode hashes that can be deployed on L2
- Address derivation for `create`/`create2` on L1 and L2 is different

You can find more on the [documentation](https://v2-docs.zksync.io/dev/developer-guides/contracts/contracts.html#solidity-vyper-support)](https://v2-docs.zksync.io/dev/developer-guides/contracts/contracts.html#solidity-vyper-support).

# Scope

## L1 contracts

### zkSync

| Contract | SLOC | Libraries used |  
| ----------- | ----------- | ----------- |
| Diamond | | |
| [ethereum/contracts/zksync/DiamondProxy.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/DiamondProxy.sol) | 55 |  |
| [ethereum/contracts/zksync/DiamondInit.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/DiamondInit.sol) | 63 |  |
| [ethereum/contracts/zksync/Config.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/Config.sol) | 82 | |
| [ethereum/contracts/zksync/Storage.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/Storage.sol) | 102 | |
| [ethereum/contracts/zksync/facets/Base.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/facets/Base.sol) | 25 | |
| [ethereum/contracts/zksync/facets/DiamondCut.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/facets/DiamondCut.sol) | 137 | |
| [ethereum/contracts/zksync/facets/Executor.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/facets/Executor.sol) | 388 | |
| [ethereum/contracts/zksync/facets/Getters.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/facets/Getters.sol) | 188 | |
| [ethereum/contracts/zksync/facets/Governance.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/facets/Governance.sol) | 110 | |
| [ethereum/contracts/zksync/facets/Mailbox.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/facets/Mailbox.sol) | 232 | |
| Libraries | | |
| [ethereum/contracts/zksync/libraries/Diamond.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/libraries/Diamond.sol) | 291 | |
| [ethereum/contracts/zksync/libraries/Merkle.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/libraries/Merkle.sol) | 39 | |
| [ethereum/contracts/zksync/libraries/PriorityQueue.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/libraries/PriorityQueue.sol) | 81 | |
| Interfaces | | |
| [ethereum/contracts/zksync/interfaces/IDiamondCut.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/interfaces/IDiamondCut.sol) | 36 |  |
| [ethereum/contracts/zksync/interfaces/IExecutor.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/interfaces/IExecutor.sol) | 86 |  |
| [ethereum/contracts/zksync/interfaces/IGetters.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/interfaces/IGetters.sol) | 75 |  |
| [ethereum/contracts/zksync/interfaces/IGovernance.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/interfaces/IGovernance.sol) | 49 |  |
| [ethereum/contracts/zksync/interfaces/IMailbox.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/interfaces/IMailbox.sol) | 102 |  |
| [ethereum/contracts/zksync/interfaces/IZkSync.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/interfaces/IZkSync.sol) | 11 |  |

### Bridges

| Contract | SLOC | Libraries used |  
| ----------- | ----------- | ----------- |
| [ethereum/contracts/bridge/L1ERC20Bridge.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/bridge/L1ERC20Bridge.sol) | 288 | [`@openzeppelin/*`](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts) |
| [ethereum/contracts/bridge/L1EthBridge.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/bridge/L1EthBridge.sol) | 246 | [`@openzeppelin/*`](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts) |
| [ethereum/contracts/bridge/interfaces/IL1Bridge.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/bridge/interfaces/IL1Bridge.sol) | 42 |  |
| [ethereum/contracts/bridge/interfaces/IL2Bridge.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/bridge/interfaces/IL2Bridge.sol) | 26 |  |

### Other

| Contract | SLOC | Libraries used |  
| ----------- | ----------- | ----------- |
| [ethereum/contracts/common/AllowList.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/common/AllowList.sol) | 165 |  |
| [ethereum/contracts/common/AllowListed.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/common/AllowListed.sol) | 19 |  |
| [ethereum/contracts/common/L2ContractHelper.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/common/L2ContractHelper.sol) | 88 |  |
| [ethereum/contracts/common/ReentrancyGuard.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/common/ReentrancyGuard.sol) | 87 |  |
| [ethereum/contracts/libraries/UncheckedMath.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/common/libraries/UncheckedMath.sol) | 17 |  |
| [ethereum/contracts/libraries/UnsafeBytes.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/common/libraries/UnsafeBytes.sol) | 45 |  |
| [ethereum/contracts/interfaces/IAllowList.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/common/interfaces/IAllowList.sol) | 70 |  |

## L2 contracts

### Bridges

| Contract | SLOC | Libraries used |  
| ----------- | ----------- | ----------- |
| [zksync/contracts/bridge/L2ERC20Bridge.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/zksync/contracts/bridge/L2ERC20Bridge.sol) | 125 | [`@openzeppelin/*`](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts) |
| [zksync/contracts/bridge/L2ETHBridge.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/zksync/contracts/bridge/L2ETHBridge.sol) | 87 | |
| [zksync/contracts/bridge/L2StandardERC20.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/zksync/contracts/bridge/L2StandardERC20.sol) | 131 | [`@openzeppelin/*`](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts) |
| [zksync/contracts/bridge/interfaces/IL1Bridge.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/zksync/contracts/bridge/interfaces/IL1Bridge.sol) | 14 |  |
| [zksync/contracts/bridge/interfaces/IL2Bridge.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/zksync/contracts/bridge/interfaces/IL2Bridge.sol) | 40 |  |
| [zksync/contracts/bridge/interfaces/IL2EthInitializable.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/zksync/contracts/bridge/interfaces/IL2EthInitializable.sol) | 7 |  |
| [zksync/contracts/bridge/interfaces/IL2StandardToken.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/zksync/contracts/bridge/interfaces/IL2StandardToken.sol) | 17 |  |

### Other

| Contract | SLOC | Libraries used |
| ----------- | ----------- | ----------- |
| [zksync/contracts/ExternalDecoder.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/zksync/contracts/ExternalDecoder.sol) | 18 | |
| [zksync/contracts/L2ContractHelper.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/zksync/contracts/L2ContractHelper.sol) | 43 | |

## Out of scope

| Contract | SLOC | Libraries used |  
| ----------- | ----------- | ----------- |
| [ethereum/contracts/zksync/Verifier.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/Verifier.sol) | 237 | |
| [ethereum/contracts/zksync/libraries/PairingsBn254.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/libraries/PairingsBn254.sol) | 276 | |
| [ethereum/contracts/zksync/libraries/TranscriptLib.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/libraries/TranscriptLib.sol) | 47 | |
| [ethereum/contracts/zksync/Plonk4VerifierWithAccessToDNext.sol](https://github.com/code-423n4/2022-10-zksync/blob/main/ethereum/contracts/zksync/Plonk4VerifierWithAccessToDNext.sol) | 705 | |
| [ethereum/contracts/dev-contracts/*](https://github.com/code-423n4/2022-10-zksync/tree/main/ethereum/contracts/dev-contracts) | | |

# Additional Context

## Scoping Details
```
- If you have a public code repo, please share it here: N/A
- How many contracts are in scope?: 35
- Total SLoC for these contracts?: 2,281
- How many external imports are there?: 1
- How many separate interfaces and struct definitions are there for the contracts within scope?:  34
- Does most of your code generally use composition or inheritance?: Yes
- How many external calls?: 0
- What is the overall line coverage percentage provided by your tests?:  Not sure.
- Is there a need to understand a separate part of the codebase / get context in order to audit this part of the protocol?: Yes
- Please describe required context: Zero knowledge rollups
- Does it use an oracle?: No
- Does the token conform to the ERC20 standard?: No token
- Are there any novel or unique curve logic or mathematical models?: Not in L1
- Does it use a timelock function?: Yes
- Is it an NFT?: No
- Does it have an AMM?: No
- Is it a fork of a popular project?: No
- Does it use rollups?: Yes
- Is it multi-chain?:  No
- Does it use a side-chain?: No
```

# Tests

## One liner

```sh
rm -Rf 2022-10-zksync || true && git clone https://github.com/code-423n4/2022-10-zksync.git && cd 2022-10-zksync/ethereum && nvm use 18.0 && yarn --ignore-engines && REPORT_GAS=true yarn test
```

## Step by step

```sh
  cd ethereum
```

Install dependencies:

```sh
  yarn --ignore-engines
```

Run tests:

```sh
  yarn test
```
