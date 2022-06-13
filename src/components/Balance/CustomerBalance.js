import "./CustomerBalance.css";

function CustomerBalance({ balance }) {
  return (
    <div className="dashboard-item box">
      <h3 className="title is-3">
        Saldo
      </h3>
      <div className="block">
        <h4 className="subtitle is-4">
          Il tuo saldo è di {balance ? balance : '[n.d.]'} ether
        </h4>
      </div>
    </div>
  )
}

export default CustomerBalance;