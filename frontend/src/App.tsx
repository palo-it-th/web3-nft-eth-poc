import React, { useCallback, useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { Contract, ethers } from 'ethers'
import PaloNFT from './assets/PaloNFT.json'
import NftContent from './components/NftContent/NftContent'
import { Web3Provider } from '@ethersproject/providers'
import NftAppBar from './components/NftAppBar/NftAppBar'
import styled from '@emotion/styled'
import { Colors, Styles } from './constants'
import { NftTokenIcon } from './assets/icons'
import Watermark from './components/Watermark'

declare let window: any

const App = () => {
  const [balance, setBalance] = useState<string | undefined>()
  const [currentAccount, setCurrentAccount] = useState<string | undefined>()
  const [contract, setContract] = useState<Contract | undefined>()

  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

  const fetchData = useCallback(
    async (provider: Web3Provider) => {
      if (currentAccount) {
        setBalance(
          ethers.utils.formatEther(await provider.getBalance(currentAccount)),
        )
      }
    },
    [currentAccount],
  )

  useEffect(() => {
    //get ETH balance and network info only when having currentAccount
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    fetchData(provider)

    const signer = provider.getSigner()

    const myNftContract: Contract = new ethers.Contract(
      contractAddress,
      PaloNFT.abi,
      signer,
    )
    setContract(myNftContract)

    window.ethereum.on('accountsChanged', (accounts: any) =>
      setCurrentAccount(accounts[0]),
    )

    window.ethereum.on('disconnect', (error: any) => onClickDisconnect())

    return () => {
      window.ethereum.removeListener('accountsChanged', () =>
        setCurrentAccount(undefined),
      )
    }
  }, [currentAccount, fetchData])

  const onClickConnect = () => {
    //client side code
    if (!window.ethereum) {
      console.log('please install MetaMask')
      return
    }

    //we can do it using ethers.js
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    provider
      .send('eth_requestAccounts', [])
      .then(accounts => {
        if (accounts.length > 0) setCurrentAccount(accounts[0])
      })
      .catch(e => console.log(e))
  }

  //click disconnect
  const onClickDisconnect = () => {
    setCurrentAccount(undefined)
    setContract(undefined)
  }

  return (
    <ContainerWrapper maxWidth={false} disableGutters={true}>
      <NftAppBar balance={balance}
                 currentAccount={currentAccount}
                 onClickConnect={onClickConnect}
                 onClickDisconnect={onClickDisconnect}
      />
      <ContentContainer>
        {!currentAccount && (
          <WatermarkContainer>
            <Watermark title={'Get started to mint NFT'}
                       subtitle={'Please Connect to Wallet.'}
                       icon={<NftTokenIcon />} />
          </WatermarkContainer>
        )}
        {currentAccount && contract && (
          <NftContent
            contract={contract}
            currentAccount={currentAccount}
          />
        )}
      </ContentContainer>
    </ContainerWrapper>
  )
}

export default App

const ContainerWrapper = styled(Container)`
  background: ${Colors.black['300']};
  min-height: 100vh;
  height: 100%;
  min-width: 100%;
  width: fit-content;
`

const WatermarkContainer = styled.div`
  ${Styles.absoluteCenter};
`

const ContentContainer = styled.div`
  padding: 24px;
  min-height: calc(100vh - 64px);
  height: 100%;

`
