import React from "react";

import { Limit } from "./defaults";

type IPlayerAction =
  | { type: "reset" }
  | { type: "increment"; payload?: number };

type IPlayerContext = {
  currentTick: number;
  tickRef: React.MutableRefObject<number>;
  dispatch: React.Dispatch<IPlayerAction>;
};

const PlayerContext = React.createContext<IPlayerContext | undefined>(
  undefined
);

export function usePlayerContext() {
  const context = React.useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
}

function timelineReducer(state: number, action: IPlayerAction) {
  switch (action.type) {
    case "reset":
      return 0;
    case "increment":
      if (state >= Limit) return state;
      return state + (action.payload ?? 1);
    default:
      throw new Error("Unexpected action type");
  }
}

export const resetTick = (dispatch: React.Dispatch<IPlayerAction>) =>
  dispatch({ type: "reset" });
export const incrementTick = (
  dispatch: React.Dispatch<IPlayerAction>,
  payload?: number
) => dispatch({ type: "increment", payload });

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTick, dispatch] = React.useReducer(timelineReducer, -1);
  const tickRef = React.useRef(currentTick);
  tickRef.current = currentTick;
  return (
    <PlayerContext.Provider value={{ currentTick, tickRef, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
}
