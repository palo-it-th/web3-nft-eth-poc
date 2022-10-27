import React, { useCallback, useEffect, useState } from 'react'
import { Container, Button, Card, CardContent } from '@mui/material'
import { Contract, ethers } from 'ethers'
import PaloNFT from './assets/PaloNFT.json'
import ReadMyNft from './components/ReadMyNft'
import { Web3Provider } from '@ethersproject/providers'

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
    <Container>
      {!currentAccount ? (
        <Button
          variant='contained'
          onClick={onClickConnect}
          data-testid='connect-to-wallet-button'>
          Connect to wallet
        </Button>
      ) : (
        <Button
          variant='contained'
          onClick={onClickDisconnect}
          data-testid='disconnect-from-wallet-button'>
          Disconnect from wallet
        </Button>
      )}
      {currentAccount && (
        <Card data-testid='account-information'>
          <CardContent>
            <div>
              Account is :{' '}
              <span data-testid='account-address'>{currentAccount}</span>
            </div>
            <div>balance is : {balance}</div>
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
  )
}

export default App
