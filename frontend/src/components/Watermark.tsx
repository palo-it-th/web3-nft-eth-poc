import React from 'react'
import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { Fonts, Colors } from '../constants'

interface WatermarkProps {
  icon?: any
  title?: string
  subtitle?: string
}

const Watermark = ({ title, subtitle, icon }: WatermarkProps) => {

  return (
    <Container>
      {icon && React.cloneElement(icon, { style: { width: 160, height: 160, fill: Colors.black['200'] } })}
      <TitleText>
        {title}
      </TitleText>
      <SubtitleText>
        {subtitle}
      </SubtitleText>
    </Container>
  )
}

export default Watermark


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  width: max-content;
`

const TitleText = styled(Typography)`
  text-align: center;
  color: ${Colors.black['200']};
  ${Fonts.h2}
`

const SubtitleText = styled(Typography)`
  text-align: center;
  color: ${Colors.black['200']};
  ${Fonts.h4}
`
