import { Divider, Fade, IconButton, List, Popper, Typography } from '@mui/material'
import React from 'react'
import { VirtualElement } from '@popperjs/core'
import styled from '@emotion/styled'
import { Colors, Fonts } from '../../constants'
import ConnectedPopperItem from './ConnectedPopperItem'
import { CopyIcon, SignOutIcon, WalletIcon } from '../../assets/icons'
import { ellipsisAccount } from '../../utils/accountUtils'

interface ConnectedPopperProps {
  open: boolean;
  currentAccount?: string
  anchorEl?: null | VirtualElement | (() => VirtualElement);
  onClickDisconnect: VoidFunction
}

const ConnectedPopper = ({ open, currentAccount, anchorEl, onClickDisconnect }: ConnectedPopperProps) => {

  const clickCopyHandler = async () => {
    if (currentAccount) {
      await navigator.clipboard.writeText(currentAccount)
    }
  }

  return (
    <PopperWrapper open={open} anchorEl={anchorEl} transition modifiers={[
      {
        name: 'offset',
        options: {
          offset: [-24, 8],
        },
      },
    ]}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Container>
            <HeaderText>
              Wallet
            </HeaderText>
            <List disablePadding>
              <ConnectedPopperItem icon={<WalletIcon style={{ width: 24, height: 24 }} />}
                                   text={ellipsisAccount(currentAccount)}
                                   secondaryAction={(
                                     <IconButton aria-label='comment' onClick={clickCopyHandler}>
                                       <CopyIcon />
                                     </IconButton>
                                   )} />
              <Divider />
              <ConnectedPopperItem icon={<SignOutIcon style={{ width: 24, height: 24 }} />}
                                   text={'Disconnect Wallet'}
                                   isButton={true}
                                   onClick={onClickDisconnect} />
            </List>
          </Container>
        </Fade>
      )}
    </PopperWrapper>
  )
}

export default ConnectedPopper

const PopperWrapper = styled(Popper)`
  z-index: 9999;
`

const HeaderText = styled(Typography)`
  ${Fonts.h5}
  color: white;
  padding: 0 20px;
`

const Container = styled.div`
  width: 240px;
  box-shadow: 0 4px 30px 5px rgba(0, 0, 0, 0.25);
  padding: 16px 0;
  border-radius: 20px;
  background: ${Colors.black['300']};

  display: flex;
  flex-direction: column;
`
