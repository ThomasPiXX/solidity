const hre = require('hardhat');

async function main() {
    console.log("Starting deployment...");
    const Counter = await hre.ethers.getContractFactory("Counter");
    console.log("Contract factory loaded.");
    const counter = await Counter.deploy();
    console.log("Deployment submitted, waiting for confirmation...");

    await counter.deployTransaction.wait();
    console.log("Deployment confirmed.");

    console.log(`Counter Contract Deployed to: ${counter.address}`);
}

main().catch((error) => {
    console.error("Error during deployment:", error);
    process.exitCode = 1;
});