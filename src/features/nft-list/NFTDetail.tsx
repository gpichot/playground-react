import React from "react";

import { BuyForm } from "../buy/BuyForm";
import { Ivysaur } from "./mocks";

export default function NFTDetail() {
  const pokemon = Ivysaur;
  const image = pokemon.sprites.front_default;
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <BuyForm pokemon={pokemon} />
      {image && <img src={image} alt={pokemon.name} />}
    </div>
  );
}
