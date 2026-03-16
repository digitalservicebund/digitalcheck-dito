import { createContext, useContext, useState } from "react";

export type HelpSection = { id: string; title: string; content: string };

type HelpPanelContextType = {
  isOpen: boolean;
  sections: HelpSection[];
  activeSection: string | null;
  openPanel: (sectionId?: string) => void;
  closePanel: () => void;
  setHelpSections: (sections: HelpSection[]) => void;
};

const HelpPanelContext = createContext<HelpPanelContextType>({
  isOpen: false,
  sections: [],
  activeSection: null,
  openPanel: () => {},
  closePanel: () => {},
  setHelpSections: () => {},
});

export function HelpPanelProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [sections, setSections] = useState<HelpSection[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const openPanel = (sectionId?: string) => {
    setIsOpen(true);
    if (sectionId) setActiveSection(sectionId);
  };

  const closePanel = () => {
    setIsOpen(false);
    setActiveSection(null);
  };

  const setHelpSections = (newSections: HelpSection[]) => {
    setSections(newSections);
  };

  return (
    <HelpPanelContext.Provider
      value={{
        isOpen,
        sections,
        activeSection,
        openPanel,
        closePanel,
        setHelpSections,
      }}
    >
      {children}
    </HelpPanelContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useHelpPanel() {
  return useContext(HelpPanelContext);
}
