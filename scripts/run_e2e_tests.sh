#!/bin/bash

nohup npx hardhat node & > hardhat_node.log &
npx jsipfs init
npx jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"
npx jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
nohup npx jsipfs daemon & > jsipfs_daemon.log &
npx hardhat --network localhost run ../scripts/deploy_palonft.js
cd ../frontend
npx synpress run -cf cypress.config.ts