const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/b63ee298e80e44a094882eca1ae83a98'),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    ganache7: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "5777" // Match any network id
    }
  }
};