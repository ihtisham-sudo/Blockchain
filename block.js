const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.Hash = this.calulateHash();
    }
    calulateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisblock()];
    }

    createGenesisblock(){
        return new Block(0, "01/01/2021", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().Hash;
        newBlock.Hash = newBlock.calulateHash();
        this.chain.push(newBlock);
    }
}

let newCoin = new Blockchain();
newCoin.addBlock(new Block(1, "10/07/2021", {amount: 4}));
newCoin.addBlock(new Block(2, "12/07/2021", {amount: 12}));
//console.log ('Is chain Valid ' + newCoin.isChainValid());
console.log(JSON.stringify(newCoin, null, 4));

