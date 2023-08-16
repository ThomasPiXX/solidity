const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp256k1.utils.randomPrivateKey();

const publicKey = secp256k1.getPublicKey(privateKey);

function getAdress(publicKey){
    const slicedPubKey = publicKey.slice(1);
    const hashedPubKey = keccak256(slicedPubKey);
    const last20Hash = hashedPubKey.slice(-20);

    return last20Hash;
}

const address = getAdress(publicKey);
console.log('public key/address = ', toHex(address));
