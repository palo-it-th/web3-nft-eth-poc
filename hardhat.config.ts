import { HardhatUserConfig } from "hardhat/config";
require("dotenv").config();
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage"
import "@nomiclabs/hardhat-solhint";


const { API_URL, PRIVATE_KEY } = process.env;
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337, // We set 1337 to make interacting with MetaMask simpler
    }
  },
};

export default config;
