/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface ExecutorFacetInterface extends ethers.utils.Interface {
  functions: {
    "commitBlocks(tuple,tuple[])": FunctionFragment;
    "executeBlocks(tuple[])": FunctionFragment;
    "proveBlocks(tuple,tuple[],tuple)": FunctionFragment;
    "revertBlocks(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "commitBlocks",
    values: [
      {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      {
        blockNumber: BigNumberish;
        timestamp: BigNumberish;
        indexRepeatedStorageChanges: BigNumberish;
        newStateRoot: BytesLike;
        numberOfLayer1Txs: BigNumberish;
        l2LogsTreeRoot: BytesLike;
        priorityOperationsHash: BytesLike;
        initialStorageChanges: BytesLike;
        repeatedStorageChanges: BytesLike;
        l2Logs: BytesLike;
        l2ArbitraryLengthMessages: BytesLike[];
        factoryDeps: BytesLike[];
      }[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "executeBlocks",
    values: [
      {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "proveBlocks",
    values: [
      {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      {
        recurisiveAggregationInput: BigNumberish[];
        serializedProof: BigNumberish[];
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "revertBlocks",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "commitBlocks",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeBlocks",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proveBlocks",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revertBlocks",
    data: BytesLike
  ): Result;

  events: {
    "BlockCommit(uint256,bytes32,bytes32)": EventFragment;
    "BlockExecution(uint256,bytes32,bytes32)": EventFragment;
    "BlocksRevert(uint256,uint256,uint256)": EventFragment;
    "BlocksVerification(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BlockCommit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BlockExecution"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BlocksRevert"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BlocksVerification"): EventFragment;
}

export class ExecutorFacet extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: ExecutorFacetInterface;

  functions: {
    commitBlocks(
      _lastCommittedBlockData: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      _newBlocksData: {
        blockNumber: BigNumberish;
        timestamp: BigNumberish;
        indexRepeatedStorageChanges: BigNumberish;
        newStateRoot: BytesLike;
        numberOfLayer1Txs: BigNumberish;
        l2LogsTreeRoot: BytesLike;
        priorityOperationsHash: BytesLike;
        initialStorageChanges: BytesLike;
        repeatedStorageChanges: BytesLike;
        l2Logs: BytesLike;
        l2ArbitraryLengthMessages: BytesLike[];
        factoryDeps: BytesLike[];
      }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "commitBlocks((uint64,bytes32,uint64,uint256,bytes32,bytes32,uint256,bytes32),tuple[])"(
      _lastCommittedBlockData: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      _newBlocksData: {
        blockNumber: BigNumberish;
        timestamp: BigNumberish;
        indexRepeatedStorageChanges: BigNumberish;
        newStateRoot: BytesLike;
        numberOfLayer1Txs: BigNumberish;
        l2LogsTreeRoot: BytesLike;
        priorityOperationsHash: BytesLike;
        initialStorageChanges: BytesLike;
        repeatedStorageChanges: BytesLike;
        l2Logs: BytesLike;
        l2ArbitraryLengthMessages: BytesLike[];
        factoryDeps: BytesLike[];
      }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    executeBlocks(
      _blocksData: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "executeBlocks(tuple[])"(
      _blocksData: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    proveBlocks(
      _prevBlock: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      _committedBlocks: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      _proof: {
        recurisiveAggregationInput: BigNumberish[];
        serializedProof: BigNumberish[];
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "proveBlocks((uint64,bytes32,uint64,uint256,bytes32,bytes32,uint256,bytes32),tuple[],(uint256[],uint256[]))"(
      _prevBlock: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      _committedBlocks: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      _proof: {
        recurisiveAggregationInput: BigNumberish[];
        serializedProof: BigNumberish[];
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    revertBlocks(
      _newLastBlock: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "revertBlocks(uint256)"(
      _newLastBlock: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  commitBlocks(
    _lastCommittedBlockData: {
      blockNumber: BigNumberish;
      blockHash: BytesLike;
      indexRepeatedStorageChanges: BigNumberish;
      numberOfLayer1Txs: BigNumberish;
      priorityOperationsHash: BytesLike;
      l2LogsTreeRoot: BytesLike;
      timestamp: BigNumberish;
      commitment: BytesLike;
    },
    _newBlocksData: {
      blockNumber: BigNumberish;
      timestamp: BigNumberish;
      indexRepeatedStorageChanges: BigNumberish;
      newStateRoot: BytesLike;
      numberOfLayer1Txs: BigNumberish;
      l2LogsTreeRoot: BytesLike;
      priorityOperationsHash: BytesLike;
      initialStorageChanges: BytesLike;
      repeatedStorageChanges: BytesLike;
      l2Logs: BytesLike;
      l2ArbitraryLengthMessages: BytesLike[];
      factoryDeps: BytesLike[];
    }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "commitBlocks((uint64,bytes32,uint64,uint256,bytes32,bytes32,uint256,bytes32),tuple[])"(
    _lastCommittedBlockData: {
      blockNumber: BigNumberish;
      blockHash: BytesLike;
      indexRepeatedStorageChanges: BigNumberish;
      numberOfLayer1Txs: BigNumberish;
      priorityOperationsHash: BytesLike;
      l2LogsTreeRoot: BytesLike;
      timestamp: BigNumberish;
      commitment: BytesLike;
    },
    _newBlocksData: {
      blockNumber: BigNumberish;
      timestamp: BigNumberish;
      indexRepeatedStorageChanges: BigNumberish;
      newStateRoot: BytesLike;
      numberOfLayer1Txs: BigNumberish;
      l2LogsTreeRoot: BytesLike;
      priorityOperationsHash: BytesLike;
      initialStorageChanges: BytesLike;
      repeatedStorageChanges: BytesLike;
      l2Logs: BytesLike;
      l2ArbitraryLengthMessages: BytesLike[];
      factoryDeps: BytesLike[];
    }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  executeBlocks(
    _blocksData: {
      blockNumber: BigNumberish;
      blockHash: BytesLike;
      indexRepeatedStorageChanges: BigNumberish;
      numberOfLayer1Txs: BigNumberish;
      priorityOperationsHash: BytesLike;
      l2LogsTreeRoot: BytesLike;
      timestamp: BigNumberish;
      commitment: BytesLike;
    }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "executeBlocks(tuple[])"(
    _blocksData: {
      blockNumber: BigNumberish;
      blockHash: BytesLike;
      indexRepeatedStorageChanges: BigNumberish;
      numberOfLayer1Txs: BigNumberish;
      priorityOperationsHash: BytesLike;
      l2LogsTreeRoot: BytesLike;
      timestamp: BigNumberish;
      commitment: BytesLike;
    }[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  proveBlocks(
    _prevBlock: {
      blockNumber: BigNumberish;
      blockHash: BytesLike;
      indexRepeatedStorageChanges: BigNumberish;
      numberOfLayer1Txs: BigNumberish;
      priorityOperationsHash: BytesLike;
      l2LogsTreeRoot: BytesLike;
      timestamp: BigNumberish;
      commitment: BytesLike;
    },
    _committedBlocks: {
      blockNumber: BigNumberish;
      blockHash: BytesLike;
      indexRepeatedStorageChanges: BigNumberish;
      numberOfLayer1Txs: BigNumberish;
      priorityOperationsHash: BytesLike;
      l2LogsTreeRoot: BytesLike;
      timestamp: BigNumberish;
      commitment: BytesLike;
    }[],
    _proof: {
      recurisiveAggregationInput: BigNumberish[];
      serializedProof: BigNumberish[];
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "proveBlocks((uint64,bytes32,uint64,uint256,bytes32,bytes32,uint256,bytes32),tuple[],(uint256[],uint256[]))"(
    _prevBlock: {
      blockNumber: BigNumberish;
      blockHash: BytesLike;
      indexRepeatedStorageChanges: BigNumberish;
      numberOfLayer1Txs: BigNumberish;
      priorityOperationsHash: BytesLike;
      l2LogsTreeRoot: BytesLike;
      timestamp: BigNumberish;
      commitment: BytesLike;
    },
    _committedBlocks: {
      blockNumber: BigNumberish;
      blockHash: BytesLike;
      indexRepeatedStorageChanges: BigNumberish;
      numberOfLayer1Txs: BigNumberish;
      priorityOperationsHash: BytesLike;
      l2LogsTreeRoot: BytesLike;
      timestamp: BigNumberish;
      commitment: BytesLike;
    }[],
    _proof: {
      recurisiveAggregationInput: BigNumberish[];
      serializedProof: BigNumberish[];
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  revertBlocks(
    _newLastBlock: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "revertBlocks(uint256)"(
    _newLastBlock: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    commitBlocks(
      _lastCommittedBlockData: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      _newBlocksData: {
        blockNumber: BigNumberish;
        timestamp: BigNumberish;
        indexRepeatedStorageChanges: BigNumberish;
        newStateRoot: BytesLike;
        numberOfLayer1Txs: BigNumberish;
        l2LogsTreeRoot: BytesLike;
        priorityOperationsHash: BytesLike;
        initialStorageChanges: BytesLike;
        repeatedStorageChanges: BytesLike;
        l2Logs: BytesLike;
        l2ArbitraryLengthMessages: BytesLike[];
        factoryDeps: BytesLike[];
      }[],
      overrides?: CallOverrides
    ): Promise<void>;

    "commitBlocks((uint64,bytes32,uint64,uint256,bytes32,bytes32,uint256,bytes32),tuple[])"(
      _lastCommittedBlockData: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      _newBlocksData: {
        blockNumber: BigNumberish;
        timestamp: BigNumberish;
        indexRepeatedStorageChanges: BigNumberish;
        newStateRoot: BytesLike;
        numberOfLayer1Txs: BigNumberish;
        l2LogsTreeRoot: BytesLike;
        priorityOperationsHash: BytesLike;
        initialStorageChanges: BytesLike;
        repeatedStorageChanges: BytesLike;
        l2Logs: BytesLike;
        l2ArbitraryLengthMessages: BytesLike[];
        factoryDeps: BytesLike[];
      }[],
      overrides?: CallOverrides
    ): Promise<void>;

    executeBlocks(
      _blocksData: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      overrides?: CallOverrides
    ): Promise<void>;

    "executeBlocks(tuple[])"(
      _blocksData: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      overrides?: CallOverrides
    ): Promise<void>;

    proveBlocks(
      _prevBlock: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      _committedBlocks: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      _proof: {
        recurisiveAggregationInput: BigNumberish[];
        serializedProof: BigNumberish[];
      },
      overrides?: CallOverrides
    ): Promise<void>;

    "proveBlocks((uint64,bytes32,uint64,uint256,bytes32,bytes32,uint256,bytes32),tuple[],(uint256[],uint256[]))"(
      _prevBlock: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      _committedBlocks: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      _proof: {
        recurisiveAggregationInput: BigNumberish[];
        serializedProof: BigNumberish[];
      },
      overrides?: CallOverrides
    ): Promise<void>;

    revertBlocks(
      _newLastBlock: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "revertBlocks(uint256)"(
      _newLastBlock: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    BlockCommit(
      blockNumber: BigNumberish | null,
      blockHash: BytesLike | null,
      commitment: BytesLike | null
    ): EventFilter;

    BlockExecution(
      blockNumber: BigNumberish | null,
      blockHash: BytesLike | null,
      commitment: BytesLike | null
    ): EventFilter;

    BlocksRevert(
      totalBlocksCommitted: null,
      totalBlocksVerified: null,
      totalBlocksExecuted: null
    ): EventFilter;

    BlocksVerification(
      previousLastVerifiedBlock: BigNumberish | null,
      currentLastVerifiedBlock: BigNumberish | null
    ): EventFilter;
  };

  estimateGas: {
    commitBlocks(
      _lastCommittedBlockData: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      _newBlocksData: {
        blockNumber: BigNumberish;
        timestamp: BigNumberish;
        indexRepeatedStorageChanges: BigNumberish;
        newStateRoot: BytesLike;
        numberOfLayer1Txs: BigNumberish;
        l2LogsTreeRoot: BytesLike;
        priorityOperationsHash: BytesLike;
        initialStorageChanges: BytesLike;
        repeatedStorageChanges: BytesLike;
        l2Logs: BytesLike;
        l2ArbitraryLengthMessages: BytesLike[];
        factoryDeps: BytesLike[];
      }[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "commitBlocks((uint64,bytes32,uint64,uint256,bytes32,bytes32,uint256,bytes32),tuple[])"(
      _lastCommittedBlockData: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      _newBlocksData: {
        blockNumber: BigNumberish;
        timestamp: BigNumberish;
        indexRepeatedStorageChanges: BigNumberish;
        newStateRoot: BytesLike;
        numberOfLayer1Txs: BigNumberish;
        l2LogsTreeRoot: BytesLike;
        priorityOperationsHash: BytesLike;
        initialStorageChanges: BytesLike;
        repeatedStorageChanges: BytesLike;
        l2Logs: BytesLike;
        l2ArbitraryLengthMessages: BytesLike[];
        factoryDeps: BytesLike[];
      }[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    executeBlocks(
      _blocksData: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "executeBlocks(tuple[])"(
      _blocksData: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    proveBlocks(
      _prevBlock: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      _committedBlocks: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      _proof: {
        recurisiveAggregationInput: BigNumberish[];
        serializedProof: BigNumberish[];
      },
      overrides?: Overrides
    ): Promise<BigNumber>;

    "proveBlocks((uint64,bytes32,uint64,uint256,bytes32,bytes32,uint256,bytes32),tuple[],(uint256[],uint256[]))"(
      _prevBlock: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      _committedBlocks: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      _proof: {
        recurisiveAggregationInput: BigNumberish[];
        serializedProof: BigNumberish[];
      },
      overrides?: Overrides
    ): Promise<BigNumber>;

    revertBlocks(
      _newLastBlock: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "revertBlocks(uint256)"(
      _newLastBlock: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    commitBlocks(
      _lastCommittedBlockData: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      _newBlocksData: {
        blockNumber: BigNumberish;
        timestamp: BigNumberish;
        indexRepeatedStorageChanges: BigNumberish;
        newStateRoot: BytesLike;
        numberOfLayer1Txs: BigNumberish;
        l2LogsTreeRoot: BytesLike;
        priorityOperationsHash: BytesLike;
        initialStorageChanges: BytesLike;
        repeatedStorageChanges: BytesLike;
        l2Logs: BytesLike;
        l2ArbitraryLengthMessages: BytesLike[];
        factoryDeps: BytesLike[];
      }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "commitBlocks((uint64,bytes32,uint64,uint256,bytes32,bytes32,uint256,bytes32),tuple[])"(
      _lastCommittedBlockData: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      _newBlocksData: {
        blockNumber: BigNumberish;
        timestamp: BigNumberish;
        indexRepeatedStorageChanges: BigNumberish;
        newStateRoot: BytesLike;
        numberOfLayer1Txs: BigNumberish;
        l2LogsTreeRoot: BytesLike;
        priorityOperationsHash: BytesLike;
        initialStorageChanges: BytesLike;
        repeatedStorageChanges: BytesLike;
        l2Logs: BytesLike;
        l2ArbitraryLengthMessages: BytesLike[];
        factoryDeps: BytesLike[];
      }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    executeBlocks(
      _blocksData: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "executeBlocks(tuple[])"(
      _blocksData: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    proveBlocks(
      _prevBlock: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      _committedBlocks: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      _proof: {
        recurisiveAggregationInput: BigNumberish[];
        serializedProof: BigNumberish[];
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "proveBlocks((uint64,bytes32,uint64,uint256,bytes32,bytes32,uint256,bytes32),tuple[],(uint256[],uint256[]))"(
      _prevBlock: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      },
      _committedBlocks: {
        blockNumber: BigNumberish;
        blockHash: BytesLike;
        indexRepeatedStorageChanges: BigNumberish;
        numberOfLayer1Txs: BigNumberish;
        priorityOperationsHash: BytesLike;
        l2LogsTreeRoot: BytesLike;
        timestamp: BigNumberish;
        commitment: BytesLike;
      }[],
      _proof: {
        recurisiveAggregationInput: BigNumberish[];
        serializedProof: BigNumberish[];
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    revertBlocks(
      _newLastBlock: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "revertBlocks(uint256)"(
      _newLastBlock: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
