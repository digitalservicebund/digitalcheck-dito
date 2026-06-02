"use client";
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
import type {
  Route,
  RouteGroup,
} from "~/routes/dokumentation/DocumentationNavigationContext";
import type { PrinzipWithAspekteAndExample } from "~/utils/strapiData.types";

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
): (Route | RouteGroup)[] {
  return [
    ...ROUTES_DOCUMENTATION_INTRO,
    {
      title: "Prinzipien",
      routes: prinzips.map<Route>(({ Name, URLBezeichnung, documentId }) => ({
        title: Name,
        path: `${dokumentation.path}/${URLBezeichnung}`,
        principleId: documentId,
      })),
    },
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
