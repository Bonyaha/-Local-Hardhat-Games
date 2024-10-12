// add the game address here and update the contract name if necessary
const gameAddr = "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44";
const contractName = "Game2";

async function main() {
  // attach to the game
  const game = await hre.ethers.getContractAt(contractName, gameAddr);

  
  const tx1 = await game.setX(26);
  await tx1.wait();
  const tx2 = await game.setY(25);
  await tx2.wait();
  const tx3 = await game.win();

  // did you win? Check the transaction receipt!
  // if you did, it will be in both the logs and events array
  const receipt = await tx3.wait();
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
