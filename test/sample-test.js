const { expect } = require("chai");
const { ethers } = require("hardhat");

/*
describe("GreetContract", function () {
  it("Should return the new greeting once it's changed", async function () {
    const GreetContract = await ethers.getContractFactory("GreetContract");
    const greetContract = await GreetContract.deploy("Hello, world!");
    await greetContract.deployed();

    expect(await greetContract.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greetContract.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greetContract.greet()).to.equal("Hola, mundo!");
  });
});
*/