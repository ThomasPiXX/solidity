const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

function hashMessage(message) {
    const messageBytes = utf8ToBytes(message);
    const hash = keccak256(messageBytes);
    

    console.log(hash);
    return hash;
}

module.exports = hashMessage;





const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

async function signMessage(msg) {
    const hashedMessage = hashMessage(msg);
    return secp.sign(hashedMessage, PRIVATE_KEY, { recovery : true });
    

    }

module.exports = signMessage;

async function recoverKey (message, signature, recoveryBit) {
    const hashedMessage = hashMessage(message);

    const publicKey = secp.recoverPublicKey( hashedMessage, signature, recoveryBit);
    console.log(publicKey);
    return publicKey;
}


console.log("new route for send on ecdsa-node// code reference ");

/*     try {
    const requestData = JSON.stringify({
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
      signature,
      transactionData,
    });
    const {
      data: { balance },
    } = await server.post(`send`,requestData);
    setBalance(balance);
  } catch (ex) {
    alert(ex.response.data.message);
  }
  */