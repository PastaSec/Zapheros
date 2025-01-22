// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Use only the token-specific path for imports
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ZapherosToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Zapheros", "ZAPH") {
        _mint(msg.sender, initialSupply * (10 ** decimals()));
    }
}

