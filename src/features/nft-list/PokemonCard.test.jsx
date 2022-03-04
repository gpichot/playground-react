import React from "react";
import { render } from "@/test/utils";
import { screen } from "@testing-library/react";

import { PokemonCard } from "./PokemonCard";

import { Bulbasaur, Guts } from "./mocks";

/**
 * TODO-EXO(exo-unit-test)
 * Écrivez les tests pour le composant PokemonCard suivants.
 *
 * 1. Le composant PokemonCard doit afficher le nom du pokémon.
 * 2. Le composant PokemonCard doit afficher le label Premium.
 * 3. Au clic sur "More" on doit être redirigé vers la page du pokémon.
 */

describe("PokemonCard", () => {
  // Use Bulbasaur pokemon mock for this
  it.todo("displays pokemon name");

  // Use Guts pokemon mock for this
  it.todo("displays is premium");

  it.todo("goes to pokemon details page when on more");
});
