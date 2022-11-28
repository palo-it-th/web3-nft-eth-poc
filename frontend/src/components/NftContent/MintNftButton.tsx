import React, { ChangeEvent, useState } from 'react'
import { Button, styled, Typography } from '@mui/material'
import { Contract, ethers } from 'ethers'
import { IPFSHTTPClient } from 'ipfs-http-client'
import AddIcon from '@mui/icons-material/Add'
import { Fonts } from '../../constants'

interface Props {
  currentAccount: string
  contract: Contract
  ipfsClient: IPFSHTTPClient
  onMintingFinished: any
}

const MintNftButton = ({
                   contract,
                   currentAccount,
                   ipfsClient,
                   onMintingFinished,
                 }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const mintNft = async (files: any) => {
    setLoading(true)
    const imageCID = (await ipfsClient.add(files[0])).cid.toV1()

    const metadata: any = {}
    metadata.image = imageCID.toString()

    const metadataCID = (
      await ipfsClient.add(JSON.stringify(metadata))
    ).cid.toV1()

    try {
      const tx = await contract.mintNFT(
        currentAccount,
        metadataCID.toString(),
        { value: ethers.utils.parseEther('1.0') },
      )
      await tx.wait()
      onMintingFinished()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const uploadNftHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    mintNft(e.target.files)
    e.target.value = ''
  }

  return (
    <Button sx={{ zIndex: 1 }} component='label' variant='contained'
            disabled={loading} startIcon={<AddIcon />} data-testid='mint-nft'>
      <ButtonText>Mint NFT</ButtonText>
      <input type='file' accept='image/*' hidden onChange={uploadNftHandler} />
    </Button>
  )
}

export default MintNftButton


const ButtonText = styled(Typography)`
  ${Fonts.base_medium}
`
