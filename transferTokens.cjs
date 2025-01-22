const Web3 = require('web3');

// Step 1: Connect to Polygon
const rpcUrl = 'https://polygon-mainnet.infura.io/v3/fdcb6692f8d94eeb8a7f0d89e128fe98'; // Replace with your RPC URL
const web3 = new Web3(rpcUrl);
const { abi } = require('./artifacts/contracts/ZapherosToken.sol/ZapherosToken.json');
// Step 2: Define Contract Details
const contractAddress = '0x67478605E5ae5D3A5C1dEC73A4adc949B3F484D8'; // Replace with the ZAPH token contract address
const contract = new web3.eth.Contract(abi, contractAddress);

// Step 3: Wallet Information
const senderAddress = '0x78aD934036212EaF4bc44daB1035721753b9FAa6'; // Replace with your wallet address
const privateKey = '3b38e55502ca57d92fc024e0e488a6ff60a2c4485e62077531975f5cb6f749d5'; // Replace with your private key (keep it safe!)

const recipientAddress = '0x78aD934036212EaF4bc44daB1035721753b9FAa6'; // The recipient
const amountToTransfer = web3.utils.toWei('1000000000', 'ether'); // 1,000,000,000 ZAPH

// Step 4: Build, Sign, and Send the Transaction
const transferTokens = async () => {
  try {
    // Encode the transaction
    const txData = contract.methods.transfer(recipientAddress, amountToTransfer).encodeABI();

    // Get current gas price
    const gasPrice = await web3.eth.getGasPrice();

    // Estimate gas limit
    const gasLimit = await contract.methods.transfer(recipientAddress, amountToTransfer).estimateGas({
      from: senderAddress,
    });

    // Build the transaction
    const tx = {
      from: senderAddress,
      to: contractAddress,
      gas: gasLimit,
      gasPrice: gasPrice,
      data: txData,
    };

    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log('Transaction successful! Receipt:', receipt);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Call the function
transferTokens();

