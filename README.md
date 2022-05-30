# Crypto Bank
Questa repository contiene un progetto di esempio **full stack** per una dApp chiamata Crypto Bank.
Il frontend è gestito con **React** ed **ethers.js**. Lo smart contract è scritto in **Solidity**. Le fasi di compilazione, testing e deploy sono gestite con **hardhat**.
*N.B.* lo scopo della repository è quello di offrire un esempio a chi vuole avvicinarsi allo sviluppo sul web3. Non ha un reale utilizzo e mancano diversi aspetti legati a permessi e sicurezza.

## Smart contract
Il contratto contiene **tre metodi**:
- **deposit**: permette di depositare una somma di denaro
- **withdraw**: permette di prelevare una somma di denaro dalla somma che si è depositata
- **balance**: permette di conoscere il proprio saldo

E' presente anche un metodo extra, disponibile solo per l'owner del contratto, che ritorna il saldo di tutti i *clienti* della banca.

## Avviare il progetto
1. `npm install`
2. `npx hardhat compile` per compilare lo smart contract
3. `npx hardhat run deploy/deploy.js --network {NETWORK}`
4. L’indirizzo del nostro smart contract va inserito in `App.js` nel metodo `initConnection`
1. `npm run start` per avviare il progetto React

### Generare account in locale
`npx hardhat node`

Questo comando genera un server con un nodo eth in locale con 10 account di test (ognuno con 10.000 ether) e le chiavi private per importare un account su Metamask