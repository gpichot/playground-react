import React from "react";
import { Card } from "semantic-ui-react";
import { useNFTList } from "./api-hooks";
import { NFTCard } from "./NFTCard";

export function NFTList() {
  const pokemons = useNFTList();
  if (pokemons.isLoading) {
    return <div>Loading...</div>;
  }
  if (pokemons.isError || !pokemons.data) {
    return <div>Error!</div>;
  }

  return (
    <div>
      <h1>NFT List</h1>
      <Card.Group itemsPerRow={4}>
        {pokemons.data.map(pokemon => (
          <NFTCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Card.Group>
    </div>
  );
}
