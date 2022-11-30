import { Nft } from './Nft'

export interface ContractDetails {
  symbol: string
  balance: number
  nftList: Nft[]
}
