import { DocumentationPageShell } from "@/components/DocumentationPageShell.tsx";
import {
  dokumentation_beteiligungsformate,
  dokumentation_hinweise,
  dokumentation_regelungsvorhabenTitel,
} from "@/config/routes.ts";
import { useMemo } from "react";
import { DocumentationPrinciple } from "~/routes/dokumentation._documentationNavigation.$principleId.tsx";
import { DocumentationPrincipleErlaeuterung } from "~/routes/dokumentation._documentationNavigation.$principleId_.erlaeuterung.tsx";
import { DocumentationParticipation } from "~/routes/dokumentation._documentationNavigation.beteiligungsformate.tsx";
import { DocumentationHinweise } from "~/routes/dokumentation._documentationNavigation.hinweise.tsx";
import { DocumentationTitle } from "~/routes/dokumentation._documentationNavigation.regelungsvorhaben-titel.tsx";
import type { PrinzipWithAspekteAndExample } from "~/utils/strapiData.types";

const fixedRoutes = {
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

type DocumentationRouterProps = {
  prinzips: PrinzipWithAspekteAndExample[];
  path: keyof typeof fixedRoutes | string;
  principleId?: string;
  erlauterung?: boolean;
};

export function DocumentationRouter({
  path,
  prinzips,
  principleId,
  erlauterung = false,
}: Readonly<DocumentationRouterProps>) {
  let Component: (() => React.JSX.Element) | null = null;
  const random = useMemo(() => (Math.random() * 10000).toFixed(0), []);

  const route = fixedRoutes[path as keyof typeof fixedRoutes];
  if (route) {
    Component = route.Component;
  }

  return (
    <DocumentationPageShell prinzips={prinzips} currentUrl={path}>
      <div>Random {random}</div>
      {Component && <Component />}
      {principleId &&
        (erlauterung ? (
          <DocumentationPrincipleErlaeuterung principleId={principleId} />
        ) : (
          <DocumentationPrinciple principleId={principleId} />
        ))}
    </DocumentationPageShell>
  );
}
