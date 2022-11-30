import React from 'react'
import Watermark from '../Watermark'
import { EmptyBoxIcon } from '../../assets/icons'
import styled from '@emotion/styled'
import { Styles } from '../../constants'
import Grid2 from '@mui/material/Unstable_Grid2'
import NftCard from './NftCard'
import { ContractDetails } from '../../types'

interface NftCardListProps {
  contractDetails: ContractDetails
}

const NftCardList = ({ contractDetails }: NftCardListProps) => {
  if (contractDetails.nftList.length === 0) {
    return (
      <WatermarkContainer>
        <Watermark
          title={'you Have No NFTs'}
          subtitle={'Please click mint NFT to Mint one.'}
          icon={<EmptyBoxIcon />}
        />
      </WatermarkContainer>
    )
  }

  return (
    <Grid2 container spacing={3} maxWidth={1136}>
      {contractDetails.nftList.map(({ image, name }, index) => (
        <Grid2 key={index}>
          <NftCard
            image={image}
            title={name}
            testId={`nft-card-${index}`}
          />
        </Grid2>
      ))}
    </Grid2>
  )
}

export default NftCardList

const WatermarkContainer = styled.div`
  ${Styles.absoluteCenter}
`
