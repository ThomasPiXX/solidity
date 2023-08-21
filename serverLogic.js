const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { generateKeys } = require("./scripts/generate");
const crypto = require("crypto");
const sqlite3= require('sqlite3');
const db = new sqlite3.Database('key.db');


app.use(cors());
app.use(express.json());

const balances = {
  "7124bc48f5720817e3269ba59d86d6cbbe6244f9": 100,//jf
  "31c9a9469a482efbe11db0fa0331564296858152": 50,//tom
  "72233cce05b6a3607d143bf9c34147ee9bbd85d": 75,//kerny
};



app.post("/generateKeys", (req, res)  =>{
  const { username, password } = req.body;


  const { privateKey, publicKey, address } = generateKeys();

  const hashedPrivateKey = hashPrivateKey(privateKey);
  const hashedPassword = hashPassword(password);

  // Store user data in the database
  const insertQuery = `
    INSERT INTO users (username, privateKey, publicKey, password, balance)
    VALUES (?, ?, ?, ?, ?)`;
    
    const initialBalance = 100;
  db.run(insertQuery, [username, hashedPrivateKey, publicKey, hashedPassword, initialBalance], (error) => {
    if (error) {
      console.error("Error storing user data:", error);
      res.status(500).send({ message: "Error storing user data" });
    } else {
      res.send({ publicKey });
    }
  });
});
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;

  db.get("SELECT balance FROM users WHERE publicKey = ?", [address], (error, row) => {
    if (error) {
      console.error("Error fetching balance:", error);
      res.status(500).send({ message: "Error fetching balance" });
    } else {
      const balance = row ? row.balance : 0;
      res.send({ balance });
    }
  });
});

// Transfer logic
app.post("/send", async (req, res) => {
  const { sender, recipient, amount, password } = req.body;

  // Fetch sender's data from the database
  db.get("SELECT * FROM users WHERE publicKey = ?", [sender], async (error, senderRow) => {
    if (error) {
      console.error("Error fetching sender's data:", error);
      res.status(500).send({ message: "Error fetching sender's data" });
    } else {
      const senderBalance = senderRow ? senderRow.balance : 0;
      const hashedPassword = hashPassword(password); // Hash the entered password

      // Check if the entered password matches the stored hashed password
      if (hashedPassword !== senderRow.password) {
        res.status(401).send({ message: "Invalid password" });
      } else if (senderBalance < amount) {
        res.status(400).send({ message: "Not enough funds!" });
      } else {
        const newSenderBalance = senderBalance - amount;

        // Update sender's balance in the database
        db.run("UPDATE users SET balance = ? WHERE publicKey = ?", [newSenderBalance, sender], async (updateError) => {
          if (updateError) {
            console.error("Error updating sender's balance:", updateError);
            res.status(500).send({ message: "Error updating sender's balance" });
          } else {
            // Fetch recipient's balance from the database
            db.get("SELECT balance FROM users WHERE publicKey = ?", [recipient], (recipientError, recipientRow) => {
              if (recipientError) {
                console.error("Error fetching recipient's balance:", recipientError);
                res.status(500).send({ message: "Error fetching recipient's balance" });
              } else {
                const recipientBalance = recipientRow ? recipientRow.balance : 0;
                const newRecipientBalance = recipientBalance + amount;

                // Update recipient's balance in the database
                db.run("UPDATE users SET balance = ? WHERE publicKey = ?", [newRecipientBalance, recipient], (updateRecipientError) => {
                  if (updateRecipientError) {
                    console.error("Error updating recipient's balance:", updateRecipientError);
                    res.status(500).send({ message: "Error updating recipient's balance" });
                  } else {
                    res.send({ balance: newSenderBalance });
                  }
                });
              }
            });
          }
        });
      }
    }
  });
});
console.log('react is annoying very annoying');

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function hashPrivateKey(privatekey){
  const hash = crypto.createHash("sha256");
  hash.update(privatekey);
  return hash.digest("hex");
}

function hashPassword(password) {
  const salt = "random_salt_value";
  const hash = crypto.createHash("sha256");
  hash.update(password + salt);
  return hash.digest("hex");
}