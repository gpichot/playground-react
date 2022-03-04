import React from "react";
import { Card } from "semantic-ui-react";
import { usePokemonList } from "./api-hooks";
import { PokemonCard } from "./PokemonCard";

export function PokemonList() {
  const pokemons = usePokemonList();
  if (pokemons.isLoading) {
    return <div>Loading...</div>;
  }
  if (pokemons.isError || !pokemons.data) {
    return <div>Error!</div>;
  }

  return (
    <div>
      <h1>Pokemon List</h1>
      <Card.Group itemsPerRow={4}>
        {pokemons.data.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Card.Group>
    </div>
  );
}
