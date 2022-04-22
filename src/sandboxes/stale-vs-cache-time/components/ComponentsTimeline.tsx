import React from "react";

import { IOptions, Limit } from "../defaults";
import TimelineBox, { TimelineBoxGroup } from "./TimelineBox";

function ComponentBoxTimeline({
  startAt,
  endAt,
  title,
}: {
  title: string;
  startAt: number;
  endAt: number;
}) {
  return (
    <TimelineBox
      title={title}
      style={{
        left: `${(startAt / Limit) * 100}%`,
        width: `${((endAt - startAt) / Limit) * 100}%`,
      }}
    />
  );
}

export default function ComponentsTimeline({ options }: { options: IOptions }) {
  return (
    <TimelineBoxGroup>
      <ComponentBoxTimeline
        title="Component A"
        startAt={options.compA.startAt}
        endAt={options.compA.endAt}
      />
      <ComponentBoxTimeline
        title="Component B"
        startAt={options.compB.startAt}
        endAt={options.compB.endAt}
      />
    </TimelineBoxGroup>
  );
}
