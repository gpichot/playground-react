import React from "react";
import { usePokemonQuery } from "@/features/nft-list/api-hooks";
import { PokemonCard } from "@/features/nft-list/PokemonCard";
import { useTopSellPokemonsQuery } from "./api-hooks";
import { Card } from "semantic-ui-react";
import { withAdaptive } from "@/utils";

const computeAdaptiveProps = (width: number) =>
  ({
    itemsPerRow: width > 600 ? 3 : 2,
  } as Partial<React.ComponentProps<typeof Card.Group>>);

export default function TopSellList() {
  const topSellQuery = useTopSellPokemonsQuery();

  if (topSellQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (topSellQuery.isError || !topSellQuery.data) {
    return <div>Error!</div>;
  }

  const pokemons = topSellQuery.data.map(pokemon => ({
    url: pokemon.url,
    id: Number(pokemon.url.split("/").slice(-2, -1)[0]),
  }));

  const AdaptiveCardGroup = withAdaptive(Card.Group, computeAdaptiveProps);
  return (
    <div>
      <h1>Top Sell</h1>
      <AdaptiveCardGroup>
        {pokemons.map(pokemon => (
          <LoadPokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </AdaptiveCardGroup>
    </div>
  );
}

function LoadPokemonCard({ pokemon }: { pokemon: { id: number } }) {
  const pokemonQuery = usePokemonQuery(pokemon.id);

  if (pokemonQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (pokemonQuery.isError || !pokemonQuery.data) {
    return <div>Error!</div>;
  }

  if (pokemonQuery.data.id === 252) {
    console.log("hello");
  }

  return <PokemonCard pokemon={pokemonQuery.data} />;
}
