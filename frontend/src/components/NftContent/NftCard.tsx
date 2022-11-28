import { Card, CardContent, CardMedia, styled, Typography } from '@mui/material'
import React from 'react'
import { Fonts } from '../../constants'

interface NftCardProps {
  image?: string;
  title?: string
}

const NftCard = ({ image, title }: NftCardProps) => {
  return (
    <CardWrapper>
      <CardMedia
        component='img'
        height='302'
        image={image}
        alt='Image Not Found'
      />
      <CardContentWrapper>
        <TitleText>
          {title}
        </TitleText>
      </CardContentWrapper>
    </CardWrapper>
  )
}

export default NftCard

const CardWrapper = styled(Card)`
  width: 260px;
  border-radius: 20px;
`

const CardContentWrapper = styled(CardContent)`
  padding: 20px !important;
`

const TitleText = styled(Typography)`
  ${Fonts.base_medium};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
