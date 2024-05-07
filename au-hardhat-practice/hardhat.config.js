require('dotenv').config({ path: 'C:/Users/tommy/OneDrive/Bureau/code/BlockChain/au-hardhat-practice/.env' });
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_TEST_NET_RPC_URL,
      accounts: [process.env.TESTNET_PRIVATE_KEY]
    },
  },
};