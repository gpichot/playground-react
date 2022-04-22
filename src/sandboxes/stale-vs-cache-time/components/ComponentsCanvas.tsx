import React from "react";

import { useFakeQuery } from "../api";
import { IOptions } from "../defaults";
import { usePlayerContext } from "../player-context";

function isDisplayed(
  currentTick: number,
  { startAt, endAt }: { startAt: number; endAt: number }
) {
  return currentTick >= startAt && currentTick <= endAt;
}

function Box({ title }: { title: string }) {
  useFakeQuery();
  return <div>{title}</div>;
}

export default function ComponentsCanvas({ options }: { options: IOptions }) {
  const { currentTick } = usePlayerContext();

  return (
    <>
      {isDisplayed(currentTick, options.compA) && <Box title="Box A" />}
      {isDisplayed(currentTick, options.compB) && <Box title="Box B" />}
    </>
  );
}
