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
    isValid(){
        if(this.chain[0].previousHash !== ''){
            return false;
        }
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            const previousBlockHash = previousBlock.hash.toString();

            if( previousBlockHash !== currentBlock.previousHash || 
                currentBlock.hash !== currentBlock.toHash()){
                return false;
            }
        }
        return true;
    }
}


const Blockchain = new Blockchain();

const block = new Block('euh euh euh')

Blockchain.addBlock(block);