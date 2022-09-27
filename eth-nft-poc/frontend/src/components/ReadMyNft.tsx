import React, { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { Contract } from "ethers";
import { Card, CardContent } from "@mui/material";
import { abi } from "../assets/MyNFT";

interface Props {
  addressContract: string;
  currentAccount: string | undefined;
}

declare let window: any;

const ReadMyNft = ({ addressContract, currentAccount }: Props) => {
  const [symbol, setSymbol] = useState<string>("");
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const [nftList, setNftList] = useState<string[]>([]);
  const [contract, setContract] = useState<Contract | undefined>(undefined);

  useEffect(() => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const myNFT: Contract = new ethers.Contract(addressContract, abi, provider);

    setContract(myNFT);

    provider.getCode(addressContract).then((result: string) => {
      //check whether it is a contract
      if (result === "0x") return;

      myNFT
        .symbol()
        .then((result: string) => {
          setSymbol(result);
        })
        .catch((e: Error) => console.log(e));
    });
    //called only once
  }, [addressContract]);

  const queryTokenBalance = useCallback(
    async (myNFT: Contract) => {
      setBalance(Number(await myNFT.balanceOf(currentAccount)));
    },
    [currentAccount]
  );

  const queryTokens = useCallback(
    async (myNFT: Contract) => {
      for (let i = 1; i <= (balance || 0); i++) {
        const nft = await myNFT.tokenURI(i);
        setNftList((prev) => [...prev, nft]);
      }
    },
    [balance]
  );

  useEffect(() => {
    if (contract && currentAccount) {
      queryTokenBalance(contract);
      queryTokens(contract);
    }
  }, [currentAccount, contract, queryTokenBalance, queryTokens]);

  return (
    <Card>
      <CardContent>
        <div>
          <b>MyNFT Contract</b>: {addressContract}
        </div>
        <div>
          <b>Symbol</b>:{symbol}
        </div>
        <div>
          <b>Balance</b>:{balance}
        </div>
        <div>
          {nftList.map((nft, index) => (
            <p key={index}>{nft}</p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadMyNft;
