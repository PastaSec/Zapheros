require('dotenv').config();
const axios = require('axios');

const verifyContract = async () => {
    const apiKey = process.env.API_KEY;
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const compilerVersion = process.env.COMPILER_VERSION;
    const optimizationUsed = process.env.OPTIMIZATION_USED;
    const optimizerRuns = process.env.OPTIMIZER_RUNS;
    const licenseType = process.env.LICENSE_TYPE;

    const sourceCode = `
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.24;

    contract ZapherosToken is ERC20 {
        constructor(uint256 initialSupply) ERC20("Zapheros", "ZAPH") {
            _mint(msg.sender, initialSupply * (10 ** decimals()));
        }
    }
    `;

    const encodedArgs = ""; // Provide ABI-encoded constructor arguments

    try {
        const response = await axios.post('https://api.polygonscan.com/api', {
            apikey: apiKey,
            module: 'contract',
            action: 'verifysourcecode',
            contractaddress: contractAddress,
            sourceCode,
            codeformat: 'solidity-single-file',
            contractname: 'ZapherosToken',
            compilerversion: compilerVersion,
            optimizationUsed,
            runs: optimizerRuns,
            constructorArguements: encodedArgs,
            licenseType,
        });

        console.log('Verification Response:', response.data);
    } catch (error) {
        console.error('Error during contract verification:', error.response?.data || error.message);
    }
};

verifyContract();

