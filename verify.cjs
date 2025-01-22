require('dotenv').config();
const axios = require('axios');
const qs = require('qs'); // For encoding POST data

const verifyContract = async () => {
    const contractAddress = process.env.CONTRACT_ADDRESS || "0x67478605E5ae5D3A5C1dEC73A4adc949B3F484D8";
    const compilerVersion = process.env.COMPILER_VERSION || "v0.8.24+commit.e11b9ed9";
    const optimizationUsed = process.env.OPTIMIZATION_USED || "1";
    const optimizerRuns = process.env.OPTIMIZER_RUNS || "200";
    const licenseType = process.env.LICENSE_TYPE || "3";
    const apiKey = '3Y357YENPEWHUZFVXS9HE9WCB7IC6CEBGT';
    // Your encoded constructor arguments (replace if necessary)
    const encodedArgs = "0x00000000000000000000000000000000000000000000000000000000000f4240";
    const sourceCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Your full Solidity source code here
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}

contract ERC20 is IERC20, IERC20Metadata {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function decimals() public view override returns (uint8) {
        return 18;
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) public view override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        _transfer(sender, recipient, amount);
        uint256 currentAllowance = _allowances[sender][msg.sender];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        _approve(sender, msg.sender, currentAllowance - amount);
        return true;
    }

    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        uint256 senderBalance = _balances[sender];
        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
        _balances[sender] = senderBalance - amount;
        _balances[recipient] += amount;

        emit Transfer(sender, recipient, amount);
    }

    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
}

contract ZapherosToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Zapheros", "ZAPH") {
        _mint(msg.sender, initialSupply * (10 ** decimals()));
    }
}
    `;

try {
        const payload = qs.stringify({
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
            constructorArguments: encodedArgs,
            licenseType,
        });

        const response = await axios.post('https://api.polygonscan.com/api', payload, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        console.log('Verification Response:', response.data);
    } catch (error) {
        console.error('Error during contract verification:', error.response?.data || error.message);
    }
};

verifyContract();

