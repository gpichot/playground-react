import React from "react";
import { Button, Card } from "semantic-ui-react";
import { NFTCard } from "@pokenft/common";

/**
 * TODO-EXO(exo-react-query-paginate)
 * Dans cet exercice vous allez paginer la liste des
 * pokemons similaires à un type de pokemon.
 *
 * 1. Créer un nouveau hook en utilisant `useInfiniteQuery` de react-query
 *   pour récupérer la liste des pokemons similaires à un type de pokemon.
 *   Note: utiliser pour cela la fonction `getNFTsListByType`.
 * 2. Ajouter ce hook au composant ci-dessous.
 * 3. Un click sur le bouton "Load more" doit charger une nouvelle page.
 * 4. Le bouton doit être désactivé si une page est en train d'être chargée.
 * 5. S'il n'y a plus de page le bouton ne doit plus être affiché.
 */

export function NFTForTypeList({ typeUrl }) {
  const limit = 10;
  const result = {
    count: 132,
    items: [],
  };
  return (
    <>
      <Card.Group itemsPerRow={4}>
        {result.items.map(pokemon => (
          <NFTCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Card.Group>
      <Button>Load more</Button>
    </>
  );
}
