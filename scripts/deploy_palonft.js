async function main() {
  const PaloNFT = await ethers.getContractFactory("PaloNFT");

  // Start deployment, returning a promise that resolves to a contract object
  const paloNFT = await PaloNFT.deploy();
  await paloNFT.deployed();
  console.log("Contract deployed to address:", paloNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
