import { useState } from "react";

function Deposit({ contract, address }) {
  const ether = 10**18;
  const [value, setValue] = useState(0.00001);

  const deposit = async (event) => {
    event.preventDefault();
    await contract.deposit({
      from: address,
      value: value * ether
    });
  }

  return (
    <form onSubmit={deposit} className="dashboard-item box">
      <h3 className="title is-3">Deposita</h3>
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
            placeholder="e.g. 10"
          />
        </div>
      </div>

      <button className="button is-info is-outlined">Invia richiesta</button>
    </form>
  )
}

export default Deposit;