#!/bin/bash

# Install dependencies
yarn

echo ========
echo Start local blockchain node in the background...
echo ========\n
npx hardhat node &
# Wait until hardhat node is accessible
while ! nc -z localhost 8545; do   
  sleep 0.1
done

echo ========
echo Deploy script using localhost network...
echo ========\n
npx hardhat --network localhost run deploy_palonft.js

echo ========
echo Install IPFS globallyl...
echo ========\n
npm i -g ipfs

echo ========
echo Initialize IPFS...
echo ========\n
jsipfs init

echo ========
echo Configure IPFS for cross-origin access...
echo ========\n
jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"
jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'

echo ========
echo Start IPFS daemon in the background...
echo ========\n
jsipfs daemon &

# Move to frontend directory
cd ../frontend

echo ========
echo Install frontend dependencies...
echo ========\n
yarn

echo ========
echo Start the frontend...
echo ========\n
yarn run start
