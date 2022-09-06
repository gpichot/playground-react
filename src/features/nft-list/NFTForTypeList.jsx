import React from "react";
import { Button, Grid } from "@mui/material";

import { NFTCard } from "@/features/common";

export function NFTForTypeList({ typeUrl }) {
  const limit = 10;
  const result = {
    count: 132,
    items: [],
  };
  return (
    <>
      <Grid container spacing={2}>
        {result.items.map(pokemon => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
            <NFTCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid>
      <Button>Load more</Button>
    </>
  );
}
