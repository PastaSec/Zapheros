require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    polygon: {
      url: process.env.RPC_URL, // Uses the RPC URL from .env
      accounts: [process.env.DEPLOYER_PRIVATE_KEY], // Uses the private key from .env
    },
  },
};

