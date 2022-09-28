import React, { useCallback, useEffect, useState } from "react";
import { Contract } from "ethers";
import { Button, Card, CardContent } from "@mui/material";

interface Props {
  currentAccount: string;
  contract: Contract;
}

const ReadMyNft = ({ contract, currentAccount }: Props) => {
  const [symbol, setSymbol] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [nftList, setNftList] = useState<string[]>([]);

  const queryTokenSymbol = useCallback(async () => {
    setSymbol(await contract.symbol());
  }, [contract]);

  const queryTokenBalance = useCallback(async () => {
    setBalance(Number(await contract.balanceOf(currentAccount)));
  }, [contract, currentAccount]);

  const queryTokens = useCallback(async () => {
    let nftList = [];
    for (let i = 0; i < balance; i++) {
      const nftId = await contract.tokenOfOwnerByIndex(currentAccount, i);

      nftList.push(await contract.tokenURI(nftId));
    }
    setNftList(nftList);
  }, [contract, currentAccount, balance]);

  useEffect(() => {
    queryTokenSymbol();
    queryTokenBalance();
    queryTokens();
  }, [queryTokenSymbol, queryTokenBalance, queryTokens]);

  const onClickMintNft = async (tokenURI: string) => {
    try {
      const tx = await contract.mintNFT(currentAccount, tokenURI);
      await tx.wait();
      queryTokenBalance();
      queryTokens();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardContent>
        <div>
          <b>MyNFT Contract</b>: {contract.address}
        </div>
        <div>
          <b>Symbol</b>:{symbol}
        </div>
        <div>
          <b>Balance</b>:{balance}
        </div>
        <Button
          variant="contained"
          onClick={() =>
            onClickMintNft(
              "ipfs://QmYEjq2JejfZhRyg3hoxn9eLWzuLRTyS2Db5j7dkhndc5h"
            )
          }
        >
          Mint a new NFT
        </Button>
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
