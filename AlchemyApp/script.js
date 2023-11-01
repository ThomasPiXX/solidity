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

/*
// get all the sent transactions from given address
const sentTransactions = alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    fromAddress: "0x994b342dd87fc825f66e51ffa3ef71ad818b6893",
    category: ["erc721", "external", "erc20"],
}).then(console.log);
*/

// get the node leaf balance/address from an extension node address
const balance = alchemy.core
    .getTokenBalances('0x994b342dd87fc825f66e51ffa3ef71ad818b6893')
    .then(data => {
        const tokenBalances = data.tokenBalances.map(balance => {
            return {
                contractAddress: balance.contractAddress,
                tokenBalance: parseInt(balance.tokenBalance, 16) // Convert hexadecimal to decimal
            }
        });
        console.log({ address: data.address, tokenBalances });
    });
