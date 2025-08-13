import { createContext } from "react";
import { BasePrinzip } from "~/utils/strapiData.server";

type PrincipleHighlightContextType = {
  principlesToShow: BasePrinzip[];
  activeHighlight: string | null;
  setActiveHighlight: React.Dispatch<React.SetStateAction<string | null>>;
  useAnchorLinks: boolean;
  absatzId: string;
};

const PrincipleHighlightContext = createContext<PrincipleHighlightContextType>({
  principlesToShow: [],
  activeHighlight: null,
  setActiveHighlight: () => {},
  useAnchorLinks: true,
  absatzId: "",
});

export default PrincipleHighlightContext;
