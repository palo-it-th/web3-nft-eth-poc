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

source $NVM_DIR/nvm.sh
nvm use 18.14.2
NODE_VERSION=$(node -v)
print_section_info "Node version: $NODE_VERSION"

./run_e2e_tests_local.sh

# Kills all sub-processes
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT