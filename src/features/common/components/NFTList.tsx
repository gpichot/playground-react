import React from "react";
import { Button, Grid, Input, Toolbar } from "@mui/material";

import usePaginatedPokemons from "@/features/common/hooks/usePaginatedPokemons";

import NFTCard from "./NFTCard";

function NFTList() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(1);

  const query = usePaginatedPokemons(page);
  const { data: nfts } = query;
  if (query.isLoading) {
    return <div>Loading...</div>;
  }
  if (query.isError || !Array.isArray(nfts)) {
    return <div>Error!</div>;
  }

  const filteredNfts = nfts.filter(nft =>
    nft.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>NFT List</h1>
      <Toolbar>
        <Button onClick={() => query.refetch()}>refetch</Button>
        <Input
          placeholder="Filter"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />
        {query.isFetching && "Fetching"}
        <Button onClick={() => setPage(page => page - 1)} disabled={page === 1}>
          previous
        </Button>
        {page}
        <Button onClick={() => setPage(page => page + 1)}>next</Button>
      </Toolbar>
      <br />
      <Grid container spacing={2} alignItems="stretch">
        {filteredNfts.map(nft => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={nft.id}>
            <NFTCard pokemon={nft} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default NFTList;
