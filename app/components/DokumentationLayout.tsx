// TODO: Compatibility layer for the React Router -> Astro migration.
// Should become obsolete once the migration is complete and all routes are proper Astro pages.
"use client";
import {
  dokumentation,
  dokumentation_absenden,
  dokumentation_beteiligungsformate,
  dokumentation_hinweise,
  dokumentation_regelungsvorhabenTitel,
  dokumentation_zusammenfassung,
} from "@/config/routes";
import LayoutWithDocumentationNavigation from "~/routes/dokumentation._documentationNavigation";
import PrinciplePage from "~/routes/dokumentation._documentationNavigation.$principleId";
import ErlaeuterungPage from "~/routes/dokumentation._documentationNavigation.$principleId_.erlaeuterung";
import AbsendenPage from "~/routes/dokumentation._documentationNavigation.absenden";
import BeteiligungsformatePage from "~/routes/dokumentation._documentationNavigation.beteiligungsformate";
import HinweisePage from "~/routes/dokumentation._documentationNavigation.hinweise";
import TitelPage from "~/routes/dokumentation._documentationNavigation.regelungsvorhaben-titel";
import ZusammenfassungPage from "~/routes/dokumentation._documentationNavigation.zusammenfassung";
import { DocumentationDataProvider } from "~/routes/dokumentation/DocumentationDataProvider";
import type { PrinzipWithAspekteAndExample } from "~/utils/strapiData.types";

type Route = { url: string; title: string; principleId?: string };

const ROUTES_DOCUMENTATION_INTRO: Route[] = [
  { url: dokumentation_hinweise.path, title: dokumentation_hinweise.title },
  { url: dokumentation_regelungsvorhabenTitel.path, title: dokumentation_regelungsvorhabenTitel.title },
  { url: dokumentation_beteiligungsformate.path, title: dokumentation_beteiligungsformate.title },
];

const ROUTES_DOCUMENTATION_FINALIZE: Route[] = [
  { url: dokumentation_zusammenfassung.path, title: dokumentation_zusammenfassung.title },
  { url: dokumentation_absenden.path, title: dokumentation_absenden.title },
];

const pages = {
  hinweise: HinweisePage,
  "regelungsvorhaben-titel": TitelPage,
  beteiligungsformate: BeteiligungsformatePage,
  zusammenfassung: ZusammenfassungPage,
  absenden: AbsendenPage,
  principle: PrinciplePage,
  erlaeuterung: ErlaeuterungPage,
} satisfies Record<string, React.ComponentType>;

export type DokumentationPage = keyof typeof pages;

type DokumentationLayoutProps = {
  prinzips: PrinzipWithAspekteAndExample[];
  page: DokumentationPage;
};

export default function DokumentationLayout({
  prinzips,
  page,
}: DokumentationLayoutProps) {
  const routes: (Route | Route[])[] = [
    ...ROUTES_DOCUMENTATION_INTRO,
    prinzips.map<Route>(({ Name, URLBezeichnung, documentId }) => ({
      title: Name,
      url: `${dokumentation.path}/${URLBezeichnung}`,
      principleId: documentId,
    })),
    ...ROUTES_DOCUMENTATION_FINALIZE,
  ];

  const Page = pages[page];

  return (
    <DocumentationDataProvider>
      <LayoutWithDocumentationNavigation routes={routes} prinzips={prinzips}>
        <Page />
      </LayoutWithDocumentationNavigation>
    </DocumentationDataProvider>
  );
}
