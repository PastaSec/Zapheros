const hre = require("hardhat");

async function main() {
    const flattened = await hre.run("flatten", {
        files: ["./contracts/ZapherosToken.sol"],
    });
    console.log(flattened);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });

