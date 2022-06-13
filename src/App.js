import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState({
    address: null,
  });

  const contractAddress = "0xd5325FA2a17541cF6f539DCA9A8d048Cb65Bf001";

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        const address = accounts[0];
        setIsWalletConnected(true);
        setAccount({
          ...account,
          address
        });
        console.log("Account Connected: ", address);
      } else {
        setError("Please install a MetaMask wallet to use our bank.");
        console.log("No Metamask detected");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div>
      <section className="hero is-medium is-link">
        <div className="hero-body">
          <p className="title">
            CRYPTO BANK
          </p>
          <p className="subtitle">
            Un esempio di dApp fullstack<br/>
            Il <a href={`https://rinkeby.etherscan.io/address/${contractAddress}`} target="_blank" rel="noreferrer">contratto</a> è sulla rete di test Rinkeby.
          </p>
        </div>
      </section>

      <main>
        { !account.address && <Login /> }
        {
          account.address &&
          <Dashboard account={account} />
        }
      </main>
    </div>
  );
}

export default App;
