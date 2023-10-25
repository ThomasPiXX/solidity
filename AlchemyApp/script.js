const { Network, Alchemy } = require('alchemy-sdk');

const settings = {
    apiKey: "R_cs2uMoZi4ZbwxjAEjuRXsdd0vzVuhs",
    network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);

// get the latest block
const latestBlock = alchemy.core.getBlock("latest").then(console.log);