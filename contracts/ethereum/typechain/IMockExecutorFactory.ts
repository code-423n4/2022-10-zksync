/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IMockExecutor } from "./IMockExecutor";

export class IMockExecutorFactory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IMockExecutor {
    return new Contract(address, _abi, signerOrProvider) as IMockExecutor;
  }
}

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "blockNumber",
            type: "uint64",
          },
          {
            internalType: "bytes32",
            name: "blockHash",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "indexRepeatedStorageChanges",
            type: "uint64",
          },
          {
            internalType: "uint256",
            name: "numberOfLayer1Txs",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "priorityOperationsHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "l2LogsTreeRoot",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "commitment",
            type: "bytes32",
          },
        ],
        internalType: "struct IExecutor.StoredBlockInfo",
        name: "_prevBlock",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint64",
            name: "blockNumber",
            type: "uint64",
          },
          {
            internalType: "bytes32",
            name: "blockHash",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "indexRepeatedStorageChanges",
            type: "uint64",
          },
          {
            internalType: "uint256",
            name: "numberOfLayer1Txs",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "priorityOperationsHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "l2LogsTreeRoot",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "commitment",
            type: "bytes32",
          },
        ],
        internalType: "struct IExecutor.StoredBlockInfo[]",
        name: "_committedBlocks",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint256[]",
            name: "recurisiveAggregationInput",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "serializedProof",
            type: "uint256[]",
          },
        ],
        internalType: "struct IExecutor.ProofInput",
        name: "_proof",
        type: "tuple",
      },
    ],
    name: "fakeProveBlocks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
