const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function generateKey(){
    const privateKey = secp256k1.utils.randomPrivateKey();
    const publicKey = secp256k1.getPublicKey(privateKey);

    const privateKeyHex = toHex(privateKey);
    const publicKeyHex = toHex(publicKey);

    const adress = getAdress(publicKey);
    const addressHex = toHex(adress);

    return{
        privateKey: privateKeyHex,
        publicKey : publicKeyHex,
        address: addressHex,
    };
}


function getAddressEthFormat(publicKey){
    const slicedPubKey = publicKey.slice(1);
    const hashedPubKey = keccak256(slicedPubKey);
    const last20Hash = hashedPubKey.slice(-20);
    
    return last20Hash;
}

module.exports = { generateKey };