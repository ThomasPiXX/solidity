const SHA256 = require('crypto-js/sha256');

class Block {

//receiving the new instance of block class created by the constructor data is parameter part of class
    
    constructor(data){
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.toHash();
    }



    toHash() {
        return SHA256(this.data).toString();;
    }
}

const block = new Block("");
console.log(block.data)

module.exports = Block;