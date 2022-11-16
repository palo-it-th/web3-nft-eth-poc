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

- (Node LTS version)[https://nodejs.org/en/]

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
ipfs init
```

#### Allow cross origin on the jsipfs node

```
jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"
```
```
jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
```

#### Start jsipfs node

```
jsipfs daemon
```

### Frontend

#### Start frontend

```
npm start
```

## Test

### Solidity smart contracts

```
npx hardhat test
```

Test coverage is generated in the `coverage` folder and can be viewed using a browser.

Add `REPORT_GAS=true` in front of the command to test with gas estimation.

### E2E Tests including the frontend and smart contracts

Open cypress to run e2e tests

```
npx synpress open -cf cypress.config.ts
```