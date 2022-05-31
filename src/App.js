import { useState, useCallback } from "react";
import { ethers } from "ethers";
import "./App.css";
import CryptoBank from "./artifacts/contracts/CryptoBank.sol/CryptoBank.json";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState({
    address: null,
    addressBalance: null,
    balance: null,
  });

  const initConnection = useCallback(async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const addressBalance = await window.ethereum.request({ method: "eth_getBalance", params: [accounts[0], 'latest'] });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setAccount({
        ...account,
        addressBalance,
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
  }, [account]);

  const checkAccount = () => {
    if (!contract && !account.address) {
      return (
        <Login connect={initConnection} />
      );
    } else {
      return (
        <Dashboard
          account={account}
          contract={contract}
          setAccount={setAccount}
        />
      );
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
            Un esempio di dApp fullstack - Indirizzo: {account.address ? account.address : 'non connesso'}
          </p>
        </div>
      </section>

      <main>
        { checkAccount() }
      </main>
    </div>
  );
}

export default App;
