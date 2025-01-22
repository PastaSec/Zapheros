// Import the CommonJS module properly
import Web3EthAbi from 'web3-eth-abi';

const abiCoder = Web3EthAbi;

// Define the constructor arguments and their types
const constructorArgs = [1000000]; // Example initial supply
const constructorArgTypes = ['uint256'];

try {
    // Encode the constructor arguments
    const encodedArgs = abiCoder.encodeParameters(constructorArgTypes, constructorArgs);
    console.log('Encoded Constructor Arguments:', encodedArgs);
} catch (error) {
    console.error('Error encoding arguments:', error.message);
}

