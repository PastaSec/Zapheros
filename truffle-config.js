require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const { MNEMONIC, RPC_URL } = process.env;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost for Ganache
      port: 8545,            // Standard Ethereum port
      network_id: "*",       // Match any network id
    },
    polygon: {
      provider: () => new HDWalletProvider(MNEMONIC, RPC_URL),
      network_id: 137,       // Polygon Mainnet ID
      gas: 6000000,          // Gas limit
      gasPrice: 150000000000, // 150 Gwei
      confirmations: 2,      // # of confirmations to wait between deployments
      timeoutBlocks: 200,    // # of blocks before deployment times out
      skipDryRun: true       // Skip dry run before migrations
    },
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.24",      // Fetch exact version from solc-bin
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },

  db: {
    enabled: false
  }
};

