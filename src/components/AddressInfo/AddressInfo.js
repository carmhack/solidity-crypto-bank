function AddressInfo({ account }) {
  return (
    <div className="dashboard-item box">
      <h3 className="title is-3">
        I tuoi dati
      </h3>
      <div className="content">
        <p>Indirizzo<br/>{ account.address }</p>
        <p>Saldo: { account.balance }</p>
      </div>
    </div>
  )
}

export default AddressInfo;