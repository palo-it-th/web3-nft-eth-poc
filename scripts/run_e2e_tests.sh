#!/bin/bash

npx cypress install
nohup npx hardhat node & > hardhat_node.log &
npx jsipfs init
npx jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"
npx jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
nohup npx jsipfs daemon & > jsipfs_daemon.log &
npx hardhat --network localhost run deploy_palonft.js
cd ../frontend
npm run start-and-test