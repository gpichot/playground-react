import type { NFT } from "@/features/common/types";
import { get } from "@/utils";

function sleep(ms = 500) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const PokemonItemsStorageKey = "pokemon-items";
export function setPokemonInItemStorage(pokemon: NFT) {
  const data = localStorage.getItem(PokemonItemsStorageKey);
  if (data) {
    const items = JSON.parse(data);
    items.push(pokemon);
    localStorage.setItem(PokemonItemsStorageKey, JSON.stringify(items));
  } else {
    localStorage.setItem(PokemonItemsStorageKey, JSON.stringify([pokemon]));
  }
}

export function getPokemonsFromItemStorage(): NFT[] {
  const data = localStorage.getItem(PokemonItemsStorageKey);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

export async function postPokemon(pokemon: NFT) {
  await sleep(1000);
  setPokemonInItemStorage(pokemon);
  return pokemon;
}

export async function getNFTsList(page = 0, limit = 4): Promise<NFT[]> {
  await sleep();
  const pokemons = await Promise.all(
    new Array(limit)
      .fill(0)
      .map((_, index) =>
        get<NFT>(
          `https://pokeapi.co/api/v2/pokemon/${index + 1 + page * limit}`
        )
      )
  );

  const saved = page === 0 ? getPokemonsFromItemStorage() : [];
  return [...saved, ...pokemons];
}
