const Block = require('./constructorDataLogic.js');



class Blockchain {

    constructor() {
        this.chain = [new Block('')];
    }

    addBlock(newBlock) {
        const previousBlock = this.chain[this.chain.length - 1];
        newBlock.previousHash = previousBlock.hash.toString();
        newBlock.hash = newBlock.toHash();
        this.chain.push(newBlock);
    }
}


const Blockchain = new Blockchain();

const block = new Block('euh euh euh')

Blockchain.addBlock(block);