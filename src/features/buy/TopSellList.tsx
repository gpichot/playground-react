import React from "react";
import { Card } from "semantic-ui-react";

import { NFTCard } from "@/features/common";
import { useNFTQuery } from "@/features/nft-list/api-hooks";
import { withAdaptive } from "@/utils";

import { useTopSellNFTsQuery } from "./api-hooks";

const computeAdaptiveProps = (width: number) =>
  ({
    itemsPerRow: width > 600 ? 3 : 2,
  } as Partial<React.ComponentProps<typeof Card.Group>>);

export default function TopSellList() {
  const topSellQuery = useTopSellNFTsQuery();
  const [selected, setSelected] = React.useState<{
    url: string;
    id: number;
  } | null>(null);

  const pokemons = (topSellQuery.data || []).map(pokemon => ({
    url: pokemon.url,
    id: Number(pokemon.url.split("/").slice(-2, -1)[0]),
  }));

  const AdaptiveCardGroup = withAdaptive(Card.Group, computeAdaptiveProps);

  // React.useEffect(() => {
  //   setSelected(pokemons?.length ? pokemons[0] : null);
  // }, [pokemons]);

  if (topSellQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (topSellQuery.isError || !topSellQuery.data) {
    return <div>Error!</div>;
  }

  return (
    <div>
      <h1>Top Sell</h1>
      <AdaptiveCardGroup>
        {pokemons.map(pokemon => (
          <LoadNFTCard key={pokemon.id} pokemon={pokemon} selected={selected} />
        ))}
      </AdaptiveCardGroup>
    </div>
  );
}

function LoadNFTCard({
  pokemon,
  selected,
}: {
  pokemon: { id: number };
  selected: { id: number; url: string } | null;
}) {
  const pokemonQuery = useNFTQuery(pokemon.id);

  if (pokemonQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (pokemonQuery.isError || !pokemonQuery.data) {
    return <div>Error!</div>;
  }

  return <NFTCard pokemon={pokemonQuery.data} />;
}
