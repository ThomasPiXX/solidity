import { useState } from "react";
import server from "./server";
import { keccak256} from "ethereum-cryptography/keccak"; 
import { secp256k1 } from "ethereum-cryptography/secp256k1"
import { utf8ToBytes } from "ethereum-cryptography/utils";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature , setSignature] = useState("");
  const [transactionData, setTransactionData] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    setTransactionData ({
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
      signature,
    });
    

    //hash the transaction data
    function hashingTransaction(transactionData) {
    const byteTransactionData = utf8ToBytes(transactionData);
    const hashingTransaction = keccak256(byteTransactionData);
    return hashingTransaction;
    }

    const  hashTransactionData = hashingTransaction(transactionData);

    // Sign the transaction hash
    const privateKey = "b5587d92872481512a95c8f446f9de74377d470bc36f8f613c99da9cec1d07d3b5587d92872481512a95c8f446f9de74377d470bc36f8f613c99da9cec1d07d3";
    async function signMessage(transactionHash) {
      const hashedTransaction = hashingTransaction(transactionHash);
      return secp256k1.sign(hashedTransaction, privateKey, { recovered: true })
    }
    const signedTransaction = signMessage(hashTransactionData);
    setSignature(signedTransaction);

    //TODO stringify  the transaction data
  
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature,
        transactionData,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
