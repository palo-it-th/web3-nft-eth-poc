import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Contract } from 'ethers'
import { CircularProgress } from '@mui/material'
import { create, IPFSHTTPClient } from 'ipfs-http-client'
import MintNftButton from './MintNftButton'
import NftCardList from './NftCardList'
import styled from '@emotion/styled'
import { ContractDetails, Nft } from '../../types'

interface NftContentProps {
  currentAccount: string
  contract: Contract
}

const NftContent = ({ contract, currentAccount }: NftContentProps) => {
  const [contractDetails, setContractDetails] = useState<ContractDetails>({
    symbol: '',
    balance: 0,
    nftList: [],
  })

  const ipfsClient: IPFSHTTPClient = useMemo(
    () => create({ url: '/ip4/127.0.0.1/tcp/5002/http' }),
    [],
  )

  const readNftMetadata = useCallback(
    async (cidPath: string) => {
      const response = ipfsClient.cat(cidPath)

      for await (const x of response) {
        const response = JSON.parse(new TextDecoder().decode(x))
        const imageSrc = await readNftImage(response.image)
        return { ...response, imageSrc }
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
      const nftImageCID = (await readNftMetadata(nftMetadataCID))

      return { nftId, nftMetadataCID, nftImageCID }
    },
    [contract, currentAccount, readNftImage, readNftMetadata],
  )

  const initContractDetails = useCallback(async () => {
    const symbol = await contract.symbol()
    const balance = Number(await contract.balanceOf(currentAccount))

    setContractDetails({
      symbol,
      balance,
      nftList: [],
    })

    const nftList: Nft[] = []
    for (let i = 0; i < balance; i++) {
      const nft = await readNft(i)
      if (nft) nftList.push(nft)
    }

    setContractDetails({
      symbol,
      balance,
      nftList,
    })
  }, [contract, currentAccount, readNft])

  const onMintingFinished = async () => {
    if (contractDetails) {
      const nft = await readNft(contractDetails.balance)
      setContractDetails(prevState => ({
        ...prevState,
        balance: prevState.balance + 1,
        nftList: [...prevState.nftList, nft],
      }))
    }
  }

  useEffect(() => {
    initContractDetails()
  }, [initContractDetails])

  if (!contractDetails) return <CircularProgress />

  return (
    <Container>
      <MintNftButton
        contract={contract}
        currentAccount={currentAccount}
        ipfsClient={ipfsClient}
        onMintingFinished={onMintingFinished}
      />
      <NftCardList contractDetails={contractDetails} />
    </Container>
  )
}

export default NftContent

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px
`

