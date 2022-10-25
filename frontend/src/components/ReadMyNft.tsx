import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Contract } from 'ethers'
import { CircularProgress, ImageList, ImageListItem } from '@mui/material'
import { create, IPFSHTTPClient } from 'ipfs-http-client'
import MintNft from './MintNft'

interface Props {
  currentAccount: string
  contract: Contract
}

interface ContractDetails {
  symbol: string
  balance: number
  nftImageList: any[]
}

const ReadMyNft = ({ contract, currentAccount }: Props) => {
  const [contractDetails, setContractDetails] = useState<
    ContractDetails | undefined
  >()

  const ipfsClient: IPFSHTTPClient = useMemo(
    () => create({ url: '/ip4/127.0.0.1/tcp/5002/http' }),
    [],
  )

  const readNftMetadata = useCallback(
    async (cidPath: string) => {
      const response = ipfsClient.cat(cidPath)

      for await (const x of response) {
        return JSON.parse(new TextDecoder().decode(x))
      }
    },
    [ipfsClient],
  )

  const readNftImage = useCallback(
    async (cidPath: string) => {
      const response = ipfsClient.cat(cidPath)

      for await (const x of response) {
        return URL.createObjectURL(new Blob([x.buffer]))
      }
    },
    [ipfsClient],
  )

  const readNft = useCallback(
    async (index: Number) => {
      const nftId = await contract.tokenOfOwnerByIndex(currentAccount, index)
      const nftMetadataCID = await contract.tokenURI(nftId)
      const nftImageCID = (await readNftMetadata(nftMetadataCID)).image
      return readNftImage(nftImageCID)
    },
    [contract, currentAccount, readNftImage, readNftMetadata],
  )

  const initContractDetails = useCallback(async () => {
    const symbol = await contract.symbol()
    const balance = Number(await contract.balanceOf(currentAccount))

    setContractDetails({
      symbol,
      balance,
      nftImageList: [],
    })

    let nftImageList: string[] = []

    for (let i = 0; i < balance; i++) {
      const nftImage = await readNft(i)

      if (nftImage) {
        nftImageList = [...nftImageList, nftImage]
      }

      setContractDetails({
        symbol,
        balance,
        nftImageList: [...nftImageList],
      })
    }
  }, [contract, currentAccount, readNft])

  const onMintingFinished = async () => {
    if (contractDetails) {
      const nftImage = await readNft(contractDetails.balance)
      setContractDetails({
        ...contractDetails,
        balance: contractDetails.balance + 1,
        nftImageList: [...contractDetails.nftImageList, nftImage],
      })
    }
  }

  useEffect(() => {
    initContractDetails()
  }, [initContractDetails])

  return (
    <>
      {contractDetails ? (
        <>
          <div>
            <b>Symbol</b>:{contractDetails.symbol}
          </div>
          <div>
            <b>Balance</b>:{contractDetails.balance}
          </div>

          <MintNft
            contract={contract}
            currentAccount={currentAccount}
            ipfsClient={ipfsClient}
            onMintingFinished={onMintingFinished}
          />

          <ImageList cols={3}>
            {contractDetails.nftImageList.map((nftImage, index) => (
              <ImageListItem key={index}>
                <img src={nftImage} alt='' style={{ height: 300 }} />
              </ImageListItem>
            ))}
          </ImageList>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  )
}

export default ReadMyNft
