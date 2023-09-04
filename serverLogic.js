const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require("ethereum-cryptography/secp256k1");


app.use(cors());
app.use(express.json());

const balances = {
  //private key:d4cd1a901430652520b3ddfa7ba4a18a9f860174f4754480f61c6392f169925b
  "024e1a3fa81d9b476ed7cb6bbb45a9cd6ffea8c669a4a3514f179d72c33217376b": 100,
  //private Key:69664ba50f99461bf012ff79c2408724b0ac786db0b69e129edaf02086e322b6
  "033c5418b06daf178d8d80f58c430131ef67f760a69c818421de1f1f814c143562": 50,
  //private Key:d043ee709c334a45fe5f15cd981497a58d609171ffc0134732db20f80e624946
  "0350dab3331336322c2e7b662bf933dc05759050a104c15829b2450d1d19ea9908": 75,

};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {

  //TODO: get a signature from the client-side application
  //recover the public address from the signature 

  const { sender, recipient, amount, signature, hashedMessage } = req.body;
  
  //get sign from client 

  let parseSignature = JSON.parse(signature);
  parseSignature.r = BigInt(parseSignature.r);
  parseSignature.s = BigInt(parseSignature.s);

  console.log("restored Signature : ", parseSignature);

  let isVerified = secp.secp256k1.verify(parseSignature, hashedMessage, sender);

  console.log('isVerified : ', isVerified);

  if(!isVerified) {
    res.status(400).send({message:"transaction Denied"});
    return;
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if(balances[sender] < amount) {
    res.status(400).send({ message: "Not enough found"});
  }else{
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({balance: balances[sender], isVerified});
  }
});
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}


