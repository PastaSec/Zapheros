// Import necessary modules using require
const AbiCoder = require('web3-eth-abi').AbiCoder;
const { BigNumber } = require('ethers');

// Instantiate AbiCoder
const abiCoder = new AbiCoder();

// Function to encode constructor arguments
const encodeConstructorArgs = () => {
    // Define the initial supply and token decimals
    const initialSupply = BigNumber.from("1000000000"); // Replace with your actual initial supply
    const decimals = BigNumber.from("18"); // Standard ERC20 decimals

    // Calculate the total supply: initialSupply * (10 ** decimals)
    const totalSupply = initialSupply.mul(BigNumber.from("10").pow(decimals));

    // Encode the constructor arguments
    const encodedArgs = abiCoder.encodeParameters(
        ['uint256'], // Data type of constructor arguments
        [totalSupply.toString()] // Pass as a string to avoid overflow errors
    );

    console.log('Encoded Constructor Arguments:', encodedArgs);
};

// Run the encoding function
encodeConstructorArgs();

