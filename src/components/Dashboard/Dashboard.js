import { useCallback, useEffect } from "react";
import Balance from "../Balance/Balance";
import Deposit from "../Deposit/Deposit";
import Withdraw from "../Withdraw/Withdraw";
import { getEtherFrom } from "../../utils/format";
import AddressInfo from "../AddressInfo/AddressInfo";

function Dashboard({ contract, account, setAccount }) {
  const getBalance = useCallback(async () => {
    if (contract) {
      const wei = await contract.balance({ from: account.address });
      const newBalance = getEtherFrom(wei);
      setAccount({
        ...account,
        balance: newBalance
      });
    }
  }, [account, contract, setAccount])

  useEffect(() => {
    getBalance();
  }, [contract, getBalance]);

  return (
    <section className="section">
      <div className="columns">
        <div className="column">
          <Balance
            balance={account.balance}
            getBalance={getBalance}
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
            contract={contract}
            address={account.address}
          />
        </div>
        <div className="column">
          <Withdraw
            contract={contract}
            address={account.address}
          />
        </div>
      </div>
    </section>
  )
}

export default Dashboard;