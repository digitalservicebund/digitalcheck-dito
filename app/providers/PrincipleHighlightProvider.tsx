import { createContext, ReactNode, useState } from "react";
import { Prinzip } from "~/utils/strapiData.server";

type Highlight = {
  id: string;
  principleNumber: number;
};

type PrincipleHighlightContextType = {
  principlesToShow: Prinzip[];
  activeHighlight: Highlight | null;
  setActiveHighlight: React.Dispatch<React.SetStateAction<Highlight | null>>;
  explanationIdPrefix: string | null;
  useAnchorLinks: boolean;
};

export const PrincipleHighlightContext =
  createContext<PrincipleHighlightContextType>({
    principlesToShow: [],
    activeHighlight: null,
    setActiveHighlight: () => {},
    explanationIdPrefix: null,
    useAnchorLinks: true,
  });

type PrincipleHighlightProviderProps = {
  children: ReactNode;
  principlesToShow: Prinzip[];
  absatzId: number;
  useAnchorLinks: boolean;
};

export function PrincipleHighlightProvider({
  children,
  absatzId,
  principlesToShow,
  useAnchorLinks = true,
}: Readonly<PrincipleHighlightProviderProps>) {
  const explanationIdPrefix = `erklaerung-${absatzId}`;

  // This ID is used to track which highlight was clicked on to provide a back link
  const [activeHighlight, setActiveHighlight] = useState<Highlight | null>(
    null,
  );

  return (
    <PrincipleHighlightContext.Provider
      value={{
        explanationIdPrefix,
        principlesToShow,
        activeHighlight,
        setActiveHighlight,
        useAnchorLinks,
      }}
    >
      {children}
    </PrincipleHighlightContext.Provider>
  );
}
