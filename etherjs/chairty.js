const provider = new providers.Web3Provider(ganacheProvider);

const oneEther = utils.parseEther('1');

async function donate(privateKey, charities) {
    const walletGiv = new Wallet(privateKey, provider);

    for(i = 0; i < charities.length; i++){
        const tx = await walletGiv.sendTransaction({
            value: oneEther,
            to: charities[i],
            gasLimit: 0x5208,
            gasPrice: 0x3b9aca00
        });
}
}
module.exports = donate;