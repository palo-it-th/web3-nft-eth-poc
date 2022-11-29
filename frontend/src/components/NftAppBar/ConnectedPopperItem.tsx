import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Fonts } from '../../constants'

interface ContainerListProps {
  isButton: boolean
  children?: ReactNode
  secondaryAction?: ReactNode
  onClick?: VoidFunction
  testId?: string
}

const ContainerList = ({ isButton, children, secondaryAction, onClick, testId }: ContainerListProps) => {
  return (
    <>
      {isButton ?
        <ListItemButton data-testid={testId} style={{ gap: 12 }} onClick={onClick}>{children}</ListItemButton> :
        <ListItem data-testid={testId} style={{ gap: 12 }} secondaryAction={secondaryAction}>{children}</ListItem>}
    </>
  )
}

interface ConnectedPopperItemProps {
  icon?: ReactNode
  text?: string
  secondaryAction?: ReactNode
  isButton?: boolean
  onClick?: VoidFunction
  testId?: string
}

const ConnectedPopperItem = ({ icon, text, secondaryAction, isButton = false, onClick, testId }: ConnectedPopperItemProps) => {

  return (
    <ContainerList testId={testId} isButton={isButton} secondaryAction={secondaryAction} onClick={onClick}>
      <ListItemIcon style={{ minWidth: 'unset' }}>
        {icon}
      </ListItemIcon>
      <ListItemText>
        <ItemText>
          {text}
        </ItemText>
      </ListItemText>
    </ContainerList>
  )
}

export default ConnectedPopperItem

const ItemText = styled(Typography)`
  color: white;
  ${Fonts.base_body};
`
