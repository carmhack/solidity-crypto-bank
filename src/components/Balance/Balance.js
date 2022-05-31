import "./Balance.css";

function Balance({ balance, getBalance }) {
  return (
    <div className="box">
      <h3 className="title is-3">
        Saldo
        <span className="tag is-medium is-info" onClick={getBalance}>Ottieni</span>
      </h3>
      <div className="block">
        <h4 className="subtitle is-4">
          Il tuo saldo è di {balance ? balance : '[n.d.]'} ether
        </h4>
      </div>
    </div>
  )
}

export default Balance;