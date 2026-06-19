import { DocumentationPageShell } from "@/components/DocumentationPageShell.tsx";
import {
  dokumentation_beteiligungsformate,
  dokumentation_hinweise,
  dokumentation_regelungsvorhabenTitel,
} from "@/config/routes.ts";
import { useMemo } from "react";
import { DocumentationParticipation } from "~/routes/dokumentation._documentationNavigation.beteiligungsformate.tsx";
import { DocumentationHinweise } from "~/routes/dokumentation._documentationNavigation.hinweise.tsx";
import { DocumentationTitle } from "~/routes/dokumentation._documentationNavigation.regelungsvorhaben-titel.tsx";
import type { PrinzipWithAspekteAndExample } from "~/utils/strapiData.types";

const routes = {
  [dokumentation_hinweise.path]: {
    Component: DocumentationHinweise,
  },
  [dokumentation_regelungsvorhabenTitel.path]: {
    Component: DocumentationTitle,
  },
  [dokumentation_beteiligungsformate.path]: {
    Component: DocumentationParticipation,
  },
};

// Astro page export

export function DocumentationRouter({
  path,
  prinzips,
}: Readonly<{
  path: keyof typeof routes;
  prinzips: PrinzipWithAspekteAndExample[];
}>) {
  const route = routes[path];
  const { Component } = route;

  const random = useMemo(() => (Math.random() * 10000).toFixed(0), []);

  return (
    <DocumentationPageShell prinzips={prinzips} currentUrl={path}>
      <div>Random {random}</div>
      <Component />
    </DocumentationPageShell>
  );
}
