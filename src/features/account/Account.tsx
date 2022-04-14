import React from "react";
import { Card } from "semantic-ui-react";

import { useBuyContext } from "@/features/buy/context";
import { NFTCard } from "@/features/common";
import { useNFTQuery } from "@/features/nft-list/api-hooks";

export function Account() {
  const { balance, properties } = useBuyContext();
  return (
    <div>
      <h1>Account</h1>
      Balance: {balance}
      <h2>My pokemons</h2>
      <Card.Group itemsPerRow={4}>
        {properties.map(property => (
          <PropertyCard property={property} key={property} />
        ))}
      </Card.Group>
    </div>
  );
}

export function PropertyCard({ property }: { property: string }) {
  const [kind, id] = property.split("-");

  if (kind === "pokemon") {
    return <PropertyNFTCard id={Number(id)} />;
  }
  console.warn(`Unknown property kind: ${kind}`);
  return null;
}

export function PropertyNFTCard({ id }: { id: number }) {
  const pokemonQuery = useNFTQuery(id);
  if (pokemonQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (pokemonQuery.isError || !pokemonQuery.data) {
    return <div>Error</div>;
  }
  return <NFTCard pokemon={pokemonQuery.data} />;
}
