import React, { ChangeEvent, useState } from 'react'
import { Button, styled, TextField, Typography } from '@mui/material'
import { Contract, ethers } from 'ethers'
import { IPFSHTTPClient } from 'ipfs-http-client'
import AddIcon from '@mui/icons-material/Add'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Fonts } from '../../constants'
import Dropzone from './Dropzone'

interface MintNftButtonProps {
  currentAccount: string
  contract: Contract
  ipfsClient: IPFSHTTPClient
  onMintingFinished: any
}

interface Form {
  name: string
  image?: File
}

const MintNftButton = ({
  contract,
  currentAccount,
  ipfsClient,
  onMintingFinished,
}: MintNftButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Form>({
    name: '',
    image: undefined,
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setForm({ name: '', image: undefined })
    setOpen(false)
  }

  const onAddImageHandler = (image: File) => setForm({ ...form, image })

  const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, name: event.target.value })

  const mintNft = async () => {
    if (form.image) {
      setLoading(true)
      handleClose()

      const imageCID = (await ipfsClient.add(form.image.stream())).cid.toV1()

      const metadata: any = { name: form.name, image: imageCID.toString() }

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
  }

  return (
    <>
      <Button
        sx={{ zIndex: 1 }}
        component='label'
        variant='contained'
        disabled={loading}
        startIcon={<AddIcon />}
        data-testid='mint-nft'
        onClick={handleClickOpen}>
        <ButtonText>Mint NFT</ButtonText>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Mint a new NFT</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            id='name'
            label='Name'
            type='text'
            fullWidth
            variant='standard'
            onChange={onNameChangeHandler}
            data-testid='nft-name'
          />

          <>
            <Dropzone onAddImageHandler={onAddImageHandler} />
            {form.image && (
              <aside>
                <>
                  <strong>Image: </strong>
                  {form.image.name}
                </>
              </aside>
            )}
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button data-testid='confirm-mint-nft' onClick={mintNft}>
            Mint
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MintNftButton

const ButtonText = styled(Typography)`
  ${Fonts.base_medium}
`
