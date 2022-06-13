import { useState } from "react";
import { ethers } from "ethers";
import CryptoBankContract from "../../artifacts/contracts/CryptoBank.sol/CryptoBank.json";

function Withdraw({ address, getBalance }) {
  const ether = 10**18;
  const [value, setValue] = useState(0.00001);

  const contractAddress = "0xd5325FA2a17541cF6f539DCA9A8d048Cb65Bf001";
  const abi = CryptoBankContract.abi;

  const withdrawMoney = async (event) => {
    try {
      event.preventDefault();
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const CryptoBankContract = new ethers.Contract(contractAddress, abi, signer);
        
        const tx = await CryptoBankContract.withdraw(value * ether, { from: address });
        await tx.wait();

        getBalance();
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <form onSubmit={withdrawMoney} className="dashboard-item box">
      <h3 className="title is-3">Preleva</h3>
      <div className="field">
        <label className="label">Ether</label>
        <div className="control">
          <input
            className="input"
            type="number"
            min="0.00001"
            max="30"
            step="0.00001"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0.00001"
          />
        </div>
      </div>

      <button className="button is-info is-outlined">Preleva</button>
    </form>
  )
}

export default Withdraw;