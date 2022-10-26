/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { RevertFallback } from "./RevertFallback";

export class RevertFallbackFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<RevertFallback> {
    return super.deploy(overrides || {}) as Promise<RevertFallback>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): RevertFallback {
    return super.attach(address) as RevertFallback;
  }
  connect(signer: Signer): RevertFallbackFactory {
    return super.connect(signer) as RevertFallbackFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RevertFallback {
    return new Contract(address, _abi, signerOrProvider) as RevertFallback;
  }
}

const _abi = [
  {
    stateMutability: "payable",
    type: "fallback",
  },
];

const _bytecode =
  "0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea264697066735822122050eb59ee98da78c425d27a9fe295d3ba014537b76b9352b52a39e44e57447af664736f6c63430008110033";
