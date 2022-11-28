import React from 'react'
import { Button, ClickAwayListener, Typography } from '@mui/material'
import { ArrowDownIcon, WalletIcon } from '../../assets/icons'
import styled from '@emotion/styled'
import { Fonts } from '../../constants'
import ConnectedPopper from './ConnectedPopper'
import { ellipsisAccount } from '../../utils/accountUtils'

interface ConnectedToolBarProps {
  onClickDisconnect: VoidFunction
  currentAccount?: string
  balance?: string
}

const ConnectedToolBar = ({ balance, currentAccount, onClickDisconnect }: ConnectedToolBarProps) => {
  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen((previousOpen) => !previousOpen)
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Container>
        <BalanceText>
          {balance} ETH
        </BalanceText>
        <Button
          variant='contained'
          onClick={handleClick}
          startIcon={<WalletIcon />}
          endIcon={<ArrowDownIcon />}
          data-testid='connect-to-wallet-button'>
          <AccountText>
            {ellipsisAccount(currentAccount)}
          </AccountText>
        </Button>
        <ConnectedPopper open={open} anchorEl={anchorEl} currentAccount={currentAccount}
                         onClickDisconnect={onClickDisconnect} />
      </Container>
    </ClickAwayListener>
  )
}

export default ConnectedToolBar

const AccountText = styled(Typography)`
  ${Fonts.base_medium}
`

const Container = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

const BalanceText = styled(Typography)`
  ${Fonts.base_medium}
`
