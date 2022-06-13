//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract CryptoBank {
    mapping (address => uint256) private balances;
    address public owner;
    bool locked = false;

    constructor() {
        /* Set the owner to the creator of this contract */
        owner = msg.sender;
    }

    // Deposit ether into bank
    function deposit() public payable returns (uint256) {
        balances[msg.sender] += msg.value;
        return balances[msg.sender];
    }

    // Withdraw ether from bank
    function withdraw(uint256 amount) public returns (uint256) {
        require(!locked, "Reentrant call detected!");
        locked = true;
        // Check enough balance available, otherwise just return balance
        require(amount <= balances[msg.sender]);
        (bool success, ) = payable(msg.sender).call{ value: amount }("");
        require(success, "Transfer failed.");
        locked = false;
        return balances[msg.sender];
    }

    // Reads balance of the account requesting
    function balance() public view returns (uint256) {
        return balances[msg.sender];
    }

    // Balance of CryptoBank contract
    function totalBalance() public view returns (uint256) {
        require(msg.sender == owner);
        return address(this).balance;
    }
}