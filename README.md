# Ethereum NFT minter

## Purpose

The goal of this project is to create a web page in order to be able to mint NFT's.

Frontend to

- Interact with Metamask wallet
- Mint NFTs by selecting pictures and uploading to IPFS
- Display minted NFTs
- Transfer owned NFTs to other wallets
- Transfer owned NFTs to marketplaces, e.e. OpenSea, Rarible

## Prerequisites

You must have the latest "LTS" node version installed :

- (Node LTS version)[https://nodejs.org/en/]

## Installation

- Go to `/backend` directory

```
yarn install
```

## Run

### Start local node

```
npx hardhat node
```

### Deploy NFT smart contract

To deploy on localhost network:

```
npx hardhat --network localhost run scripts/deploy_palonft.js
```

### Start a local ipfs node (using jsipfs)

#### Install jsipfs

```
npm i -g ipfs
```

#### Initialize ipfs local profile

```
jsipfs init
```

#### Allow cross origin on the jsipfs node

- Start the ipfs daemon `jsipfs daemon`
- Change the ipfs cors config :

```
jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"

jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
```

- Restart the daemon

#### Start jsipfs node

```
jsipfs daemon
```

### Frontend

#### Installation

- Go to `/frontend` directory

```
yarn install
```

#### Setting up Metamask extension

- Install Chrome Metamask extension
- Add the local hardhat network
  Settings -> Networks -> Add Network -> Add a network manually
  Network URL: http://localhost:8545
  Chain ID: 1337
  Currency Symbol: ETH
- Reset the nonce (This step must be done every time the local hardhat node is restarted)
  Settings -> Advanced -> reset accounts

#### Start frontend

```
npm start
```

## Test

### Solidity smart contracts test

- Go to `/backend` directory

```
npx hardhat test
```

### Test Solidity smart contracts with coverage

```
npx hardhat coverage
```

Test coverage is generated in the `coverage` folder and can be viewed using a browser.

Add `REPORT_GAS=true` in front of the command to test with gas estimation.

### E2E Tests including the frontend and smart contracts

- Go to `/e2e` directory

Open cypress to run e2e tests

```
npx synpress open -cf cypress.config.ts
```
