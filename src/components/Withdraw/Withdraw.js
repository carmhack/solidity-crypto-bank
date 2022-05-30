import { useState } from "react";

function Withdraw({ contract, address }) {
  const ether = 10**18;
  const [value, setValue] = useState(0.00001);

  const withdraw = async (event) => {
    event.preventDefault();
    const tx = await contract.withdraw(value * ether, { from: address });
    // console.log(tx);
  }

  return (
    <form onSubmit={withdraw} className="box">
      <h3 className="title is-3">Withdraw</h3>
      <div className="field">
        <label className="label">Value</label>
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

      <button className="button is-primary">Withdraw</button>
    </form>
  )
}

export default Withdraw;