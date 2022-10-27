import '@nomiclabs/hardhat-solpp';
import '@nomiclabs/hardhat-ethers';
import "hardhat-gas-reporter";
import 'hardhat-typechain';
import "solidity-coverage";

const prodConfig = {
    UPGRADE_NOTICE_PERIOD: 0,
    // PRIORITY_EXPIRATION: 101,
    // NOTE: Should be greater than 0, otherwise zero approvals will be enough to make an instant upgrade!
    SECURITY_COUNCIL_APPROVALS_FOR_EMERGENCY_UPGRADE: 1,
    DUMMY_VERIFIER: false
};
const testConfig = {
    UPGRADE_NOTICE_PERIOD: 0,
    PRIORITY_EXPIRATION: 101,
    SECURITY_COUNCIL_APPROVALS_FOR_EMERGENCY_UPGRADE: 2,
    DUMMY_VERIFIER: true
};

export default {
    solidity: {
        version: '0.8.17',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            },
            outputSelection: {
                '*': {
                    '*': ['storageLayout']
                }
            }
        }
    },
    contractSizer: {
        runOnCompile: false
    },
    paths: {
        sources: './contracts'
    },
    solpp: {
        defs: (() => {
            if (process.env.CONTRACT_TESTS) {
                return testConfig;
            }
            return prodConfig;
        })()
    }
};
