const { ethers } = require("hardhat");
const { networkConfig } = require('../helper-hardhat-config');

module.exports = async({
  getNamedAccounts,
  deployments,
  getChainId
}) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  log("-----------------");
  const CryptoBank = await deploy('CryptoBank', {
    from: deployer,
    log: true
  });
  log(`Deployed contract at address: ${CryptoBank.address}\nDeployer: ${deployer}`);
  
  const contract = await ethers.getContractFactory("CryptoBank");
  const accounts = await ethers.getSigners();
  const signer = accounts[0];
  const myContract = new ethers.Contract(CryptoBank.address, contract.interface, signer);
  const networkName = networkConfig[chainId]['name'];
  log(`Verify with: \nnpx hardhat verify --network ${networkName} ${myContract.address}`);
}