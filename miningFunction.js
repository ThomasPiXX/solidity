const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    const pushTrasaction = mempool.push(transaction);
}

function mine() {
    const previousBlock = blocks[blocks.length - 1];
    const id = previousBlock ? previousBlock.id + 1 : 0;
    const block = { id }
    blocks.push(block);

    const transactions = mempool.splice(0, MAX_TRANSACTIONS);
    block.transactions = transactions;

    for(const transaction of transactions) {
        const index = mempool.indexOf(transaction);
        if( index !== -1) {
            mempool.splice(index, 1);
        }
    }
    block.nonce = 0;

    while(true){
    
    const blockToJsonString = JSON.stringify(block);
    const hashedJsonBlockObj = SHA256(blockToJsonString);
    const hashToBigInt = BigInt(`0x${hashedJsonBlockObj}`);

    if (hashToBigInt < TARGET_DIFFICULTY ){
    
        block.hash = hashedJsonBlockObj;
        break;
    }
        block.nonce++;
    }
    return block.hash;

}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};