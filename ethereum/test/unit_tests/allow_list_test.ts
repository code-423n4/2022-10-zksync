import { expect } from 'chai';
import * as hardhat from 'hardhat';
import { AllowList, AllowListFactory } from '../../typechain';
import { getCallRevertReason } from './utils';
import * as ethers from 'ethers';

describe('Allow list tests', function () {
    let allowList: AllowList;
    let owner: ethers.Signer;
    let randomSigner: ethers.Signer;

    before(async () => {
        [owner, randomSigner] = await hardhat.ethers.getSigners();

        const contractFactory = await hardhat.ethers.getContractFactory('AllowList');
        const contract = await contractFactory.deploy(await owner.getAddress());
        allowList = AllowListFactory.connect(contract.address, contract.signer);
    });

    describe('Allow list functionality', function () {
        const target = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
        const funcSig = '0x1626ba7e';

        describe('setPermissionToCall', function () {
            it('non-owner failed to set permission to call', async () => {
                const revertReason = await getCallRevertReason(
                    allowList.connect(randomSigner).setPermissionToCall(await owner.getAddress(), target, funcSig, true)
                );
                expect(revertReason).equal('kx');
            });

            it('Check permission before', async () => {
                const hasSpecialAccessToCall = await allowList.hasSpecialAccessToCall(
                    await owner.getAddress(),
                    target,
                    funcSig
                );
                expect(hasSpecialAccessToCall).equal(false);

                const isAccessPublic = await allowList.isAccessPublic(target);
                expect(isAccessPublic).equal(false);

                const canCall = await allowList.canCall(await owner.getAddress(), target, funcSig);
                expect(canCall).equal(false);
            });

            it('Owner successfully set permission to call', async () => {
                await allowList.setPermissionToCall(await owner.getAddress(), target, funcSig, true);
            });

            it('Successfully set the same permission twice', async () => {
                await allowList.setPermissionToCall(await owner.getAddress(), target, funcSig, true);
            });

            it('Check permission after', async () => {
                const hasSpecialAccessToCall = await allowList.hasSpecialAccessToCall(
                    await owner.getAddress(),
                    target,
                    funcSig
                );
                expect(hasSpecialAccessToCall).equal(true);

                const isAccessPublic = await allowList.isAccessPublic(target);
                expect(isAccessPublic).equal(false);

                const canCall = await allowList.canCall(await owner.getAddress(), target, funcSig);
                expect(canCall).equal(true);
            });

            it('Successfully remove the permission', async () => {
                await allowList.setPermissionToCall(await owner.getAddress(), target, funcSig, false);
            });
        });
    });

    describe('setPublicAccess', function () {
        const target = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
        const funcSig = '0xdeadbeaf';

        it('non-owner failed to set permission to call', async () => {
            const revertReason = await getCallRevertReason(
                allowList.connect(randomSigner).setPublicAccess(target, true)
            );
            expect(revertReason).equal('kx');
        });

        it('Check permission before', async () => {
            const hasSpecialAccessToCall = await allowList.hasSpecialAccessToCall(
                await owner.getAddress(),
                target,
                funcSig
            );
            expect(hasSpecialAccessToCall).equal(false);

            const isAccessPublic = await allowList.isAccessPublic(target);
            expect(isAccessPublic).equal(false);

            const canCall = await allowList.canCall(await owner.getAddress(), target, funcSig);
            expect(canCall).equal(false);
        });

        it('Owner successfully set permission to call', async () => {
            await allowList.setPublicAccess(target, true);
        });

        it('Successfully set the same permission twice', async () => {
            await allowList.setPublicAccess(target, true);
        });

        it('Check permission after', async () => {
            const hasSpecialAccessToCall = await allowList.hasSpecialAccessToCall(
                await owner.getAddress(),
                target,
                funcSig
            );
            expect(hasSpecialAccessToCall).equal(false);

            const isAccessPublic = await allowList.isAccessPublic(target);
            expect(isAccessPublic).equal(true);

            const canCall = await allowList.canCall(await owner.getAddress(), target, funcSig);
            expect(canCall).equal(true);
        });

        it('Successfully remove the permission', async () => {
            await allowList.setPublicAccess(target, false);
        });
    });

    describe('Ownership functionality', function () {
        let newOwner: ethers.Signer;

        before(async () => {
            newOwner = (await hardhat.ethers.getSigners())[2];
        });

        it('set pending owner', async () => {
            const proposedOwner = await randomSigner.getAddress();
            await allowList.setPendingOwner(proposedOwner);

            const pendingOwner = await allowList.pendingOwner();
            expect(pendingOwner).equal(proposedOwner);
        });

        it('reset pending owner', async () => {
            const proposedOwner = await newOwner.getAddress();
            await allowList.setPendingOwner(proposedOwner);

            const pendingOwner = await allowList.pendingOwner();
            expect(pendingOwner).equal(proposedOwner);
        });

        it('failed to accept owner from not proposed account', async () => {
            const revertReason = await getCallRevertReason(allowList.connect(randomSigner).acceptOwner());
            expect(revertReason).equal('n0');
        });

        it('accept owner from proposed account', async () => {
            await allowList.connect(newOwner).acceptOwner();

            const owner = await allowList.owner();
            expect(owner).equal(await newOwner.getAddress());
        });
    });
});
