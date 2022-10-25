import React, { useState } from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import { Contract, ethers } from 'ethers'
import { IPFSHTTPClient } from 'ipfs-http-client'

interface Props {
  currentAccount: string
  contract: Contract
  ipfsClient: IPFSHTTPClient
  onMintingFinished: any
}
const MintNft = ({
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

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <Button component='label' variant='contained' disabled={loading}>
        Mint a new NFT
        <input
          type='file'
          accept='image/*'
          hidden
          onChange={e => {
            e.preventDefault()
            mintNft(e.target.files)
            e.target.value = ''
          }}
        />
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  )
}

export default MintNft
