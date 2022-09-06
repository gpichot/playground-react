import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import StatBlock, { StatBlockGroup } from "./StatBlock";

export default {
  title: "Components/StatBlock",
  component: StatBlock,
} as ComponentMeta<typeof StatBlock>;

const Template: ComponentStory<typeof StatBlock> = () => (
  <StatBlockGroup>
    <StatBlock name="test" value={32} />
  </StatBlockGroup>
);

export const Default = Template.bind({});
Default.args = {};
