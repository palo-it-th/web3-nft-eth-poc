import { Nft } from './nft'

export interface ContractDetails {
  symbol: string
  balance: number
  nftList: Nft[];
}
