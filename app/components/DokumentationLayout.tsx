"use client";
import type { Route as _Route } from "~/resources/staticRoutes";
import { dokumentation } from "@/config/routes";
import { ROUTES_DOCUMENTATION_FINALIZE, ROUTES_DOCUMENTATION_INTRO } from "~/resources/staticRoutes";
import LayoutWithDocumentationNavigation from "~/routes/dokumentation._documentationNavigation";
import AbsendenPage from "~/routes/dokumentation._documentationNavigation.absenden";
import BeteiligungsformatePage from "~/routes/dokumentation._documentationNavigation.beteiligungsformate";
import HinweisePage from "~/routes/dokumentation._documentationNavigation.hinweise";
import TitelPage from "~/routes/dokumentation._documentationNavigation.regelungsvorhaben-titel";
import ErlaeuterungPage from "~/routes/dokumentation._documentationNavigation.$principleId_.erlaeuterung";
import PrinciplePage from "~/routes/dokumentation._documentationNavigation.$principleId";
import ZusammenfassungPage from "~/routes/dokumentation._documentationNavigation.zusammenfassung";
import { DocumentationDataProvider } from "~/routes/dokumentation/DocumentationDataProvider";
import type { PrinzipWithAspekteAndExample } from "~/utils/strapiData.types";

type Route = _Route & { principleId?: string };

export type DokumentationPage =
  | "hinweise"
  | "regelungsvorhaben-titel"
  | "beteiligungsformate"
  | "zusammenfassung"
  | "absenden"
  | "principle"
  | "erlaeuterung";

const pages: Record<DokumentationPage, React.ComponentType> = {
  hinweise: HinweisePage,
  "regelungsvorhaben-titel": TitelPage,
  beteiligungsformate: BeteiligungsformatePage,
  zusammenfassung: ZusammenfassungPage,
  absenden: AbsendenPage,
  principle: PrinciplePage,
  erlaeuterung: ErlaeuterungPage,
};

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
