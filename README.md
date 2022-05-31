# Crypto Bank
Questa repository contiene un progetto di esempio **full stack** per una dApp chiamata Crypto Bank.

### Tecnologie
- **React**: sviluppo del frontend
- **Bulma CSS**: gestione del layout frontend
- **ethers.js**: per l'interazione con Ethereum
- **Solidity**: sviluppo del contratto (8.0.9)
- **hardhat**: compilazione, testing e deploy del contratto

Lo scopo della repository è quello di offrire un esempio a chi vuole avvicinarsi allo sviluppo sul web3. Non sono trattati tutti gli aspetti dello sviluppo (ad es. la sicurezza).

## Smart contract
Il contratto memorizza due informazioni:
- i saldi di chi utilizza il contratto (*privato*)
`mapping (address => uint) private balances`
- l'indirizzo del creatore del contratto (*pubblico*)
`address public owner`
    
Sono presenti 4 metodi.

#### Deposit
```js
function deposit() public payable returns (uint) {
    balances[msg.sender] += msg.value;
    emit DepositMade(msg.sender, msg.value);
    return balances[msg.sender];
}
```

Il metodo aggiunge una quantità di ether al saldo dell'utente, emette un evento DepositMade e ritorna il saldo dell'utente. La funzione deve essere di tipo `payable`.

#### Withdraw
```js
function withdraw(uint withdrawAmount) public returns (uint) {
    // Check enough balance available
    if (withdrawAmount <= balances[msg.sender]) {
        balances[msg.sender] -= withdrawAmount;
        payable(msg.sender).transfer(withdrawAmount);
    }
    return balances[msg.sender];
}
```

Viene effettuato prima di tutto un controllo sul saldo: se il prelievo richiesto super il saldo, viene generato un errore. Se è possibile prelevare la somma, quest'ultima viene detratta dal saldo e inviata all'indirizzo che ha fatto la richiesta. Anche qui viene ritornato il saldo corrente.

#### Balance
```js
function balance() public view returns (uint) {
    return balances[msg.sender];
}
```

Ritorna il saldo dell'utente.

#### Total balance
```js
function totalBalance() public view returns (uint) {
    require(msg.sender == owner);
    return address(this).balance;
}
```

Ritorna il saldo di tutto il contratto. Il metodo può essere utilizzato solo dall'owner, cioè da chi ha creato il contratto.

## Eseguire il progetto
**Prerequisito**
Il file di configurazione di hardhat si aspetta tre variabili d'ambiente:
- *RINKEBY_URL* (http url dell'app fornito da Alchemy)
- *MNEMONIC* (la frase mnemonica di Metamask)
- *ETHERSCAN_API_KEY* (la vostra api key di etherscan per la verifica (facoltativa))

**Procedura**
1. `npm install`
2. `npx hardhat compile` per compilare lo smart contract
3. `npx hardhat run deploy/deploy.js --network {NETWORK}`
4. L’indirizzo del nostro smart contract va inserito in `App.js` nel metodo `initConnection`
1. `npm run start` per avviare il progetto React

##### Generare account di test in locale
`npx hardhat node`

Questo comando genera un server con un nodo eth in locale con 10 account di test (ognuno con 10.000 ether) e le chiavi private per importare un account su Metamask