import { BigNumber } from 'ethers';

export const IERC20_INTERFACE = require('@openzeppelin/contracts/build/contracts/IERC20');
export const DEFAULT_REVERT_REASON = 'VM did not revert';

/// Set of parameters that are needed to test the processing of priority operations
export class DummyOp {
    constructor(public id: number, public expirationBlock: BigNumber, public layer2Tip: number) {}
}

export async function getCallRevertReason(promise) {
    let revertReason = DEFAULT_REVERT_REASON;
    try {
        await promise;
    } catch (e) {
        try {
            revertReason = e.message.substring(e.message.lastIndexOf(' ') + 1).replace(/["']/g, '');
        } catch (_) {
            throw e;
        }
    }
    return revertReason;
}
