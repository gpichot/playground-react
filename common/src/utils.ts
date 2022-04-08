import { NFT } from "./types";

export function isNFTPremium(nft: NFT): boolean {
  return nft.weight % 10 === 0;
}
