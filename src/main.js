const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate('testkey');

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const memeCoin = new Blockchain();

// Mine first block
memeCoin.minePendingTransactions(myWalletAddress);

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.signTransaction(myKey);
memeCoin.addTransaction(tx1);

// Mine block
memeCoin.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
memeCoin.addTransaction(tx2);

// Mine block
memeCoin.minePendingTransactions(myWalletAddress);

console.log();
console.log(`Balance of xavier is ${memeCoin.getBalanceOfAddress(myWalletAddress)}`);

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', memeCoin.isChainValid() ? 'Yes' : 'No');