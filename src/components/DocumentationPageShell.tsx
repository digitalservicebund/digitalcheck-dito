"use client";

import type { Prinzip } from "@/content.config";
import { LayoutWithDocumentationNavigation } from "@/routes/dokumentation._documentationNavigation";
import { DocumentationDataProvider } from "@/routes/dokumentation/DocumentationDataProvider";
import type { ReactNode } from "react";

export function DocumentationPageShell({
  prinzips,
  currentUrl,
  children,
}: Readonly<{
  prinzips: Prinzip[];
  currentUrl: string;
  children: ReactNode;
}>) {
  return (
    <DocumentationDataProvider>
      <LayoutWithDocumentationNavigation
        prinzips={prinzips}
        currentUrl={currentUrl}
      >
        {children}
      </LayoutWithDocumentationNavigation>
    </DocumentationDataProvider>
  );
}
