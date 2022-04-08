import { Pokemon } from "pokedex-promise-v2";

export type NFT = Omit<Pokemon, "versions" | "moves" | "sprites"> & {
  sprites: Omit<Pokemon["sprites"], "other" | "versions">;
};
