// add the game address here and update the contract name if necessary
const gameAddr = "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690";
const contractName = "Game4";

async function main() {
  // attach to the game
  const game = await hre.ethers.getContractAt(contractName, gameAddr);

  
  const tx = await game.win(56);

  // did you win? Check the transaction receipt!
  // if you did, it will be in both the logs and events array
  const receipt = await tx.wait();
  // log the entire receipt
  console.log("Full receipt:", receipt);

  // check if there are any logs (events)
  /* if (receipt.logs && receipt.logs.length > 0) {
    console.log("Events emitted:");
    receipt.logs.forEach((log, index) => {
      console.log(`Log ${index}:`, log);
    });
  } else {
    console.log("No events were emitted.");
  } */
console.log('receipt.logs are: ', receipt.logs);

  const event = receipt.logs[0];
  const eventName = event.eventName;
  const winner = event.args[0];  // The first (and only) argument of the Winner event
  console.log(`Event Name: ${eventName}`);
  console.log(`Winner: ${winner}`);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
