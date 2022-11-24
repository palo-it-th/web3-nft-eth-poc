import React, { ReactNode } from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { NftTokenIcon } from '../assets/icons'
import styled from '@emotion/styled'
import { Colors } from '../constants/colors'
import { Fonts } from '../constants/fonts'

interface NftAppBarProps {
  children?: ReactNode
}

const NftAppBar = ({ children }: NftAppBarProps) => {
  return (
    <AppTopBar position={'sticky'}>
      <Toolbar>
        <NftTokenIcon />
        <TopBarText>
          NFT Collections
        </TopBarText>
        {children}
      </Toolbar>
    </AppTopBar>
  )
}

export default NftAppBar

const AppTopBar = styled(AppBar)`
  background: ${Colors.black['400']};
`

const TopBarText = styled(Typography)`
  flex-grow: 1;
  margin-left: 8px;
  text-align: left;
  ${Fonts.H5};
`
