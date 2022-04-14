import React from "react";
import { Card, Form } from "semantic-ui-react";

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
      <button onClick={() => query.refetch()}>refetch</button>
      <Form.Input
        placeholder="Filter"
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
      />
      {query.isFetching && "Fetching"}
      <button onClick={() => setPage(page => page - 1)} disabled={page === 1}>
        previous
      </button>
      {page}
      <button onClick={() => setPage(page => page + 1)}>next</button>
      <br />
      <Card.Group itemsPerRow={2}>
        {filteredNfts.map(nft => (
          <NFTCard key={nft.id} pokemon={nft} />
        ))}
      </Card.Group>
    </div>
  );
}

export default NFTList;
