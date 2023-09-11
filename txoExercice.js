//utxo to txo

class TXO{
    constructor(owner, amount){
        this.owner = owner;
        this.amount = amount;
        this.spent = false

    }
    spend() {
        this.spent = true;
    }

}

const txo = new TXO("1FNv3tXLkejPBYxDHDaZz6ENNz3zn3G4GM", 10);


class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
        
    }
    execute() {
        let inputAmount = 0;
        for(const inputUTXOs of this.inputUTXOs){
            if(inputUTXOs.spent === true){
                throw Error('input UTXOs already spent');
                inputAmount += inputUTXOs.amount;
            }
            inputAmount += inputUTXOs.amount;
        }
        
        let outputAmount = 0;
        for(const outputUTXOs of this.outputUTXOs){
            outputAmount += outputUTXOs.amount;
        }

        if (inputAmount < outputAmount){
            throw Error('Not enough found');
        }
        
    }
}

module.exports = Transaction;