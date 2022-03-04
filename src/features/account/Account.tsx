import React from "react";

import { useBuyContext } from "@/features/buy/context";
import { PokemonCard } from "@/features/nft-list/PokemonCard";
import { usePokemonQuery } from "@/features/nft-list/api-hooks";
import { Card } from "semantic-ui-react";

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
    return <PropertyPokemonCard id={Number(id)} />;
  }
  console.warn(`Unknown property kind: ${kind}`);
  return null;
}

export function PropertyPokemonCard({ id }: { id: number }) {
  const pokemonQuery = usePokemonQuery(id);
  if (pokemonQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (pokemonQuery.isError || !pokemonQuery.data) {
    return <div>Error: {pokemonQuery.error}</div>;
  }
  return <PokemonCard pokemon={pokemonQuery.data} />;
}
