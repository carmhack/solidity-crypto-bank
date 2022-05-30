import "./Balance.css";

function Balance({ balance, getBalance }) {
    return (
        <div className="box">
            <h3 className="title is-3">
                Balance 
                <span className="tag is-info" onClick={getBalance}>GET</span>
            </h3>
            <div className="block">
              <p>Your balance is {balance ? balance : '...'} ether</p>
            </div>
        </div>
    )
}

export default Balance;