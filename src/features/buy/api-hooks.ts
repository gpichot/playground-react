import { useQuery } from "react-query";
import { APIResourceList } from "pokedex-promise-v2";

import { get, sleep } from "@/utils";

export function useTopSellNFTsQuery() {
  return useQuery(
    "topSellNFTs",
    async () => {
      const response = await get<APIResourceList>(
        "https://pokeapi.co/api/v2/pokemon?limit=90&offset=250"
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
