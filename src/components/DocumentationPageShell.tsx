"use client";

import type { ReactNode } from "react";
import { LayoutWithDocumentationNavigation } from "~/routes/dokumentation._documentationNavigation";
import { DocumentationDataProvider } from "~/routes/dokumentation/DocumentationDataProvider";
import type { PrinzipWithAspekte } from "~/utils/strapiData.types";

export function DocumentationPageShell({
  prinzips,
  currentUrl,
  children,
}: Readonly<{
  prinzips: PrinzipWithAspekte[];
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
