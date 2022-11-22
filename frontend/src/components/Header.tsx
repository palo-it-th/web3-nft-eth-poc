import React from 'react'
import { AppBar, Toolbar, Box } from '@mui/material'
import HeaderIcon from '../assets/image/nftToken.png'

const Header = () => {
  return (
    <Box>
      <AppBar color='primary'>
        <Toolbar>
          <img src={HeaderIcon} style={{ width: 32, height: 32, margin: 10 }} />
          NFT Collections
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
