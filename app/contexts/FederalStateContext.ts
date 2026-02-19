import { createContext, useContext } from "react";

export type FederalState = "bund" | "brandenburg" | "thueringen" | "hessen";

export interface FederalStateInfo {
  id: FederalState;
  name: string;
  shortName: string;
}

export const FEDERAL_STATES: FederalStateInfo[] = [
  { id: "bund", name: "Bund", shortName: "Bund" },
  { id: "brandenburg", name: "Brandenburg", shortName: "BB" },
  { id: "thueringen", name: "Thüringen", shortName: "TH" },
  { id: "hessen", name: "Hessen", shortName: "HE" },
];

export interface FederalStateContextValue {
  currentState: FederalState;
  setCurrentState: (state: FederalState) => void;
  stateInfo: FederalStateInfo;
}

const FederalStateContext = createContext<FederalStateContextValue | null>(
  null,
);

export function useFederalState() {
  const context = useContext(FederalStateContext);
  if (!context) {
    throw new Error(
      "useFederalState must be used within a FederalStateProvider",
    );
  }
  return context;
}

export function getFederalStateInfo(state: FederalState): FederalStateInfo {
  return FEDERAL_STATES.find((s) => s.id === state) ?? FEDERAL_STATES[0];
}

export default FederalStateContext;
