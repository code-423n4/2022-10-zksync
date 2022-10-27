import '@nomiclabs/hardhat-solpp';
import '@matterlabs/hardhat-zksync-solc';
import "hardhat-gas-reporter";
import 'hardhat-typechain';
import "solidity-coverage";

export default {
    zksolc: {
        version: 'beta',
        compilerSource: 'docker',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            },
            experimental: {
                dockerImage: 'matterlabs/zksolc',
                tag: 'beta'
            }
        }
    },
    solidity: {
        version: '0.8.17'
    },
    paths: {
        sources: './contracts'
    },
    networks: {
        hardhat: {
            zksync: true
        }
    }
};
