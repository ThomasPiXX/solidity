require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");


module.exports = {
  solidity: "0.8.24",
  nethworks: {
    sepolia: {
      url: process.env.ALCHEMY_TEST_NET_RPC_URL,
      account: [process.env.TESTNET_PRIAVE_KEY],
    },
  },
};
