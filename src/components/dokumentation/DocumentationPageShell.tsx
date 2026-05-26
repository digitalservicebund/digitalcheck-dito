"use client";
import type { Route as _Route } from "@/config/routes";
import {
  dokumentation,
  dokumentation_absenden,
  dokumentation_beteiligungsformate,
  dokumentation_hinweise,
  dokumentation_regelungsvorhabenTitel,
  dokumentation_zusammenfassung,
} from "@/config/routes";
import type { ReactNode } from "react";
import { LayoutWithDocumentationNavigation } from "~/routes/dokumentation._documentationNavigation";
import { DocumentationDataProvider } from "~/routes/dokumentation/DocumentationDataProvider";
import type { PrinzipWithAspekteAndExample } from "~/utils/strapiData.types";

type Route = _Route & { principleId?: string };

const ROUTES_DOCUMENTATION_INTRO: Route[] = [
  dokumentation_hinweise,
  dokumentation_regelungsvorhabenTitel,
  dokumentation_beteiligungsformate,
];

const ROUTES_DOCUMENTATION_FINALIZE: Route[] = [
  dokumentation_zusammenfassung,
  dokumentation_absenden,
];

function buildDocumentationRoutes(
  prinzips: Pick<
    PrinzipWithAspekteAndExample,
    "Name" | "URLBezeichnung" | "documentId"
  >[],
): (Route | Route[])[] {
  return [
    ...ROUTES_DOCUMENTATION_INTRO,
    prinzips.map<Route>(({ Name, URLBezeichnung, documentId }) => ({
      title: Name,
      path: `${dokumentation.path}/${URLBezeichnung}`,
      principleId: documentId,
      key: `${documentId}`,
      parent: null,
      sitemap: false,
      isStagingOnly: false,
      navOrder: null,
      navLabel: null,
    })),
    ...ROUTES_DOCUMENTATION_FINALIZE,
  ];
}

export function DocumentationPageShell({
  prinzips,
  currentUrl,
  children,
}: Readonly<{
  prinzips: PrinzipWithAspekteAndExample[];
  currentUrl: string;
  children: ReactNode;
}>) {
  const routes = buildDocumentationRoutes(prinzips);
  return (
    <DocumentationDataProvider>
      <LayoutWithDocumentationNavigation
        routes={routes}
        prinzips={prinzips}
        currentUrl={currentUrl}
      >
        {children}
      </LayoutWithDocumentationNavigation>
    </DocumentationDataProvider>
  );
}
