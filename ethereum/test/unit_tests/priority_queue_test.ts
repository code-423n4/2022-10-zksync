import { expect } from 'chai';
import * as hardhat from 'hardhat';
import { ethers } from 'hardhat';
import { PriorityQueueTest, PriorityQueueTestFactory } from '../../typechain';
import { getCallRevertReason } from './utils';

describe('Priority queue tests', function () {
    let priorityQueueTest: PriorityQueueTest;
    let queue = [];

    before(async () => {
        const contractFactory = await hardhat.ethers.getContractFactory('PriorityQueueTest');
        const contract = await contractFactory.deploy();
        priorityQueueTest = PriorityQueueTestFactory.connect(contract.address, contract.signer);
    });

    describe('on empty queue', function () {
        it('getSize', async () => {
            const size = await priorityQueueTest.getSize();
            expect(size.eq(0)).equal(true);
        });

        it('getFirstUnprocessedPriorityTx', async () => {
            const firstUnprocessedTx = await priorityQueueTest.getFirstUnprocessedPriorityTx();
            expect(firstUnprocessedTx.eq(0)).equal(true);
        });

        it('getTotalPriorityTxs', async () => {
            const totalPriorityTxs = await priorityQueueTest.getTotalPriorityTxs();
            expect(totalPriorityTxs.eq(0)).equal(true);
        });

        it('isEmpty', async () => {
            const isEmpty = await priorityQueueTest.isEmpty();
            expect(isEmpty).equal(true);
        });

        it('failed to get front', async () => {
            const revertReason = await getCallRevertReason(priorityQueueTest.front());
            expect(revertReason).equal('D');
        });

        it('failed to pop', async () => {
            const revertReason = await getCallRevertReason(priorityQueueTest.popFront());
            expect(revertReason).equal('s');
        });
    });

    describe('push operations', function () {
        const NUMBER_OPERATIONS = 10;

        before(async () => {
            for (let i = 0; i < NUMBER_OPERATIONS; ++i) {
                const dummyOp = { canonicalTxHash: ethers.constants.HashZero, expirationBlock: i, layer2Tip: i };
                queue.push(dummyOp);
                await priorityQueueTest.pushBack(dummyOp);
            }
        });

        it('front', async () => {
            const frontElement = await priorityQueueTest.front();

            expect(frontElement.canonicalTxHash).equal(queue[0].canonicalTxHash);
            expect(frontElement.expirationBlock.eq(queue[0].expirationBlock)).equal(true);
            expect(frontElement.layer2Tip.eq(queue[0].layer2Tip)).equal(true);
        });

        it('getSize', async () => {
            const size = await priorityQueueTest.getSize();
            expect(size.eq(queue.length)).equal(true);
        });

        it('getFirstUnprocessedPriorityTx', async () => {
            const firstUnprocessedTx = await priorityQueueTest.getFirstUnprocessedPriorityTx();
            expect(firstUnprocessedTx.eq(0)).equal(true);
        });

        it('getTotalPriorityTxs', async () => {
            const totalPriorityTxs = await priorityQueueTest.getTotalPriorityTxs();
            expect(totalPriorityTxs.eq(queue.length)).equal(true);
        });

        it('isEmpty', async () => {
            const isEmpty = await priorityQueueTest.isEmpty();
            expect(isEmpty).equal(false);
        });
    });

    describe('pop operations', function () {
        const NUMBER_OPERATIONS = 4;

        before(async () => {
            for (let i = 0; i < NUMBER_OPERATIONS; ++i) {
                const frontElement = await priorityQueueTest.front();
                expect(frontElement.canonicalTxHash).equal(queue[0].canonicalTxHash);
                expect(frontElement.expirationBlock.eq(queue[0].expirationBlock)).equal(true);
                expect(frontElement.layer2Tip.eq(queue[0].layer2Tip)).equal(true);

                await priorityQueueTest.popFront();
                queue.shift();
            }
        });

        it('front', async () => {
            const frontElement = await priorityQueueTest.front();

            expect(frontElement.canonicalTxHash).equal(queue[0].canonicalTxHash);
            expect(frontElement.expirationBlock.eq(queue[0].expirationBlock)).equal(true);
            expect(frontElement.layer2Tip.eq(queue[0].layer2Tip)).equal(true);
        });

        it('getSize', async () => {
            const size = await priorityQueueTest.getSize();
            expect(size.eq(queue.length)).equal(true);
        });

        it('getFirstUnprocessedPriorityTx', async () => {
            const firstUnprocessedTx = await priorityQueueTest.getFirstUnprocessedPriorityTx();
            expect(firstUnprocessedTx.eq(NUMBER_OPERATIONS)).equal(true);
        });

        it('getTotalPriorityTxs', async () => {
            const totalPriorityTxs = await priorityQueueTest.getTotalPriorityTxs();
            expect(totalPriorityTxs.eq(queue.length + NUMBER_OPERATIONS)).equal(true);
        });

        it('isEmpty', async () => {
            const isEmpty = await priorityQueueTest.isEmpty();
            expect(isEmpty).equal(false);
        });
    });
});
