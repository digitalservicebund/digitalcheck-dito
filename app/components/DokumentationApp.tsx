"use client";
import {
  type Route as _Route,
  ROUTE_DOCUMENTATION,
  ROUTES_DOCUMENTATION_FINALIZE,
  ROUTES_DOCUMENTATION_INTRO,
} from "~/resources/staticRoutes";
import LayoutWithDocumentationNavigation from "~/routes/dokumentation._documentationNavigation";
import PrinciplePage from "~/routes/dokumentation._documentationNavigation.$principleId";
import ErlaeuterungPage from "~/routes/dokumentation._documentationNavigation.$principleId_.erlaeuterung";
import AbsendenPage from "~/routes/dokumentation._documentationNavigation.absenden";
import BeteiligungsformatePage from "~/routes/dokumentation._documentationNavigation.beteiligungsformate";
import HinweisePage from "~/routes/dokumentation._documentationNavigation.hinweise";
import TitelPage from "~/routes/dokumentation._documentationNavigation.regelungsvorhaben-titel";
import ZusammenfassungPage from "~/routes/dokumentation._documentationNavigation.zusammenfassung";
import { DocumentationDataProvider } from "~/routes/dokumentation/DocumentationDataProvider";
import type { PrinzipWithAspekteAndExample } from "~/utils/strapiData.server";

type Route = _Route & { principleId?: string };

const getUrlForSlug = (slug: string) => `${ROUTE_DOCUMENTATION.url}/${slug}`;

type DokumentationAppProps = {
  prinzips: PrinzipWithAspekteAndExample[];
};

export default function DokumentationApp({ prinzips }: DokumentationAppProps) {
  const routes: (Route | Route[])[] = [
    ...ROUTES_DOCUMENTATION_INTRO,
    prinzips.map<Route>(({ Name, URLBezeichnung, documentId }) => ({
      title: Name,
      url: getUrlForSlug(URLBezeichnung),
      principleId: documentId,
    })),
    ...ROUTES_DOCUMENTATION_FINALIZE,
  ];

  const path = typeof window !== "undefined" ? window.location.pathname : "/";

  function renderCurrentPage() {
    if (path.endsWith("/hinweise")) return <HinweisePage />;
    if (path.endsWith("/regelungsvorhaben-titel")) return <TitelPage />;
    if (path.endsWith("/beteiligungsformate"))
      return <BeteiligungsformatePage />;
    if (path.endsWith("/zusammenfassung")) return <ZusammenfassungPage />;
    if (path.endsWith("/absenden")) return <AbsendenPage />;
    if (path.endsWith("/erlaeuterung")) return <ErlaeuterungPage />;
    return <PrinciplePage />;
  }

  return (
    <DocumentationDataProvider>
      <LayoutWithDocumentationNavigation routes={routes} prinzips={prinzips}>
        {renderCurrentPage()}
      </LayoutWithDocumentationNavigation>
    </DocumentationDataProvider>
  );
}
