import React from "react";
import { Bulbasaur } from "./mocks";

/**
 * TODO-EXO(exo-story)
 * Dans cet exercice vous allez rajouter une story pour le
 * composant NFTCard.
 *
 * 1. Ajouter le export default avec les bonnes propriétés
 * 2. Créer un template pour ce composant.
 * 3. Créer une story pour ce composant.
 */

import { NFTCard } from "./NFTCard";

export default {
  title: "NFTCard",
  component: NFTCard,
};

const Template = args => (
  <div style={{ margin: 10 }}>
    <NFTCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  pokemon: Bulbasaur,
  tabIndex: 0,
};

export const Premium = Template.bind({});
Premium.args = {
  pokemon: {
    ...Bulbasaur,
    weight: 7,
  },
};
