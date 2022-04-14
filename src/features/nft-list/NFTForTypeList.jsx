import React from "react";
import { Button, Card } from "semantic-ui-react";

import { NFTCard } from "@/features/common";

export function NFTForTypeList({ typeUrl }) {
  const limit = 10;
  const result = {
    count: 132,
    items: [],
  };
  return (
    <>
      <Card.Group itemsPerRow={4}>
        {result.items.map(pokemon => (
          <NFTCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Card.Group>
      <Button>Load more</Button>
    </>
  );
}
