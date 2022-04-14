import { useQuery } from "react-query";

import { NFT } from "@/features/common/types";
import { get, sleep } from "@/utils";

import { getNFTsList } from "./api";

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
