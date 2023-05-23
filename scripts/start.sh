#!/bin/bash

# Install dependencies
yarn

# Start local blockchain node in the background
npx hardhat node &

# Deploy script using localhost network
npx hardhat --network localhost run deploy_palonft.js

# Install IPFS globally
npm i -g ipfs

# Initialize IPFS
jsipfs init

# Configure IPFS for cross-origin access
jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"
jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'

# Start IPFS daemon in the background
jsipfs daemon &

# Move to frontend directory
cd ../frontend

# Install frontend dependencies
yarn
# Start the frontend
npm run start
