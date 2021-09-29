# Dapp-for-DEX
Decentralized application for decentralized exchange

## About
This is a full fledged project I've built for the DEX[from my repository]. It's my own version of the Decentralized Exchange on Ethereum, which allows users to deposit, withdraw, buy and sell their ERC20 tokens on the blockchain. For providing a seamless experience to user, I have utilized the services of **Moralis** for ```database``` and ```authentication```.

Each token is an ERC20 token - ERC-20 tokens are blockchain-based assets that have value and can be sent and received. Users of the DApp have to authenticate themselves first so that they can buy or sell their tokens in a non-custodial marketplace using cryptocurrency (ETH).


This dApp was built using:

* HTML 5
* Java script
* Bootstrap 5
* Solidity 0.8
* OpenZeppelin
* Truffle
* Ganache
* Web3.js
* MetaMask

## Usage
**AUTHENTICATION**
*****
![Authentication](https://user-images.githubusercontent.com/45707143/135210266-ebe4876c-e733-4a30-8de2-2a20e7aa6720.gif)

**ADMIN**
*****

**ACCOUNTS**
*****
https://user-images.githubusercontent.com/45707143/135210750-1b0baebf-d159-4721-a776-35428f0d5a27.mp4


**PLACE ORDER**
*****
https://user-images.githubusercontent.com/45707143/135211111-399b4b53-e595-4feb-979e-c7d09f99ed91.mp4


## Set up Local Development Environment
**Install Project and [Truffle](https://www.trufflesuite.com/truffle)**

```
cd DEX
npm install
```
```
npm install truffle -g
```
**Set up Ganache**
1. Download [Ganache](https://www.trufflesuite.com/ganache) to set up a local Ethereum blockchain.
2. Start Ganache and create a new Ethereum workspace using the mnemonic phrase ```mnemonicDev``` found in truffle-config.js.
3. Deploy the smart contracts of the project on Ganache using Truffle. Do so by runnning:
``` 
truffle migrate --network ganache --reset

```
4. The console will output the address of newly deployed contracts. In main.js replace the values of **contractAddress** accordingly.

**Set up MetaMask**
1. Install [MetaMask](https://metamask.io/) to interact with the dApp in the browser.
2. Add your Ganache network as a custom RPC network to MetaMask and connect to it. The RPC URL is shown in Ganache. For the Chain ID use ```1337``` or what MetaMask suggests.
3. Import two Ethereum accounts from Ganache to MetaMask by their private keys. The balances of these accounts should now be visible in MetaMask.

**Set up FrontEnd**
1. Start a localhost server for the frontend of the dApp:
```
cd client
python3 -m http.server 8000
```
2. Access the dApp in the browser http://localhost:8000/

## Enjoy
Now you can use the dapp locally and use it for further development.
