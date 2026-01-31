import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import FederalStateContext, {
  type FederalState,
  getFederalStateInfo,
} from "~/contexts/FederalStateContext";

const STORAGE_KEY = "digitalcheck-federal-state";

function isValidFederalState(value: string | null): value is FederalState {
  return (
    value === "bund" ||
    value === "brandenburg" ||
    value === "thueringen" ||
    value === "hessen"
  );
}

export default function FederalStateProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [currentState, setCurrentStateInternal] = useState<FederalState>("bund");

  // Load from localStorage after mount (client-side only)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isValidFederalState(stored)) {
      setCurrentStateInternal(stored);
    }
  }, []);

  const setCurrentState = useCallback((state: FederalState) => {
    setCurrentStateInternal(state);
    localStorage.setItem(STORAGE_KEY, state);
  }, []);

  const value = useMemo(
    () => ({
      currentState,
      setCurrentState,
      stateInfo: getFederalStateInfo(currentState),
    }),
    [currentState, setCurrentState],
  );

  return (
    <FederalStateContext.Provider value={value}>
      {children}
    </FederalStateContext.Provider>
  );
}
