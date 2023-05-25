#!/bin/bash

print_section_info () {
  echo
  echo ==================================================
  echo $1
  echo ==================================================
  echo
}

wait_for_port_open () {
  while ! nc -z localhost $1; do   
    sleep 0.1
  done
}

print_section_info "Node version"
node -v

# Install hardhat dependencies
yarn install

print_section_info "Start local blockchain node in the background..."
npx hardhat node &
# Wait until hardhat node is accessible
while ! nc -z localhost 8545; do   
sleep 0.1
done
sleep 3

print_section_info "Deploy script using localhost network..."
npx hardhat --network localhost run deploy_palonft.js

print_section_info "Install IPFS globally..."
yarn global add ipfs

print_section_info "Initialize IPFS..."
jsipfs init

print_section_info "Configure IPFS for cross-origin access..."
jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin "[\"*\"]"
jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'

print_section_info "Start IPFS daemon in the background..."
jsipfs daemon &

# Move to frontend directory
cd ../frontend

print_section_info "Install frontend dependencies..."
yarn install


print_section_info "Installing cypress..."
yarn global add cypress

print_section_info "Starting e2e test..."
yarn run start-and-test

# Kills all sub-processes
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT