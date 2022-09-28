import React, { useEffect, useState } from "react";
import { Container, Button, Card, CardContent } from "@mui/material";
import { ethers } from "ethers";
import ReadMyNft from "./components/ReadMyNft";

declare let window: any;

const App = () => {
  const [balance, setBalance] = useState<string | undefined>();
  const [currentAccount, setCurrentAccount] = useState<string | undefined>();
  const [chainId, setChainId] = useState<number | undefined>();

  useEffect(() => {
    //get ETH balance and network info only when having currentAccount
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return;

    //client side code
    if (!window.ethereum) {
      console.log("please install MetaMask");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider
      .getBalance(currentAccount)
      .then((result) => {
        setBalance(ethers.utils.formatEther(result));
      })
      .catch((e) => console.log(e));

    provider
      .getNetwork()
      .then((result) => {
        setChainId(result.chainId);
      })
      .catch((e) => console.log(e));
  }, [currentAccount]);

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
    console.log("onClickDisConnect");
    setCurrentAccount(undefined);
    setBalance(undefined);
    setChainId(undefined);
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
            <div>
              <ReadMyNft
                addressContract="0xA1ab09E67C8512B4699C05AC8b4C9529cc750ae7"
                currentAccount={currentAccount}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default App;
