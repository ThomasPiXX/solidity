const { Network, Alchemy } = require('alchemy-sdk');

const settings = {
    apiKey: "R_cs2uMoZi4ZbwxjAEjuRXsdd0vzVuhs",
    network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);
/*
// get the latest block
const latestBlock = alchemy.core.getBlock("latest").then(console.log);
*/

// get all the sent transactions from given address
const sentTransactions = alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    fromAddress: "0x994b342dd87fc825f66e51ffa3ef71ad818b6893",
    category: ["erc721", "external", "erc20"],
}).then(console.log);