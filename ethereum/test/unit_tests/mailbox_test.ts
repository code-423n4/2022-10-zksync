import { expect } from 'chai';
import * as hardhat from 'hardhat';
import { Action, facetCut, diamondCut } from '../../src.ts/diamondCut';
import { MailboxFacet, MailboxFacetFactory, DiamondInitFactory, AllowListFactory } from '../../typechain';
import { DEFAULT_REVERT_REASON, getCallRevertReason } from './utils';
import * as ethers from 'ethers';

describe('Mailbox tests', function () {
    let mailbox: MailboxFacet;
    const MAX_CODE_LEN_WORDS = (1 << 16) - 1;
    const MAX_CODE_LEN_BYTES = MAX_CODE_LEN_WORDS * 32;

    before(async () => {
        const mailboxFactory = await hardhat.ethers.getContractFactory('MailboxFacet');
        const mailboxContract = await mailboxFactory.deploy();
        const mailboxFacet = MailboxFacetFactory.connect(mailboxContract.address, mailboxContract.signer);

        const allowListFactory = await hardhat.ethers.getContractFactory('AllowList');
        const allowListContract = await allowListFactory.deploy(await allowListFactory.signer.getAddress());
        const allowList = AllowListFactory.connect(allowListContract.address, allowListContract.signer);

        // Note, that while this testsuit is focused on testing MailboxFaucet only,
        // we still need to initialize its storage via DiamondProxy
        const diamondInitFactory = await hardhat.ethers.getContractFactory('DiamondInit');
        const diamondInitContract = await diamondInitFactory.deploy();
        const diamondInit = DiamondInitFactory.connect(diamondInitContract.address, diamondInitContract.signer);

        const dummyHash = new Uint8Array(32);
        dummyHash.set([1, 0, 0, 1]);
        const diamondInitData = diamondInit.interface.encodeFunctionData('initialize', [
            ethers.constants.AddressZero,
            ethers.constants.AddressZero,
            ethers.constants.AddressZero,
            ethers.constants.HashZero,
            0,
            ethers.constants.HashZero,
            allowList.address,
            {
                recursionCircuitsSetVksHash: ethers.constants.HashZero,
                recursionLeafLevelVkHash: ethers.constants.HashZero,
                recursionNodeLevelVkHash: ethers.constants.HashZero
            },
            false,
            dummyHash,
            dummyHash
        ]);

        const facetCuts = [facetCut(mailboxFacet.address, mailboxFacet.interface, Action.Add, false)];
        const diamondCutData = diamondCut(facetCuts, diamondInit.address, diamondInitData);

        const contractFactory = await hardhat.ethers.getContractFactory('DiamondProxy');
        const chainId = hardhat.network.config.chainId;
        const contract = await contractFactory.deploy(chainId, diamondCutData);

        await (await allowList.setPublicAccess(contract.address, true)).wait();

        mailbox = MailboxFacetFactory.connect(contract.address, mailboxContract.signer);
    });

    it('Should accept correctly formatted bytecode', async () => {
        const revertReason = await getCallRevertReason(
            mailbox.requestL2Transaction(ethers.constants.AddressZero, 0, '0x', 100000, [new Uint8Array(32)])
        );

        expect(revertReason).equal(DEFAULT_REVERT_REASON);
    });

    it('Should not accept bytecode is not chunkable', async () => {
        const revertReason = await getCallRevertReason(
            mailbox.requestL2Transaction(ethers.constants.AddressZero, 0, '0x', 100000, [new Uint8Array(63)])
        );

        expect(revertReason).equal('po');
    });

    it('Should not accept bytecode of even length in words', async () => {
        const revertReason = await getCallRevertReason(
            mailbox.requestL2Transaction(ethers.constants.AddressZero, 0, '0x', 100000, [new Uint8Array(64)])
        );

        expect(revertReason).equal('pr');
    });

    it('Should not accept bytecode that is too long', async () => {
        const revertReason = await getCallRevertReason(
            mailbox.requestL2Transaction(ethers.constants.AddressZero, 0, '0x', 100000, [
                // "+64" to keep the length in words odd and bytecode chunkable
                new Uint8Array(MAX_CODE_LEN_BYTES + 64)
            ])
        );

        expect(revertReason).equal('pp');
    });
});
