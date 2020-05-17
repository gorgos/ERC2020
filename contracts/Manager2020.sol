// SPDX-License-Identifier: MIT
pragma solidity ^0.6.8;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@nomiclabs/buidler/console.sol";

import "./ERC2020.sol";

contract Manager2020 {
    using SafeERC20 for IERC20;
    IERC20 public token;

    constructor(IERC20 _token2020) public {
        token = _token2020;
    }

    function mint(uint256 amount) public {
        console.log("About to mint", amount / 1e18, "TWY...");
        ERC2020(address(token)).mint(address(this), amount);
        console.log("Mint was successful");
    }

    function transfer(address to, uint256 amount) public {
        console.log("About to transfer to", to, amount / 1e18, "TWY...");
        token.safeTransfer(to, amount);
        console.log("Transfer was successful");
    }
}