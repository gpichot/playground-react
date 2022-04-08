import React from "react";
import { screen } from "@testing-library/react";

import { render } from "@/test/utils";

import { Bulbasaur, Guts } from "./mocks";
import { NFTCard } from "./NFTCard";

/**
 * TODO-EXO(exo-unit-test)
 * Écrivez les tests pour le composant NFTCard suivants.
 *
 * 1. Le composant NFTCard doit afficher le nom du pokémon.
 * 2. Le composant NFTCard doit afficher le label Premium.
 * 3. Au clic sur "More" on doit être redirigé vers la page du pokémon.
 */

describe("NFTCard", () => {
  // Use Bulbasaur pokemon mock for this
  it.todo("displays pokemon name");

  // Use Guts pokemon mock for this
  it.todo("displays is premium");

  it.todo("goes to pokemon details page when on more");
});
