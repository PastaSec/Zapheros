const hre = require("hardhat");

async function main() {
  const initialSupply = hre.ethers.utils.parseUnits("1000000000", 18); // 1,000,000,000 tokens with 18 decimals
  const ZapherosToken = await hre.ethers.getContractFactory("ZapherosToken");
  const token = await ZapherosToken.deploy(initialSupply);

  await token.deployed();

  console.log(`ZapherosToken deployed to: ${token.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

