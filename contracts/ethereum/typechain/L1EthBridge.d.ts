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
  PayableOverrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface L1EthBridgeInterface extends ethers.utils.Interface {
  functions: {
    "claimFailedDeposit(address,address,bytes32,uint256,uint256,uint16,bytes32[])": FunctionFragment;
    "deposit(address,address,uint256)": FunctionFragment;
    "finalizeWithdrawal(uint256,uint256,uint16,bytes,bytes32[])": FunctionFragment;
    "initialize(bytes)": FunctionFragment;
    "isWithdrawalFinalized(uint256,uint256)": FunctionFragment;
    "l2Bridge()": FunctionFragment;
    "l2TokenAddress(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "claimFailedDeposit",
    values: [
      string,
      string,
      BytesLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "finalizeWithdrawal",
    values: [BigNumberish, BigNumberish, BigNumberish, BytesLike, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isWithdrawalFinalized",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "l2Bridge", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "l2TokenAddress",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "claimFailedDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "finalizeWithdrawal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isWithdrawalFinalized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "l2Bridge", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "l2TokenAddress",
    data: BytesLike
  ): Result;

  events: {
    "ClaimedFailedDeposit(address,address,uint256)": EventFragment;
    "DepositInitiated(address,address,address,uint256)": EventFragment;
    "WithdrawalFinalized(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ClaimedFailedDeposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DepositInitiated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WithdrawalFinalized"): EventFragment;
}

export class L1EthBridge extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: L1EthBridgeInterface;

  functions: {
    claimFailedDeposit(
      _depositSender: string,
      _l1Token: string,
      _l2TxHash: BytesLike,
      _l2BlockNumber: BigNumberish,
      _l2MessageIndex: BigNumberish,
      _l2TxNumberInBlock: BigNumberish,
      _merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "claimFailedDeposit(address,address,bytes32,uint256,uint256,uint16,bytes32[])"(
      _depositSender: string,
      _l1Token: string,
      _l2TxHash: BytesLike,
      _l2BlockNumber: BigNumberish,
      _l2MessageIndex: BigNumberish,
      _l2TxNumberInBlock: BigNumberish,
      _merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    deposit(
      _l2Receiver: string,
      _l1Token: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "deposit(address,address,uint256)"(
      _l2Receiver: string,
      _l1Token: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    finalizeWithdrawal(
      _l2BlockNumber: BigNumberish,
      _l2MessageIndex: BigNumberish,
      _l2TxNumberInBlock: BigNumberish,
      _message: BytesLike,
      _merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "finalizeWithdrawal(uint256,uint256,uint16,bytes,bytes32[])"(
      _l2BlockNumber: BigNumberish,
      _l2MessageIndex: BigNumberish,
      _l2TxNumberInBlock: BigNumberish,
      _message: BytesLike,
      _merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    initialize(
      _l2BridgeBytecode: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "initialize(bytes)"(
      _l2BridgeBytecode: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    isWithdrawalFinalized(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    "isWithdrawalFinalized(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      0: boolean;
    }>;

    l2Bridge(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "l2Bridge()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    l2TokenAddress(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;

    "l2TokenAddress(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<{
      0: string;
    }>;
  };

  claimFailedDeposit(
    _depositSender: string,
    _l1Token: string,
    _l2TxHash: BytesLike,
    _l2BlockNumber: BigNumberish,
    _l2MessageIndex: BigNumberish,
    _l2TxNumberInBlock: BigNumberish,
    _merkleProof: BytesLike[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "claimFailedDeposit(address,address,bytes32,uint256,uint256,uint16,bytes32[])"(
    _depositSender: string,
    _l1Token: string,
    _l2TxHash: BytesLike,
    _l2BlockNumber: BigNumberish,
    _l2MessageIndex: BigNumberish,
    _l2TxNumberInBlock: BigNumberish,
    _merkleProof: BytesLike[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  deposit(
    _l2Receiver: string,
    _l1Token: string,
    _amount: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "deposit(address,address,uint256)"(
    _l2Receiver: string,
    _l1Token: string,
    _amount: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  finalizeWithdrawal(
    _l2BlockNumber: BigNumberish,
    _l2MessageIndex: BigNumberish,
    _l2TxNumberInBlock: BigNumberish,
    _message: BytesLike,
    _merkleProof: BytesLike[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "finalizeWithdrawal(uint256,uint256,uint16,bytes,bytes32[])"(
    _l2BlockNumber: BigNumberish,
    _l2MessageIndex: BigNumberish,
    _l2TxNumberInBlock: BigNumberish,
    _message: BytesLike,
    _merkleProof: BytesLike[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  initialize(
    _l2BridgeBytecode: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "initialize(bytes)"(
    _l2BridgeBytecode: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  isWithdrawalFinalized(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "isWithdrawalFinalized(uint256,uint256)"(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  l2Bridge(overrides?: CallOverrides): Promise<string>;

  "l2Bridge()"(overrides?: CallOverrides): Promise<string>;

  l2TokenAddress(arg0: string, overrides?: CallOverrides): Promise<string>;

  "l2TokenAddress(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    claimFailedDeposit(
      _depositSender: string,
      _l1Token: string,
      _l2TxHash: BytesLike,
      _l2BlockNumber: BigNumberish,
      _l2MessageIndex: BigNumberish,
      _l2TxNumberInBlock: BigNumberish,
      _merkleProof: BytesLike[],
      overrides?: CallOverrides
    ): Promise<void>;

    "claimFailedDeposit(address,address,bytes32,uint256,uint256,uint16,bytes32[])"(
      _depositSender: string,
      _l1Token: string,
      _l2TxHash: BytesLike,
      _l2BlockNumber: BigNumberish,
      _l2MessageIndex: BigNumberish,
      _l2TxNumberInBlock: BigNumberish,
      _merkleProof: BytesLike[],
      overrides?: CallOverrides
    ): Promise<void>;

    deposit(
      _l2Receiver: string,
      _l1Token: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "deposit(address,address,uint256)"(
      _l2Receiver: string,
      _l1Token: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    finalizeWithdrawal(
      _l2BlockNumber: BigNumberish,
      _l2MessageIndex: BigNumberish,
      _l2TxNumberInBlock: BigNumberish,
      _message: BytesLike,
      _merkleProof: BytesLike[],
      overrides?: CallOverrides
    ): Promise<void>;

    "finalizeWithdrawal(uint256,uint256,uint16,bytes,bytes32[])"(
      _l2BlockNumber: BigNumberish,
      _l2MessageIndex: BigNumberish,
      _l2TxNumberInBlock: BigNumberish,
      _message: BytesLike,
      _merkleProof: BytesLike[],
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(
      _l2BridgeBytecode: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "initialize(bytes)"(
      _l2BridgeBytecode: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    isWithdrawalFinalized(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isWithdrawalFinalized(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    l2Bridge(overrides?: CallOverrides): Promise<string>;

    "l2Bridge()"(overrides?: CallOverrides): Promise<string>;

    l2TokenAddress(arg0: string, overrides?: CallOverrides): Promise<string>;

    "l2TokenAddress(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    ClaimedFailedDeposit(
      to: string | null,
      l1Token: string | null,
      amount: null
    ): EventFilter;

    DepositInitiated(
      from: string | null,
      to: string | null,
      l1Token: string | null,
      amount: null
    ): EventFilter;

    WithdrawalFinalized(
      to: string | null,
      l1Token: string | null,
      amount: null
    ): EventFilter;
  };

  estimateGas: {
    claimFailedDeposit(
      _depositSender: string,
      _l1Token: string,
      _l2TxHash: BytesLike,
      _l2BlockNumber: BigNumberish,
      _l2MessageIndex: BigNumberish,
      _l2TxNumberInBlock: BigNumberish,
      _merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "claimFailedDeposit(address,address,bytes32,uint256,uint256,uint16,bytes32[])"(
      _depositSender: string,
      _l1Token: string,
      _l2TxHash: BytesLike,
      _l2BlockNumber: BigNumberish,
      _l2MessageIndex: BigNumberish,
      _l2TxNumberInBlock: BigNumberish,
      _merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    deposit(
      _l2Receiver: string,
      _l1Token: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    "deposit(address,address,uint256)"(
      _l2Receiver: string,
      _l1Token: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    finalizeWithdrawal(
      _l2BlockNumber: BigNumberish,
      _l2MessageIndex: BigNumberish,
      _l2TxNumberInBlock: BigNumberish,
      _message: BytesLike,
      _merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    "finalizeWithdrawal(uint256,uint256,uint16,bytes,bytes32[])"(
      _l2BlockNumber: BigNumberish,
      _l2MessageIndex: BigNumberish,
      _l2TxNumberInBlock: BigNumberish,
      _message: BytesLike,
      _merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    initialize(
      _l2BridgeBytecode: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "initialize(bytes)"(
      _l2BridgeBytecode: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    isWithdrawalFinalized(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isWithdrawalFinalized(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    l2Bridge(overrides?: CallOverrides): Promise<BigNumber>;

    "l2Bridge()"(overrides?: CallOverrides): Promise<BigNumber>;

    l2TokenAddress(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    "l2TokenAddress(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    claimFailedDeposit(
      _depositSender: string,
      _l1Token: string,
      _l2TxHash: BytesLike,
      _l2BlockNumber: BigNumberish,
      _l2MessageIndex: BigNumberish,
      _l2TxNumberInBlock: BigNumberish,
      _merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "claimFailedDeposit(address,address,bytes32,uint256,uint256,uint16,bytes32[])"(
      _depositSender: string,
      _l1Token: string,
      _l2TxHash: BytesLike,
      _l2BlockNumber: BigNumberish,
      _l2MessageIndex: BigNumberish,
      _l2TxNumberInBlock: BigNumberish,
      _merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    deposit(
      _l2Receiver: string,
      _l1Token: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "deposit(address,address,uint256)"(
      _l2Receiver: string,
      _l1Token: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    finalizeWithdrawal(
      _l2BlockNumber: BigNumberish,
      _l2MessageIndex: BigNumberish,
      _l2TxNumberInBlock: BigNumberish,
      _message: BytesLike,
      _merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "finalizeWithdrawal(uint256,uint256,uint16,bytes,bytes32[])"(
      _l2BlockNumber: BigNumberish,
      _l2MessageIndex: BigNumberish,
      _l2TxNumberInBlock: BigNumberish,
      _message: BytesLike,
      _merkleProof: BytesLike[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _l2BridgeBytecode: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "initialize(bytes)"(
      _l2BridgeBytecode: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    isWithdrawalFinalized(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isWithdrawalFinalized(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    l2Bridge(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "l2Bridge()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    l2TokenAddress(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "l2TokenAddress(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
