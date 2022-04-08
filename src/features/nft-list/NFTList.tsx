import React from "react";
import { Card } from "semantic-ui-react";

import { NFTCard } from "@pokenft/common";

import { nftsListMock } from "@/features/nft-list/mocks";

export function NFTList() {
  return (
    <div>
      <h1>NFT List</h1>
      <Card.Group itemsPerRow={4}>
        {nftsListMock.map(nft => (
          <NFTCard key={nft.id} pokemon={nft} />
        ))}
      </Card.Group>
    </div>
  );
}

export default NFTList;
