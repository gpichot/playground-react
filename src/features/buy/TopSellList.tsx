import React from "react";
import { Grid } from "@mui/material";

import { NFTCard } from "@/features/common";
import { useNFTQuery } from "@/features/nft-list/api-hooks";
import { withAdaptive } from "@/utils";

import { useTopSellNFTsQuery } from "./api-hooks";

const computeAdaptiveProps = (width: number) =>
  ({
    itemsPerRow: width > 600 ? 3 : 2,
  } as Partial<React.ComponentProps<typeof Grid>>);

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

  const AdaptiveCardGroup = withAdaptive(Grid, computeAdaptiveProps);

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
      <AdaptiveCardGroup container spacing={2} alignItems="stretch">
        {pokemons.map(pokemon => (
          <Grid item key={pokemon.id} xs={12} sm={4} md={3}>
            <LoadNFTCard pokemon={pokemon} selected={selected} />
          </Grid>
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
