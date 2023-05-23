#!/bin/bash

# Install dependencies
yarn install --frozen-lockfile

echo ========
echo Start local blockchain node in the background...
echo ========
echo
npx hardhat node &
# Wait until hardhat node is accessible
while ! nc -z localhost 8545; do   
  sleep 0.1
done

echo ========
echo Deploy script using localhost network...
echo ========
echo
npx hardhat --network localhost run deploy_palonft.js

echo ========
echo Install IPFS globally...
echo ========
echo
npm i -g ipfs

echo ========
echo Initialize IPFS...
echo ========
jsipfs init

echo ========
echo Configure IPFS for cross-origin access...
echo ========
echo
jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"
jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'

echo ========
echo Start IPFS daemon in the background...
echo ========
echo
jsipfs daemon &

# Move to frontend directory
cd ../frontend

echo ========
echo Install frontend dependencies...
echo ========
echo
yarn install --frozen-lockfile

echo ========
echo Start the frontend...
echo ========
echo
yarn run start
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT
