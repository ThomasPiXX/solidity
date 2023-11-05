async function getBalance(addresses){

    const batch = [];

    for(i = 0; i < addresses.length; i++){
        const request = {
            jsonrpc: "2.0",
            id:i,
            method: "eth_getBalance",
            params: [addresses[i]]
        }
        batch.push(request)
    }

    const  { data } = await axios.post(url, batch)

    const totalBalance = data.reduce((acc, cur) => parseInt(acc, 16) + parseInt(cur.result, 16), 0);

    console.log(totalBalance);
    
    return totalBalance;
}


