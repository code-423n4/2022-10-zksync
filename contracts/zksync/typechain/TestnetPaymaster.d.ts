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
  PayableOverrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface TestnetPaymasterInterface extends ethers.utils.Interface {
  functions: {
    "postOp(bytes,tuple,bytes32,bytes32,uint8,uint256)": FunctionFragment;
    "validateAndPayForPaymasterTransaction(bytes32,bytes32,tuple)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "postOp",
    values: [
      BytesLike,
      {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      BytesLike,
      BytesLike,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "validateAndPayForPaymasterTransaction",
    values: [
      BytesLike,
      BytesLike,
      {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      }
    ]
  ): string;

  decodeFunctionResult(functionFragment: "postOp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "validateAndPayForPaymasterTransaction",
    data: BytesLike
  ): Result;

  events: {};
}

export class TestnetPaymaster extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: TestnetPaymasterInterface;

  functions: {
    postOp(
      _context: BytesLike,
      _transaction: {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      arg2: BytesLike,
      arg3: BytesLike,
      _txResult: BigNumberish,
      _maxRefundedErgs: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "postOp(bytes,(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256[6],bytes,bytes,bytes32[],bytes,bytes),bytes32,bytes32,uint8,uint256)"(
      _context: BytesLike,
      _transaction: {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      arg2: BytesLike,
      arg3: BytesLike,
      _txResult: BigNumberish,
      _maxRefundedErgs: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    validateAndPayForPaymasterTransaction(
      arg0: BytesLike,
      arg1: BytesLike,
      _transaction: {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "validateAndPayForPaymasterTransaction(bytes32,bytes32,(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256[6],bytes,bytes,bytes32[],bytes,bytes))"(
      arg0: BytesLike,
      arg1: BytesLike,
      _transaction: {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;
  };

  postOp(
    _context: BytesLike,
    _transaction: {
      txType: BigNumberish;
      from: BigNumberish;
      to: BigNumberish;
      ergsLimit: BigNumberish;
      ergsPerPubdataByteLimit: BigNumberish;
      maxFeePerErg: BigNumberish;
      maxPriorityFeePerErg: BigNumberish;
      paymaster: BigNumberish;
      reserved: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ];
      data: BytesLike;
      signature: BytesLike;
      factoryDeps: BytesLike[];
      paymasterInput: BytesLike;
      reservedDynamic: BytesLike;
    },
    arg2: BytesLike,
    arg3: BytesLike,
    _txResult: BigNumberish,
    _maxRefundedErgs: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "postOp(bytes,(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256[6],bytes,bytes,bytes32[],bytes,bytes),bytes32,bytes32,uint8,uint256)"(
    _context: BytesLike,
    _transaction: {
      txType: BigNumberish;
      from: BigNumberish;
      to: BigNumberish;
      ergsLimit: BigNumberish;
      ergsPerPubdataByteLimit: BigNumberish;
      maxFeePerErg: BigNumberish;
      maxPriorityFeePerErg: BigNumberish;
      paymaster: BigNumberish;
      reserved: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ];
      data: BytesLike;
      signature: BytesLike;
      factoryDeps: BytesLike[];
      paymasterInput: BytesLike;
      reservedDynamic: BytesLike;
    },
    arg2: BytesLike,
    arg3: BytesLike,
    _txResult: BigNumberish,
    _maxRefundedErgs: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  validateAndPayForPaymasterTransaction(
    arg0: BytesLike,
    arg1: BytesLike,
    _transaction: {
      txType: BigNumberish;
      from: BigNumberish;
      to: BigNumberish;
      ergsLimit: BigNumberish;
      ergsPerPubdataByteLimit: BigNumberish;
      maxFeePerErg: BigNumberish;
      maxPriorityFeePerErg: BigNumberish;
      paymaster: BigNumberish;
      reserved: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ];
      data: BytesLike;
      signature: BytesLike;
      factoryDeps: BytesLike[];
      paymasterInput: BytesLike;
      reservedDynamic: BytesLike;
    },
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "validateAndPayForPaymasterTransaction(bytes32,bytes32,(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256[6],bytes,bytes,bytes32[],bytes,bytes))"(
    arg0: BytesLike,
    arg1: BytesLike,
    _transaction: {
      txType: BigNumberish;
      from: BigNumberish;
      to: BigNumberish;
      ergsLimit: BigNumberish;
      ergsPerPubdataByteLimit: BigNumberish;
      maxFeePerErg: BigNumberish;
      maxPriorityFeePerErg: BigNumberish;
      paymaster: BigNumberish;
      reserved: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
      ];
      data: BytesLike;
      signature: BytesLike;
      factoryDeps: BytesLike[];
      paymasterInput: BytesLike;
      reservedDynamic: BytesLike;
    },
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  callStatic: {
    postOp(
      _context: BytesLike,
      _transaction: {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      arg2: BytesLike,
      arg3: BytesLike,
      _txResult: BigNumberish,
      _maxRefundedErgs: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "postOp(bytes,(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256[6],bytes,bytes,bytes32[],bytes,bytes),bytes32,bytes32,uint8,uint256)"(
      _context: BytesLike,
      _transaction: {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      arg2: BytesLike,
      arg3: BytesLike,
      _txResult: BigNumberish,
      _maxRefundedErgs: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    validateAndPayForPaymasterTransaction(
      arg0: BytesLike,
      arg1: BytesLike,
      _transaction: {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<string>;

    "validateAndPayForPaymasterTransaction(bytes32,bytes32,(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256[6],bytes,bytes,bytes32[],bytes,bytes))"(
      arg0: BytesLike,
      arg1: BytesLike,
      _transaction: {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    postOp(
      _context: BytesLike,
      _transaction: {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      arg2: BytesLike,
      arg3: BytesLike,
      _txResult: BigNumberish,
      _maxRefundedErgs: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    "postOp(bytes,(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256[6],bytes,bytes,bytes32[],bytes,bytes),bytes32,bytes32,uint8,uint256)"(
      _context: BytesLike,
      _transaction: {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      arg2: BytesLike,
      arg3: BytesLike,
      _txResult: BigNumberish,
      _maxRefundedErgs: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    validateAndPayForPaymasterTransaction(
      arg0: BytesLike,
      arg1: BytesLike,
      _transaction: {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    "validateAndPayForPaymasterTransaction(bytes32,bytes32,(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256[6],bytes,bytes,bytes32[],bytes,bytes))"(
      arg0: BytesLike,
      arg1: BytesLike,
      _transaction: {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      overrides?: PayableOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    postOp(
      _context: BytesLike,
      _transaction: {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      arg2: BytesLike,
      arg3: BytesLike,
      _txResult: BigNumberish,
      _maxRefundedErgs: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "postOp(bytes,(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256[6],bytes,bytes,bytes32[],bytes,bytes),bytes32,bytes32,uint8,uint256)"(
      _context: BytesLike,
      _transaction: {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      arg2: BytesLike,
      arg3: BytesLike,
      _txResult: BigNumberish,
      _maxRefundedErgs: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    validateAndPayForPaymasterTransaction(
      arg0: BytesLike,
      arg1: BytesLike,
      _transaction: {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "validateAndPayForPaymasterTransaction(bytes32,bytes32,(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256[6],bytes,bytes,bytes32[],bytes,bytes))"(
      arg0: BytesLike,
      arg1: BytesLike,
      _transaction: {
        txType: BigNumberish;
        from: BigNumberish;
        to: BigNumberish;
        ergsLimit: BigNumberish;
        ergsPerPubdataByteLimit: BigNumberish;
        maxFeePerErg: BigNumberish;
        maxPriorityFeePerErg: BigNumberish;
        paymaster: BigNumberish;
        reserved: [
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish,
          BigNumberish
        ];
        data: BytesLike;
        signature: BytesLike;
        factoryDeps: BytesLike[];
        paymasterInput: BytesLike;
        reservedDynamic: BytesLike;
      },
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;
  };
}
