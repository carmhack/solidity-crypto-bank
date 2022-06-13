import { useEffect, useState } from "react";
import { ethers } from "ethers";
import CustomerBalance from "../Balance/CustomerBalance";
import Deposit from "../Deposit/Deposit";
import Withdraw from "../Withdraw/Withdraw";
import AddressInfo from "../AddressInfo/AddressInfo";
import CryptoBankContract from "../../artifacts/contracts/CryptoBank.sol/CryptoBank.json";
import { getEtherFrom } from "../../utils/format";

function Dashboard({ account }) {
  const [addressBalance, setAddressBalance] = useState(null);

  const contractAddress = "0xd5325FA2a17541cF6f539DCA9A8d048Cb65Bf001";
  const abi = CryptoBankContract.abi;

  const getBalance = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const CryptoBankContract = new ethers.Contract(contractAddress, abi, signer);

        const wei = await CryptoBankContract.balance({ from: account.address });
        setAddressBalance(getEtherFrom(wei));
      }
    } catch (error) {
      console.log('error');
    }
  }

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <section className="section">
      <div className="columns">
        <div className="column">
          <CustomerBalance
            balance={addressBalance}
          />
        </div>
        <div className="column">
          <AddressInfo
            account={account}
          />
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <Deposit
            address={account.address}
            getBalance={getBalance}
          />
        </div>
        <div className="column">
          <Withdraw
            address={account.address}
            getBalance={getBalance}
          />
        </div>
      </div>
    </section>
  )
}

export default Dashboard;