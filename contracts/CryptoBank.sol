//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract CryptoBank {
    mapping (address => uint) private balances;
    address public owner;

    // Event about a deposit being made by an address and its amount
    event DepositMade(address indexed accountAddress, uint amount);

    constructor() {
        /* Set the owner to the creator of this contract */
        owner = msg.sender;
    }

    // Deposit ether into bank
    function deposit() public payable returns (uint) {
        balances[msg.sender] += msg.value;
        emit DepositMade(msg.sender, msg.value);
        return balances[msg.sender];
    }

    // Withdraw ether from bank
    function withdraw(uint withdrawAmount) public returns (uint currentBalance) {
        // Check enough balance available, otherwise just return balance
        if (withdrawAmount <= balances[msg.sender]) {
            balances[msg.sender] -= withdrawAmount;
            payable(msg.sender).transfer(withdrawAmount);
        }
        return balances[msg.sender];
    }

    // Reads balance of the account requesting
    function balance() public view returns (uint) {
        return balances[msg.sender];
    }

    // Balance of CryptoBank contract
    function totalBalance() public view returns (uint) {
        require(msg.sender == owner);
        return address(this).balance;
    }
}