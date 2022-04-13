import { useQuery } from "react-query";
import { Pokemon, PokemonType, Type } from "pokedex-promise-v2";

import { get, sleep } from "@/utils";

import { getNFTsList } from "./api";

const QueryKeys = {
  pokemonsList: () => "pokemonsList",
  pokemonsListByType: (type: string) => [`pokemonsListByType`, { type }],
  pokemonDetail: (id: number) => ["pokemonDetail", id],
};

export function useNFTList() {
  return useQuery(QueryKeys.pokemonsList(), getNFTsList);
}

export function useNFTQuery(id: number) {
  return useQuery(QueryKeys.pokemonDetail(id), () =>
    get<NFT>(`https://pokeapi.co/api/v2/pokemon/${id}`)
  );
}

export async function getNFTsListByType(
  typeUrl: string,
  { offset = 0, limit = 10 }: { offset?: number; limit?: number } = {}
): Promise<{ count: number; items: NFT[] }> {
  const pokemonType = await get<Type>(typeUrl);
  const pokemons = pokemonType.pokemon.slice(offset, offset + limit);
  await sleep();
  return {
    count: pokemonType.pokemon.length,
    items: await Promise.all(
      pokemons.map(pokemon => get<NFT>(pokemon.pokemon.url))
    ),
  };
}
