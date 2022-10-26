/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { RevertReceiveAccount } from "./RevertReceiveAccount";

export class RevertReceiveAccountFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<RevertReceiveAccount> {
    return super.deploy(overrides || {}) as Promise<RevertReceiveAccount>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): RevertReceiveAccount {
    return super.attach(address) as RevertReceiveAccount;
  }
  connect(signer: Signer): RevertReceiveAccountFactory {
    return super.connect(signer) as RevertReceiveAccountFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RevertReceiveAccount {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as RevertReceiveAccount;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "revertReceive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "newValue",
        type: "bool",
      },
    ],
    name: "setRevertReceive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506000805460ff1916905561010e8061002a6000396000f3fe608060405260043610602a5760003560e01c8063607e2cb2146045578063aa4593dc14606f57600080fd5b3660405760005460ff1615603e57603e609b565b005b600080fd5b348015605057600080fd5b50603e605c36600460b1565b6000805460ff1916911515919091179055565b348015607a57600080fd5b5060005460879060ff1681565b604051901515815260200160405180910390f35b634e487b7160e01b600052600160045260246000fd5b60006020828403121560c257600080fd5b8135801515811460d157600080fd5b939250505056fea2646970667358221220d0ea4d38d52c2ce3f1ee0720422ce4125713c600e19c782c06736cce70082b0e64736f6c63430008110033";
