import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ReactQueryEvent } from "../useEvents";
import { TimelineBoxes } from "./ReactQueryTimeline";

export default {
  title: "Components/Timeline/TimelineBoxes",
  component: TimelineBoxes,
} as ComponentMeta<typeof TimelineBoxes>;

const events = [
  {
    type: "query",
    action: "added",
    time: 1650493098205,
    tick: 1,
    queryKey: ["fake-query"],
  },
  {
    type: "observer",
    action: "added",
    time: 1650493098208,
    tick: 1,
    queryKey: ["fake-query"],
    observer: "observer-1",
  },
  {
    type: "query",
    action: "fetch",
    time: 1650493098209,
    tick: 1,
    queryKey: ["fake-query"],
  },
  {
    type: "query",
    action: "success",
    time: 1650493098257,
    tick: 41,
    queryKey: ["fake-query"],
  },
  {
    type: "observer",
    action: "added",
    time: 1650493099216,
    tick: 1001,
    queryKey: ["fake-query"],
    observer: "observer-2",
  },
  {
    type: "query",
    action: "fetch",
    time: 1650493099216,
    tick: 1001,
    queryKey: ["fake-query"],
  },
  {
    type: "query",
    action: "success",
    time: 1650493099234,
    tick: 1011,
    queryKey: ["fake-query"],
  },
  {
    type: "observer",
    action: "removed",
    time: 1650493100216,
    tick: 2001,
    queryKey: ["fake-query"],
    observer: "observer-1",
  },
  {
    type: "observer",
    action: "removed",
    time: 1650493102215,
    tick: 4001,
    queryKey: ["fake-query"],
    observer: "observer-2",
  },
  {
    type: "query",
    action: "removed",
    time: 1650493103015,
    tick: 4801,
    queryKey: ["fake-query"],
  },
];

const Template: ComponentStory<typeof TimelineBoxes> = args => (
  <TimelineBoxes {...args} />
);

export const Default = Template.bind({});
Default.args = {
  events: events as ReactQueryEvent[],
};
