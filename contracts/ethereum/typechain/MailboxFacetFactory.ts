/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { MailboxFacet } from "./MailboxFacet";

export class MailboxFacetFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<MailboxFacet> {
    return super.deploy(overrides || {}) as Promise<MailboxFacet>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MailboxFacet {
    return super.attach(address) as MailboxFacet;
  }
  connect(signer: Signer): MailboxFacetFactory {
    return super.connect(signer) as MailboxFacetFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MailboxFacet {
    return new Contract(address, _abi, signerOrProvider) as MailboxFacet;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "txId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "expirationBlock",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "txType",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "from",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "to",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ergsLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ergsPerPubdataByteLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxFeePerErg",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerErg",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "paymaster",
            type: "uint256",
          },
          {
            internalType: "uint256[6]",
            name: "reserved",
            type: "uint256[6]",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
          {
            internalType: "uint256[]",
            name: "factoryDeps",
            type: "uint256[]",
          },
          {
            internalType: "bytes",
            name: "paymasterInput",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "reservedDynamic",
            type: "bytes",
          },
        ],
        indexed: false,
        internalType: "struct IMailbox.L2CanonicalTransaction",
        name: "transaction",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "bytes[]",
        name: "factoryDeps",
        type: "bytes[]",
      },
    ],
    name: "NewPriorityRequest",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "l2TransactionBaseCost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_blockNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "l2ShardId",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "isService",
            type: "bool",
          },
          {
            internalType: "uint16",
            name: "txNumberInBlock",
            type: "uint16",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "key",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "value",
            type: "bytes32",
          },
        ],
        internalType: "struct L2Log",
        name: "_log",
        type: "tuple",
      },
      {
        internalType: "bytes32[]",
        name: "_proof",
        type: "bytes32[]",
      },
    ],
    name: "proveL2LogInclusion",
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
        internalType: "uint256",
        name: "_blockNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint16",
            name: "txNumberInBlock",
            type: "uint16",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct L2Message",
        name: "_message",
        type: "tuple",
      },
      {
        internalType: "bytes32[]",
        name: "_proof",
        type: "bytes32[]",
      },
    ],
    name: "proveL2MessageInclusion",
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
        internalType: "address",
        name: "_contractL2",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_l2Value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_ergsLimit",
        type: "uint256",
      },
      {
        internalType: "bytes[]",
        name: "_factoryDeps",
        type: "bytes[]",
      },
    ],
    name: "requestL2Transaction",
    outputs: [
      {
        internalType: "bytes32",
        name: "canonicalTxHash",
        type: "bytes32",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_txId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_l2Value",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "_contractAddressL2",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_ergsLimit",
        type: "uint256",
      },
      {
        internalType: "bytes[]",
        name: "_factoryDeps",
        type: "bytes[]",
      },
    ],
    name: "serializeL2Transaction",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "txType",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "from",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "to",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ergsLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ergsPerPubdataByteLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxFeePerErg",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerErg",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "paymaster",
            type: "uint256",
          },
          {
            internalType: "uint256[6]",
            name: "reserved",
            type: "uint256[6]",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
          {
            internalType: "uint256[]",
            name: "factoryDeps",
            type: "uint256[]",
          },
          {
            internalType: "bytes",
            name: "paymasterInput",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "reservedDynamic",
            type: "bytes",
          },
        ],
        internalType: "struct IMailbox.L2CanonicalTransaction",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061158f806100206000396000f3fe60806040526004361061004a5760003560e01c8063263b7f8e1461004f5780635cd6771e14610084578063725ad850146100b6578063e4948f43146100c9578063ed9937f5146100e9575b600080fd5b34801561005b57600080fd5b5061006f61006a366004610cc5565b610116565b60405190151581526020015b60405180910390f35b34801561009057600080fd5b506100a861009f366004610dbe565b60009392505050565b60405190815260200161007b565b6100a86100c4366004610e42565b61012f565b3480156100d557600080fd5b5061006f6100e4366004610ed6565b6102cb565b3480156100f557600080fd5b50610109610104366004610f4b565b6102e2565b60405161007b91906111a5565b600061012586868686866103fe565b9695505050505050565b7f8e94fed44239eb2314ab7a406345e6c5a8f0ccedf3b600de3d004e672c33abf4546000906001811461018e5760405162461bcd60e51b8152602060048201526002602482015261723160f01b60448201526064015b60405180910390fd5b60027f8e94fed44239eb2314ab7a406345e6c5a8f0ccedf3b600de3d004e672c33abf4556013546001600160a01b031660006101cd60048236816111bf565b6101d6916111e9565b60405163b700961360e01b81523360048201523060248201526001600160e01b0319821660448201529091506001600160a01b0383169063b700961390606401602060405180830381865afa158015610233573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102579190611217565b6102885760405162461bcd60e51b8152602060048201526002602482015261373960f11b6044820152606401610185565b50610299338b8b8b8b8b8b8b61058d565b60017f8e94fed44239eb2314ab7a406345e6c5a8f0ccedf3b600de3d004e672c33abf4559a9950505050505050505050565b600061012586866102db876105fb565b86866103fe565b6102ea610b75565b604051806101c0016040528060ff8152602001896001600160a01b03168152602001886001600160a01b03168152602001858152602001600181526020016000815260200160008152602001600081526020016040518060c001604052808d81526020018c81526020016000815260200160008152602001600081526020016000815250815260200187878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052509385525050604080519283526020808401825284019290925250016103ca85856106b9565b81526040805160008082526020808301845280850192909252825190815290810182529101529a9950505050505050505050565b600b546000908611156104385760405162461bcd60e51b81526020600482015260026024820152610f0f60f31b6044820152606401610185565b8351602080860151604080880151606089015160808a015160a08b015193516000976104be97909695910160f896871b6001600160f81b031916815294151590951b600185015260f09290921b6001600160f01b031916600284015260601b6bffffffffffffffffffffffff191660048301526018820152603881019190915260580190565b6040516020818303038152906040528051906020012090507f72abee45b59e344af8a6e520241c4744aff26ed411f4c4b00f8af09adada43ba60001b810361052d5760405162461bcd60e51b8152602060048201526002602482015261747760f01b6044820152606401610185565b600983146105625760405162461bcd60e51b8152602060048201526002602482015261393d60f11b6044820152606401610185565b600061057085858985610793565b6000898152600f6020526040902054149250505095945050505050565b6000622000008411156105c75760405162461bcd60e51b8152602060048201526002602482015261756960f01b6044820152606401610185565b60006105d460654361124a565b6011549091506105ec8b828b8d8c8c888d8d8d610918565b9b9a5050505050505050505050565b6040805160c0808201835260008083526020808401829052838501829052606084018290526080840182905260a0840182905284519283018552908252600182820152919290919082019061065290850185611263565b61ffff1681526020016180086001600160a01b0316815260200183602001602081019061067f919061127e565b6001600160a01b0316815260200161069a6040850185611299565b6040516106a89291906112e0565b604051908190039020905292915050565b6060818067ffffffffffffffff8111156106d5576106d5610c08565b6040519080825280602002602001820160405280156106fe578160200160208202803683370190505b50915060005b8181101561078b57600061076f868684818110610723576107236112f0565b90506020028101906107359190611299565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506109d992505050565b60018301602002850152506107848160010190565b9050610704565b505092915050565b600083806107c85760405162461bcd60e51b8152602060048201526002602482015261786360f01b6044820152606401610185565b61010081106107fe5760405162461bcd60e51b8152602060048201526002602482015261189d60f21b6044820152606401610185565b6108098160026113ea565b841061083c5760405162461bcd60e51b8152602060048201526002602482015261383d60f11b6044820152606401610185565b8260005b8281101561090d5761085360028761140c565b6000036108ab578188888381811061086d5761086d6112f0565b9050602002013560405160200161088e929190918252602082015260400190565b6040516020818303038152906040528051906020012091506108f8565b8787828181106108bd576108bd6112f0565b90506020020135826040516020016108df929190918252602082015260400190565b6040516020818303038152906040528051906020012091505b610903600287611420565b9550600101610840565b509695505050505050565b60008061092c8b8b8e8c8c8c8b8b8b6102e2565b90508060405160200161093f91906111a5565b60408051601f19818403018152828252805160209182012060608401835280845267ffffffffffffffff8a1691840191909152600091830191909152925061098990601090610b12565b7f495dc9d0a89f360c60ef3a526f2c3cec6c71258543272ee494a0dabb262edcd18b83888488886040516109c29695949392919061145d565b60405180910390a1509a9950505050505050505050565b6000602082516109e9919061140c565b15610a1b5760405162461bcd60e51b8152602060048201526002602482015261706f60f01b6044820152606401610185565b600060208351610a2b9190611420565b9050620100008110610a645760405162461bcd60e51b8152602060048201526002602482015261070760f41b6044820152606401610185565b610a6f60028261140c565b600114610aa35760405162461bcd60e51b8152602060048201526002602482015261383960f11b6044820152606401610185565b600283604051610ab39190611524565b602060405180830381855afa158015610ad0573d6000803e3d6000fd5b5050506040513d601f19601f82011682018060405250810190610af39190611540565b60e09190911b6001600160e01b039190911617600160f81b1792915050565b600180830154600081815260208581526040918290208551815590850151918501516001600160c01b0316680100000000000000000267ffffffffffffffff909216919091179083015590610b6890829061124a565b8360010181905550505050565b604051806101c001604052806000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001610bc1610bea565b815260200160608152602001606081526020016060815260200160608152602001606081525090565b6040518060c001604052806006906020820280368337509192915050565b634e487b7160e01b600052604160045260246000fd5b803560ff81168114610c2f57600080fd5b919050565b8015158114610c4257600080fd5b50565b8035610c2f81610c34565b803561ffff81168114610c2f57600080fd5b80356001600160a01b0381168114610c2f57600080fd5b60008083601f840112610c8b57600080fd5b50813567ffffffffffffffff811115610ca357600080fd5b6020830191508360208260051b8501011115610cbe57600080fd5b9250929050565b6000806000806000858703610120811215610cdf57600080fd5b863595506020870135945060c0603f1982011215610cfc57600080fd5b5060405160c0810167ffffffffffffffff8282108183111715610d2f57634e487b7160e01b600052604160045260246000fd5b81604052610d3f60408a01610c1e565b8352610d4d60608a01610c45565b6020840152610d5e60808a01610c50565b6040840152610d6f60a08a01610c62565b606084015260c0890135608084015260e089013560a08401529194506101008801359180831115610d9f57600080fd5b5050610dad88828901610c79565b969995985093965092949392505050565b600080600060608486031215610dd357600080fd5b8335925060208401359150604084013563ffffffff81168114610df557600080fd5b809150509250925092565b60008083601f840112610e1257600080fd5b50813567ffffffffffffffff811115610e2a57600080fd5b602083019150836020828501011115610cbe57600080fd5b600080600080600080600060a0888a031215610e5d57600080fd5b610e6688610c62565b965060208801359550604088013567ffffffffffffffff80821115610e8a57600080fd5b610e968b838c01610e00565b909750955060608a0135945060808a0135915080821115610eb657600080fd5b50610ec38a828b01610c79565b989b979a50959850939692959293505050565b600080600080600060808688031215610eee57600080fd5b8535945060208601359350604086013567ffffffffffffffff80821115610f1457600080fd5b908701906060828a031215610f2857600080fd5b90935060608701359080821115610f3e57600080fd5b50610dad88828901610c79565b600080600080600080600080600060e08a8c031215610f6957600080fd5b8935985060208a01359750610f8060408b01610c62565b9650610f8e60608b01610c62565b955060808a013567ffffffffffffffff80821115610fab57600080fd5b610fb78d838e01610e00565b909750955060a08c0135945060c08c0135915080821115610fd757600080fd5b50610fe48c828d01610c79565b915080935050809150509295985092959850929598565b8060005b600681101561101e578151845260209384019390910190600101610fff565b50505050565b60005b8381101561103f578181015183820152602001611027565b50506000910152565b60008151808452611060816020860160208601611024565b601f01601f19169290920160200192915050565b600081518084526020808501945080840160005b838110156110a457815187529582019590820190600101611088565b509495945050505050565b6000610260825184526020830151602085015260408301516040850152606083015160608501526080830151608085015260a083015160a085015260c083015160c085015260e083015160e08501526101008084015161111182870182610ffb565b5050610120830151816101c086015261112c82860182611048565b9150506101408301518482036101e08601526111488282611048565b9150506101608301518482036102008601526111648282611074565b9150506101808301518482036102208601526111808282611048565b9150506101a083015184820361024086015261119c8282611048565b95945050505050565b6020815260006111b860208301846110af565b9392505050565b600080858511156111cf57600080fd5b838611156111dc57600080fd5b5050820193919092039150565b6001600160e01b0319813581811691600485101561078b5760049490940360031b84901b1690921692915050565b60006020828403121561122957600080fd5b81516111b881610c34565b634e487b7160e01b600052601160045260246000fd5b8082018082111561125d5761125d611234565b92915050565b60006020828403121561127557600080fd5b6111b882610c50565b60006020828403121561129057600080fd5b6111b882610c62565b6000808335601e198436030181126112b057600080fd5b83018035915067ffffffffffffffff8211156112cb57600080fd5b602001915036819003821315610cbe57600080fd5b8183823760009101908152919050565b634e487b7160e01b600052603260045260246000fd5b600181815b8085111561134157816000190482111561132757611327611234565b8085161561133457918102915b93841c939080029061130b565b509250929050565b6000826113585750600161125d565b816113655750600061125d565b816001811461137b5760028114611385576113a1565b600191505061125d565b60ff84111561139657611396611234565b50506001821b61125d565b5060208310610133831016604e8410600b84101617156113c4575081810a61125d565b6113ce8383611306565b80600019048211156113e2576113e2611234565b029392505050565b60006111b88383611349565b634e487b7160e01b600052601260045260246000fd5b60008261141b5761141b6113f6565b500690565b60008261142f5761142f6113f6565b500490565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b86815260006020878184015267ffffffffffffffff808816604085015260a0606085015261148e60a08501886110af565b8481036080860152858152828101600587901b820184018860005b8981101561151157848303601f190184528135368c9003601e190181126114cf57600080fd5b8b018781019035878111156114e357600080fd5b8036038213156114f257600080fd5b6114fd858284611434565b9589019594505050908601906001016114a9565b50909d9c50505050505050505050505050565b60008251611536818460208701611024565b9190910192915050565b60006020828403121561155257600080fd5b505191905056fea264697066735822122062301338e8a97b8484122a6ad57a7ced07511918c069a7724249e96ae5655e9764736f6c63430008110033";
