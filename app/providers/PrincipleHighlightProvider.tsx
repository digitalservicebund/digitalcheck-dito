import { ReactNode, useMemo, useState } from "react";
import PrincipleHighlightContext from "~/contexts/PrincipleHighlightContext";
import { BasePrinzip } from "~/utils/strapiData.server";

type PrincipleHighlightProviderProps = {
  children: ReactNode;
  principlesToShow: BasePrinzip[];
  useAnchorLinks: boolean;
  absatzId: string;
};

export default function PrincipleHighlightProvider({
  children,
  absatzId,
  principlesToShow,
  useAnchorLinks = true,
}: Readonly<PrincipleHighlightProviderProps>) {
  // This ID is used to track which highlight was clicked on to provide a backlink
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      principlesToShow,
      activeHighlight,
      setActiveHighlight,
      useAnchorLinks,
      absatzId,
    }),
    [
      principlesToShow,
      activeHighlight,
      setActiveHighlight,
      useAnchorLinks,
      absatzId,
    ],
  );

  return (
    <PrincipleHighlightContext.Provider value={value}>
      {children}
    </PrincipleHighlightContext.Provider>
  );
}
