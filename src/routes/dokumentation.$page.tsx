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
import { DocumentationPrinciple } from "@/routes/dokumentation._documentationNavigation.$principleId.tsx";
import { DocumentationPrincipleErlaeuterung } from "@/routes/dokumentation._documentationNavigation.$principleId_.erlaeuterung.tsx";
import { DocumentationSend } from "@/routes/dokumentation._documentationNavigation.absenden.tsx";
import { DocumentationParticipation } from "@/routes/dokumentation._documentationNavigation.beteiligungsformate.tsx";
import { DocumentationInteroperabilityAssessmentOrganizational } from "@/routes/dokumentation._documentationNavigation.bewertung-organisatorisch.tsx";
import { DocumentationInteroperabilityAssessmentLegal } from "@/routes/dokumentation._documentationNavigation.bewertung-rechtlich.tsx";
import { DocumentationInteroperabilityAssessmentSemantic } from "@/routes/dokumentation._documentationNavigation.bewertung-semantisch.tsx";
import { DocumentationInteroperabilityAssessmentTechnical } from "@/routes/dokumentation._documentationNavigation.bewertung-technisch.tsx";
import { DocumentationEuInteroperabilityRequirements } from "@/routes/dokumentation._documentationNavigation.eu-interoperabilitaetsbezug.tsx";
import { DocumentationHinweise } from "@/routes/dokumentation._documentationNavigation.hinweise.tsx";
import { DocumentationTitle } from "@/routes/dokumentation._documentationNavigation.regelungsvorhaben-titel.tsx";
import { DocumentationBindingRequirements } from "@/routes/dokumentation._documentationNavigation.verbindliche-anforderungen.tsx";
import { DocumentationVeroeffentlichung } from "@/routes/dokumentation._documentationNavigation.veroeffentlichung.tsx";
import { DocumentationSummary } from "@/routes/dokumentation._documentationNavigation.zusammenfassung.tsx";
import type { PrinzipWithAspekteAndExample } from "@/utils/strapiData.types";
import type { ComponentType } from "react";

const staticRoutes: Record<string, ComponentType> = {
  [dokumentation_hinweise.path]: DocumentationHinweise,
  [dokumentation_regelungsvorhabenTitel.path]: DocumentationTitle,
  [dokumentation_beteiligungsformate.path]: DocumentationParticipation,
  // "Prinzipien" steps handled dynamically below
  [dokumentation_euInteroperabilitaetsbezug.path]:
    DocumentationEuInteroperabilityRequirements,
  [dokumentation_verbindlicheAnforderungen.path]:
    DocumentationBindingRequirements,
  [dokumentation_bewertungRechtlich.path]:
    DocumentationInteroperabilityAssessmentLegal,
  [dokumentation_bewertungOrganisatorisch.path]:
    DocumentationInteroperabilityAssessmentOrganizational,
  [dokumentation_bewertungSemantisch.path]:
    DocumentationInteroperabilityAssessmentSemantic,
  [dokumentation_bewertungTechnisch.path]:
    DocumentationInteroperabilityAssessmentTechnical,
  [dokumentation_veroeffentlichung.path]: DocumentationVeroeffentlichung,
  [dokumentation_zusammenfassung.path]: DocumentationSummary,
  [dokumentation_absenden.path]: DocumentationSend,
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
  const StaticComponent = staticRoutes[path];

  const PrincipleComponent = isErlaeuterung
    ? DocumentationPrincipleErlaeuterung
    : DocumentationPrinciple;

  return (
    <DocumentationPageShell prinzips={prinzips} currentUrl={path}>
      {StaticComponent && <StaticComponent />}
      {principleId && <PrincipleComponent principleId={principleId} />}
    </DocumentationPageShell>
  );
}
