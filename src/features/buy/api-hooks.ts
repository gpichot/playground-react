import { APIResourceList } from "pokedex-promise-v2";
import { useQuery } from "react-query";

import { sleep, get } from "@/utils";

export function useTopSellPokemonsQuery() {
  return useQuery(
    "topSellPokemons",
    async () => {
      const response = await get<APIResourceList>(
        "https://pokeapi.co/api/v2/pokemon?limit=30&offset=250"
      );
      await sleep();
      return response.results;
    },
    {
      // Refresh every five seconds
      refetchInterval: 10 * 1000,
    }
  );
}
