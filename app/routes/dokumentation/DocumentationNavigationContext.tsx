"use client";
import { createContext, useContext } from "react";
import type { PrinzipWithAspekteAndExample } from "~/utils/strapiData.types";

type Route = { path: string; title: string; principleId?: string };

export type DocumentationNavigationContextType = {
  currentUrl: string;
  navigationBaseUrl: string;
  nextUrl: string;
  previousUrl: string;
  routes: (Route | Route[])[];
  prinzips: PrinzipWithAspekteAndExample[];
};

export const DocumentationNavigationContext =
  createContext<DocumentationNavigationContextType | null>(null);

export function useDocumentationNavigation(): DocumentationNavigationContextType {
  const ctx = useContext(DocumentationNavigationContext);
  if (!ctx) {
    throw new Error(
      "useDocumentationNavigation must be used within a DocumentationNavigationContext provider",
    );
  }
  return ctx;
}
