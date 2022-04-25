import { Pokemon } from "pokedex-promise-v2";

export type NFT = Omit<Pokemon, "versions" | "moves" | "sprites" | "id"> & {
  sprites: Omit<Pokemon["sprites"], "other" | "versions">;
  id: string | number;
};
