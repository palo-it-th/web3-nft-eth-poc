import React from 'react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { MetaMaskIcon, NftTokenIcon } from '../../assets/icons'
import { Colors, Fonts } from '../../constants'
import ConnectedToolBar from './ConnectedToolBar'

interface NftAppBarProps {
  balance?: string
  currentAccount?: string
  onClickConnect: VoidFunction
  onClickDisconnect: VoidFunction
}

const NftAppBar = ({ balance, currentAccount, onClickConnect, onClickDisconnect }: NftAppBarProps) => {
  return (
    <AppBarWrapper position='sticky'>
      <ToolbarWrapper>
        <NftTokenIcon />
        <TopBarText>
          NFT Collections
        </TopBarText>
        {!currentAccount ? (
          <Button
            variant='contained'
            onClick={onClickConnect}
            startIcon={<MetaMaskIcon />}
            data-testid='connect-to-wallet-button'>
            <ConnectWalletText>
              Connect Wallet
            </ConnectWalletText>
          </Button>
        ) : (
          <ConnectedToolBar balance={balance}
                            currentAccount={currentAccount}
                            onClickDisconnect={onClickDisconnect}
          />
        )}
      </ToolbarWrapper>
    </AppBarWrapper>
  )
}

export default NftAppBar

const AppBarWrapper = styled(AppBar)`
  background: ${Colors.black['400']};
`
const ConnectWalletText = styled(Typography)`
  ${Fonts.base_medium}
`

const ToolbarWrapper = styled(Toolbar)`
  column-gap: 10px;
`

const TopBarText = styled(Typography)`
  flex-grow: 1;
  text-align: left;
  ${Fonts.h5};
`



