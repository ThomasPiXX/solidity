const axios = require('axios');

const ALCHEMY_URL = "https://eth-goerli.g.alchemy.com/v2/R_cs2uMoZi4ZbwxjAEjuRXsdd0vzVuhs"

/*
axios.post(ALCHEMY_URL, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBlockByNumber",
    params: [
        "0xbb443", // block 46147
        false // retrieve the full transaction object in transactions array
    ]
}).then((response) =>{
    console.log(response.data.result);
});*/

axios.post(ALCHEMY_URL, {
    jsonrpc: "2.0",
    method : "eth_getBalance",
    params : [
        "0x12463F7566d797a4b36517eB3A1cAFaB58f1A381"
    ],
    id: 0
}).then((response) => {
    console.log(response.data.result);
});
