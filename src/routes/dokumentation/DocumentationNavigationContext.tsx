"use client";
import type { PrinzipWithAspekte } from "@/utils/strapiData.types";
import { createContext, useContext } from "react";

export type Route = { path: string; title: string; principleId?: string };

export type RouteGroup = {
  title: string;
  routes: Route[];
};

export type DocumentationNavigationContextType = {
  currentUrl: string;
  navigationBaseUrl: string;
  nextUrl: string;
  previousUrl: string;
  routes: (Route | RouteGroup)[];
  prinzips: PrinzipWithAspekte[];
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
