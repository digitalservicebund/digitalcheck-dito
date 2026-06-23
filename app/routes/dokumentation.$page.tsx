import { DocumentationPageShell } from "@/components/DocumentationPageShell.tsx";
import {
  dokumentation_absenden,
  dokumentation_beteiligungsformate,
  dokumentation_bewertungOrganisatorisch,
  dokumentation_bewertungRechtlich,
  dokumentation_bewertungSemantisch,
  dokumentation_bewertungTechnisch,
  dokumentation_euInteroperabilitaetsbezug,
  dokumentation_hinweise,
  dokumentation_regelungsvorhabenTitel,
  dokumentation_verbindlicheAnforderungen,
  dokumentation_veroeffentlichung,
  dokumentation_zusammenfassung,
} from "@/config/routes.ts";
import { DocumentationPrinciple } from "~/routes/dokumentation._documentationNavigation.$principleId.tsx";
import { DocumentationPrincipleErlaeuterung } from "~/routes/dokumentation._documentationNavigation.$principleId_.erlaeuterung.tsx";
import { DocumentationSend } from "~/routes/dokumentation._documentationNavigation.absenden.tsx";
import { DocumentationParticipation } from "~/routes/dokumentation._documentationNavigation.beteiligungsformate.tsx";
import { DocumentationInteroperabilityAssessmentOrganizational } from "~/routes/dokumentation._documentationNavigation.bewertung-organisatorisch.tsx";
import { DocumentationInteroperabilityAssessmentLegal } from "~/routes/dokumentation._documentationNavigation.bewertung-rechtlich.tsx";
import { DocumentationInteroperabilityAssessmentSemantic } from "~/routes/dokumentation._documentationNavigation.bewertung-semantisch.tsx";
import { DocumentationInteroperabilityAssessmentTechnical } from "~/routes/dokumentation._documentationNavigation.bewertung-technisch.tsx";
import { DocumentationEuInteroperabilityRequirements } from "~/routes/dokumentation._documentationNavigation.eu-interoperabilitaetsbezug.tsx";
import { DocumentationHinweise } from "~/routes/dokumentation._documentationNavigation.hinweise.tsx";
import { DocumentationTitle } from "~/routes/dokumentation._documentationNavigation.regelungsvorhaben-titel.tsx";
import { DocumentationBindingRequirements } from "~/routes/dokumentation._documentationNavigation.verbindliche-anforderungen.tsx";
import { DocumentationVeroeffentlichung } from "~/routes/dokumentation._documentationNavigation.veroeffentlichung.tsx";
import { DocumentationSummary } from "~/routes/dokumentation._documentationNavigation.zusammenfassung.tsx";
import type { PrinzipWithAspekteAndExample } from "~/utils/strapiData.types";

const staticRoutes = {
  [dokumentation_hinweise.path]: {
    Component: DocumentationHinweise,
  },
  [dokumentation_regelungsvorhabenTitel.path]: {
    Component: DocumentationTitle,
  },
  [dokumentation_beteiligungsformate.path]: {
    Component: DocumentationParticipation,
  },
  // "Prinzipien" steps handled dynamically below
  [dokumentation_euInteroperabilitaetsbezug.path]: {
    Component: DocumentationEuInteroperabilityRequirements,
  },
  [dokumentation_verbindlicheAnforderungen.path]: {
    Component: DocumentationBindingRequirements,
  },
  [dokumentation_bewertungRechtlich.path]: {
    Component: DocumentationInteroperabilityAssessmentLegal,
  },
  [dokumentation_bewertungOrganisatorisch.path]: {
    Component: DocumentationInteroperabilityAssessmentOrganizational,
  },
  [dokumentation_bewertungSemantisch.path]: {
    Component: DocumentationInteroperabilityAssessmentSemantic,
  },
  [dokumentation_bewertungTechnisch.path]: {
    Component: DocumentationInteroperabilityAssessmentTechnical,
  },
  [dokumentation_veroeffentlichung.path]: {
    Component: DocumentationVeroeffentlichung,
  },
  [dokumentation_zusammenfassung.path]: {
    Component: DocumentationSummary,
  },
  [dokumentation_absenden.path]: {
    Component: DocumentationSend,
  },
};

export type DocumentationRouterProps = {
  prinzips: PrinzipWithAspekteAndExample[];
  path: string;
  principleId?: string;
  isErlaeuterung?: boolean;
};

export function DocumentationRouter({
  path,
  prinzips,
  principleId,
  isErlaeuterung = false,
}: Readonly<DocumentationRouterProps>) {
  const RouteComponent =
    staticRoutes[path as keyof typeof staticRoutes]?.Component;

  const renderContent = () => {
    if (RouteComponent) {
      return <RouteComponent />;
    }
    if (!principleId) return null;

    return isErlaeuterung ? (
      <DocumentationPrincipleErlaeuterung principleId={principleId} />
    ) : (
      <DocumentationPrinciple principleId={principleId} />
    );
  };

  return (
    <DocumentationPageShell prinzips={prinzips} currentUrl={path}>
      {renderContent()}
    </DocumentationPageShell>
  );
}
