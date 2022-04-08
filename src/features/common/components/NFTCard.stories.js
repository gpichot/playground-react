/* eslint-disable storybook/story-exports */
import React from "react";

import { Bulbasaur } from "@/features/nft-list/mocks";

import NFTCard from "./NFTCard";

export default {
  title: "NFTCard",
  //   component: NFTCard,
};

const Template = args => (
  <div style={{ margin: 10 }}>
    <NFTCard {...args} />
  </div>
);

// export const Default = Template.bind({});
// Default.args = {
//   pokemon: Bulbasaur,
//   tabIndex: 0,
// };
//
// export const Premium = Template.bind({});
// Premium.args = {
//   pokemon: {
//     ...Bulbasaur,
//     weight: 7,
//   }
// };
