import { Pokemon, PokemonType, Type } from "pokedex-promise-v2";
import { useQuery } from "react-query";

import { sleep, get } from "@/utils";

function getPokemonsList(): Promise<Pokemon[]> {
  return Promise.all(
    new Array(100)
      .fill(0)
      .map((_, index) =>
        get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${index + 1}`)
      )
  );
}

const QueryKeys = {
  pokemonsList: () => "pokemonsList",
  pokemonsListByType: (type: string) => [`pokemonsListByType`, { type }],
  pokemonDetail: (id: number) => ["pokemonDetail", id],
};

export function usePokemonList() {
  return useQuery(QueryKeys.pokemonsList(), getPokemonsList);
}

export function usePokemonQuery(id: number) {
  return useQuery(QueryKeys.pokemonDetail(id), () =>
    get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
  );
}

export async function getPokemonsListByType(
  typeUrl: string,
  { offset = 0, limit = 10 }: { offset?: number; limit?: number } = {}
): Promise<{ count: number; items: Pokemon[] }> {
  const pokemonType = await get<Type>(typeUrl);
  const pokemons = pokemonType.pokemon.slice(offset, offset + limit);
  await sleep();
  return {
    count: pokemonType.pokemon.length,
    items: await Promise.all(
      pokemons.map(pokemon => get<Pokemon>(pokemon.pokemon.url))
    ),
  };
}
