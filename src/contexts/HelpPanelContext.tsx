import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type HelpSection = { id: string; title: string; content: ReactNode };

type HelpPanelContextType = {
  isOpen: boolean;
  sections: HelpSection[];
  activeSection: string | null;
  openPanel: (sectionId?: string) => void;
  closePanel: () => void;
  setHelpSections: (sections: HelpSection[]) => void;
  registerSection: (section: HelpSection) => void;
};

const HelpPanelContext = createContext<HelpPanelContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useHelpPanel(): HelpPanelContextType {
  const helpPanelContext = useContext(HelpPanelContext);
  if (helpPanelContext === null)
    throw new Error("Use inside a HelpPanelProvider");

  return helpPanelContext;
}

export function HelpPanelProvider({
  children,
  currentPath,
}: Readonly<{ children: React.ReactNode; currentPath: string }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [staticSections, setStaticSections] = useState<{
    pathname: string;
    sections: HelpSection[];
  }>({ pathname: "", sections: [] });
  const [dynamicSections, setDynamicSections] = useState<HelpSection[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [dynamicPathname, setDynamicPathname] = useState(currentPath);

  if (dynamicPathname !== currentPath) {
    setDynamicPathname(currentPath);
    setDynamicSections([]);
  }

  const openPanel = useCallback((sectionId?: string) => {
    setIsOpen(true);
    if (sectionId) setActiveSection(sectionId);
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
    setActiveSection(null);
  }, []);

  const setHelpSections = useCallback(
    (newSections: HelpSection[]) => {
      setStaticSections({ pathname: currentPath, sections: newSections });
    },
    [currentPath],
  );

  const registerSection = useCallback((section: HelpSection) => {
    setDynamicSections((prev) => {
      const idx = prev.findIndex((s) => s.id === section.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = section;
        return next;
      }
      return [...prev, section];
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      isOpen,
      sections: [
        ...(staticSections.pathname === currentPath
          ? staticSections.sections
          : []),
        ...dynamicSections,
      ],
      activeSection,
      openPanel,
      closePanel,
      setHelpSections,
      registerSection,
    }),
    [
      isOpen,
      staticSections,
      currentPath,
      dynamicSections,
      activeSection,
      openPanel,
      closePanel,
      setHelpSections,
      registerSection,
    ],
  );

  return (
    <HelpPanelContext.Provider value={contextValue}>
      {children}
    </HelpPanelContext.Provider>
  );
}
