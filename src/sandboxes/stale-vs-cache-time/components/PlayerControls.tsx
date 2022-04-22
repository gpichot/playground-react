import React from "react";

import { incrementTick, resetTick, usePlayerContext } from "../player-context";

export default function PlayerControls() {
  const { currentTick, dispatch } = usePlayerContext();
  const intervalRef = React.useRef<number | undefined>();
  const play = () => {
    resetTick(dispatch);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    incrementTick(dispatch, 1);
    intervalRef.current = window.setInterval(() => {
      incrementTick(dispatch, 10);
    }, 10);
  };
  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <button onClick={play}>Play</button>
      <button>Tick</button>
      tick: {currentTick}
    </>
  );
}
