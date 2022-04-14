import React from "react";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";

import { getNFTsList } from "@/features/nft-list/api";

import { NFT } from "../types";

const queryKeys = {
  pokemonList: ({ page }: { page: number }) =>
    ["pokemons", { page }] as ["pokemons", { page: number }],
};

export default function usePaginatedPokemons(page = 0, { limit = 4 } = {}) {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const key = queryKeys.pokemonList({ page: page + 1 });
    queryClient.prefetchQuery(key, () => getNFTsList(page, limit));
  }, [page, limit, queryClient]);

  const key = queryKeys.pokemonList({ page });
  return useQuery(key, () => getNFTsList(page - 1, limit), {
    // staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  }) as UseQueryResult<NFT[], Error>;
}
