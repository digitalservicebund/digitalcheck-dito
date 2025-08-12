import { ReactNode, useState } from "react";
import PrincipleHighlightContext from "~/contexts/PrincipleHighlightContext";
import { BasePrinzip } from "~/utils/strapiData.server";

type PrincipleHighlightProviderProps = {
  children: ReactNode;
  principlesToShow: BasePrinzip[];
  useAnchorLinks: boolean;
  absatzId: string;
};

export function PrincipleHighlightProvider({
  children,
  absatzId,
  principlesToShow,
  useAnchorLinks = true,
}: Readonly<PrincipleHighlightProviderProps>) {
  // This ID is used to track which highlight was clicked on to provide a back link
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  return (
    <PrincipleHighlightContext.Provider
      value={{
        principlesToShow,
        activeHighlight,
        setActiveHighlight,
        useAnchorLinks,
        absatzId,
      }}
    >
      {children}
    </PrincipleHighlightContext.Provider>
  );
}
