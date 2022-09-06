import { useMutation, useQuery, useQueryClient } from "react-query";

import { NFT } from "@/features/common/types";
import { get, sleep } from "@/utils";

import { getNFTsList, postPokemon } from "./api";

const QueryKeys = {
  pokemonsList: () => "pokemonsList",
  pokemonsListByType: (type: string) => [`pokemonsListByType`, { type }],
  pokemonDetail: (id: number) => ["pokemonDetail", id],
};

export async function useNFTList() {
  await sleep(2000);
  return useQuery(QueryKeys.pokemonsList(), () => getNFTsList());
}

export function useNFTQuery(id: number) {
  return useQuery(QueryKeys.pokemonDetail(id), () =>
    get<NFT>(`https://pokeapi.co/api/v2/pokemon/${id}`)
  );
}

export function useAddPokemonMutation() {
  const queryClient = useQueryClient();
  const queryKey = QueryKeys.pokemonsList();
  return useMutation(postPokemon, {
    onMutate: data => {
      const pokemons = queryClient.getQueryData(queryKey) || [];
      queryClient.setQueryData(queryKey, items => {
        return [data, ...(items as NFT[])];
      });

      return { pokemons };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(queryKey, () => {
        return (context as { pokemons: NFT[] }).pokemons;
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pokemonList"]);
    },
  });
}
