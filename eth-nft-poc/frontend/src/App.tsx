import React, { useCallback, useEffect, useState } from "react";
import { Container, Button, Card, CardContent } from "@mui/material";
import { Contract, ethers } from "ethers";
import { abi } from "./assets/MyNFT";
import ReadMyNft from "./components/ReadMyNft";
import { Web3Provider } from "@ethersproject/providers";

declare let window: any;

const App = () => {
  const [balance, setBalance] = useState<string | undefined>();
  const [currentAccount, setCurrentAccount] = useState<string | undefined>();
  const [chainId, setChainId] = useState<number | undefined>();
  const [contract, setContract] = useState<Contract | undefined>();

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const fetchData = useCallback(
    async (provider: Web3Provider) => {
      if (currentAccount) {
        setBalance(
          ethers.utils.formatEther(await provider.getBalance(currentAccount))
        );

        setChainId((await provider.getNetwork()).chainId);
      }
    },
    [currentAccount]
  );

  useEffect(() => {
    //get ETH balance and network info only when having currentAccount
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    fetchData(provider);

    const signer = provider.getSigner();

    const myNftContract: Contract = new ethers.Contract(
      contractAddress,
      abi,
      signer
    );
    setContract(myNftContract);
  }, [currentAccount, fetchData]);

  const onClickConnect = () => {
    //client side code
    if (!window.ethereum) {
      console.log("please install MetaMask");
      return;
    }

    //we can do it using ethers.js
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0]);
      })
      .catch((e) => console.log(e));
  };

  //click disconnect
  const onClickDisconnect = () => {
    setCurrentAccount(undefined);
  };

  return (
    <Container>
      <Button variant="contained" onClick={onClickConnect}>
        Connect to wallet
      </Button>
      <Button variant="contained" onClick={onClickDisconnect}>
        Disconnect from wallet
      </Button>
      {currentAccount && (
        <Card>
          <CardContent>
            <div>Account is : {currentAccount}</div>
            <div>balance is : {balance}</div>
            <div>chainId is : {chainId}</div>
            {contract && (
              <div>
                <ReadMyNft
                  contract={contract}
                  currentAccount={currentAccount}
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default App;
