import { createContext, useContext } from "react";
import type { NavigationContext } from "~/routes/dokumentation._documentationNavigation";

export const DocumentationNavigationContext =
  createContext<NavigationContext | null>(null);

export function useNavigationContext(): NavigationContext {
  const ctx = useContext(DocumentationNavigationContext);
  if (!ctx) throw new Error("Must be used within DokumentationApp");
  return ctx;
}
