import React from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

export type BuyContextType = {
  buy: (id: string, amount: number) => void;
  owns: (property: string) => boolean;
  balance: number;
  properties: string[];
  isLoaded: boolean;
};
type BuyContextState = Omit<BuyContextType, "buy" | "owns">;

const BuyContext = React.createContext<BuyContextType>({
  balance: 103.12,
  properties: [],
  isLoaded: false,
  owns: () => false,
  buy: () => {},
});

type BuyContextAction =
  | {
      type: "BUY";
      amount: number;
      property: string;
    }
  | {
      balance: number;
      properties: string[];
      type: "LOADED";
    };

function reducer(state: BuyContextState, action: BuyContextAction) {
  switch (action.type) {
    case "BUY":
      return {
        ...state,
        balance: state.balance - action.amount,
        properties: [...state.properties, action.property],
      };
    case "LOADED":
      return {
        ...state,
        balance: action.balance,
        properties: action.properties,
        isLoaded: true,
      };
    default:
      return state;
  }
}

function createInitialState(): BuyContextState {
  return {
    balance: 103.12,
    properties: [],
    isLoaded: false,
  };
}

export function BuyContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(reducer, createInitialState());

  React.useEffect(() => {
    const data = localStorage.getItem("pokenft-buy");
    if (data) {
      const payload = JSON.parse(data) as BuyContextState;
      dispatch({
        type: "LOADED",
        balance: payload.balance,
        properties: payload.properties,
      });
    } else {
      dispatch({
        type: "LOADED",
        balance: 103.12,
        properties: [],
      });
    }
  }, []);

  useDeepCompareEffect(() => {
    localStorage.setItem(
      "pokenft-buy",
      JSON.stringify({
        balance: state.balance,
        properties: state.properties,
      })
    );
  }, [state]);

  const buy = (id: string, amount: number) => {
    if (state.balance < amount) {
      throw new Error("Not enough money");
    }
    dispatch({
      type: "BUY",
      amount,
      property: id,
    });
  };
  const owns = (property: string) => state.properties.includes(property);
  return (
    <BuyContext.Provider value={{ ...state, buy, owns }}>
      j{children}
    </BuyContext.Provider>
  );
}

export function useBuyContext() {
  const context = React.useContext(BuyContext);
  if (!context) {
    throw new Error("useBuyContext must be used within a BuyContextProvider");
  }

  return context;
}
