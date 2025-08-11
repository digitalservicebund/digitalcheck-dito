import { createContext, ReactNode, useState } from "react";
import { Prinzip } from "~/utils/strapiData.server";

type PrincipleHighlightContextType = {
  principlesToShow: Prinzip[];
  activeHighlight: string | null;
  setActiveHighlight: React.Dispatch<React.SetStateAction<string | null>>;
  useAnchorLinks: boolean;
  absatzId: string;
};

export const PrincipleHighlightContext =
  createContext<PrincipleHighlightContextType>({
    principlesToShow: [],
    activeHighlight: null,
    setActiveHighlight: () => {},
    useAnchorLinks: true,
    absatzId: "",
  });

type PrincipleHighlightProviderProps = {
  children: ReactNode;
  principlesToShow: Prinzip[];
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
