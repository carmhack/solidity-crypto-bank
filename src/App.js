import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import CryptoBank from "./artifacts/contracts/CryptoBank.sol/CryptoBank.json";
import Balance from "./components/Balance/Balance";
import Deposit from "./components/Deposit/Deposit";
import Withdraw from "./components/Withdraw/Withdraw";
import { getEtherFrom } from "./utils/format";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState({
    address: null,
    balance: null,
  });

  const initConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setAccount({
        ...account,
        address: accounts[0]
      });
      const CryptoBankContract = new ethers.Contract(
        "0x83D824D4Ff16DAFCA2DA8CEdda0b2207969b6550",
        CryptoBank.abi,
        signer
      )
      setContract(CryptoBankContract);
    } else {
      console.log("Please install MetaMask");
    }
  }

  useEffect(() => {
    initConnection();
  }, []);

  useEffect(() => {
    getBalance();
  }, [contract]);

  const getBalance = async () => {
    if (contract) {
      const wei = await contract.balance({ from: account.address });
      const newBalance = getEtherFrom(wei);
      setAccount({
        ...account,
        balance: newBalance
      });
    }
  }

  return (
    <div>
      <section className="hero is-medium is-link">
        <div className="hero-body">
          <p className="title">
            CRYPTO BANK
          </p>
          <p className="subtitle">
            A fullstack web3 example
          </p>
        </div>
      </section>

      <main>
        <section className="section">
          <Balance
            balance={account.balance}
            getBalance={getBalance}
          />

          <Deposit
            contract={contract}
            address={account.address}
          />

          <Withdraw
            contract={contract}
            address={account.address}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
