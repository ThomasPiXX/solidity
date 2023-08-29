const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");


const privateKey = secp.secp256k1.utils.randomPrivateKey();
console.log("Private Key =" + toHex(privateKey));

const publicKey = secp.secp256k1.getPublicKey(privateKey);
console.log("public Key bytes: " + (publicKey));
console.log("public Key: " + toHex(publicKey));


const address = keccak256(publicKey.slice(1).slice(-20));
console.log("address: " + "ox" + toHex(address));
console.log("address bytes: " + address);

const message = "block Transaction"
const messageBytes = utf8ToBytes(message);
const messageHash = keccak256(messageBytes);

console.log("messge hash: " + toHex(messageHash));

//signature 
const messageSign = secp.secp256k1.sign(messageHash, privateKey);
console.log("Signed message" + messageSign );
console.log("recovery bit: ", messageSign.recovery);

const isValid = secp.secp256k1.verify(messageSign, messageHash, publicKey);
console.log("signature validation : " + isValid);

const recoveredPublicKey = messageSign.recoverPublicKey(messageHash).toHex();
console.log("recovered public Key from signature: " + recoveredPublicKey);

if (toHex(publicKey) === recoveredPublicKey) {
    console.log("recovered publicKey match !!")
}else{
    console.log("recovered publicKey dosent match ");
}
//looking to import secp256k1 