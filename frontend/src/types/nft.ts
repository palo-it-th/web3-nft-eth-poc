import { BigNumber } from 'ethers'

export interface NftImageCID {
  image: string;
  imageSrc: string;
}

export interface Nft {
  nftId: BigNumber;
  nftMetadataCID: string;
  nftImageCID: NftImageCID;
}

