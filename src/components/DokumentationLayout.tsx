// TODO: Compatibility layer for the React Router -> Astro migration.
// Should become obsolete once the migration is complete and all routes are proper Astro pages.
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
import { LayoutWithDocumentationNavigation } from "~/routes/dokumentation._documentationNavigation";
import { DocumentationPrinciple } from "~/routes/dokumentation._documentationNavigation.$principleId";
import { DocumentationPrincipleErlaeuterung } from "~/routes/dokumentation._documentationNavigation.$principleId_.erlaeuterung";
import { DocumentationSend } from "~/routes/dokumentation._documentationNavigation.absenden";
import { DocumentationParticipation } from "~/routes/dokumentation._documentationNavigation.beteiligungsformate";
import { DocumentationHinweise } from "~/routes/dokumentation._documentationNavigation.hinweise";
import { DocumentationTitle } from "~/routes/dokumentation._documentationNavigation.regelungsvorhaben-titel";
import { DocumentationSummary } from "~/routes/dokumentation._documentationNavigation.zusammenfassung";
import { DokumentationIndexPage } from "~/routes/dokumentation._index";
import {
  DocumentationDataProvider,
  useDocumentationDataService,
} from "~/routes/dokumentation/DocumentationDataProvider";
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

export function buildDocumentationRoutes(
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

// Pure URL-computation helpers — mirrors the logic in LayoutWithDocumentationNavigation.
function findIndexForRoute(routes: Route[], currentUrl: string) {
  return routes.findIndex((route) => route.path === currentUrl);
}

function getPreviousUrl(routes: Route[], currentUrl: string): string {
  const i = findIndexForRoute(routes, currentUrl);
  return i > 0 ? routes[i - 1].path : dokumentation.path;
}

function getNextUrl(routes: Route[], currentUrl: string): string | null {
  const i = findIndexForRoute(routes, currentUrl);
  return i !== -1 && i < routes.length - 1 ? routes[i + 1].path : null;
}

function resolveAdjacentUrl(
  flatRoutes: Route[],
  fromUrl: string,
  getAdjacent: (routes: Route[], path: string) => string | null,
  findData: (id: string) => unknown,
): string | null {
  const rawUrl = getAdjacent(flatRoutes, fromUrl);
  if (!rawUrl) return rawUrl;
  const route = flatRoutes.find((r) => r.path === rawUrl);
  if (route?.principleId) {
    const data = findData(route.principleId) as { answer?: string } | undefined;
    if (data?.answer) return `${rawUrl}/erlaeuterung`;
  }
  return rawUrl;
}

export type DokumentationPage =
  | "hinweise"
  | "regelungsvorhaben-titel"
  | "beteiligungsformate"
  | "zusammenfassung"
  | "absenden"
  | "principle"
  | "erlaeuterung";

type DokumentationLayoutProps = {
  prinzips: PrinzipWithAspekteAndExample[];
  page: DokumentationPage;
  currentUrl: string;
};

function DokumentationLayoutInner({
  routes,
  prinzips,
  page,
  currentUrl,
}: {
  routes: (Route | Route[])[];
  prinzips: PrinzipWithAspekteAndExample[];
  page: DokumentationPage;
  currentUrl: string;
}) {
  const { findDocumentationDataForUrl } = useDocumentationDataService();

  const isErlaeuterungPage = currentUrl.endsWith("/erlaeuterung");
  const navigationCurrentUrl = isErlaeuterungPage
    ? currentUrl.replace("/erlaeuterung", "")
    : currentUrl;

  const flatRoutes = routes.flat();
  const currentRoute = flatRoutes.find((r) => r.path === navigationCurrentUrl);
  const currentPrincipleFormData = currentRoute?.principleId
    ? findDocumentationDataForUrl(currentRoute.principleId)
    : undefined;

  const nextUrl = isErlaeuterungPage
    ? resolveAdjacentUrl(
        flatRoutes,
        navigationCurrentUrl,
        getNextUrl,
        findDocumentationDataForUrl,
      )
    : currentRoute?.principleId &&
        (currentPrincipleFormData as { answer?: string } | undefined)?.answer
      ? `${currentUrl}/erlaeuterung`
      : resolveAdjacentUrl(
          flatRoutes,
          currentUrl,
          getNextUrl,
          findDocumentationDataForUrl,
        );

  const previousUrl =
    resolveAdjacentUrl(
      flatRoutes,
      navigationCurrentUrl,
      getPreviousUrl,
      findDocumentationDataForUrl,
    ) ?? dokumentation.path;

  // For principle/erlaeuterung pages, the last non-erlaeuterung URL segment is the principleId.
  const principleId = navigationCurrentUrl.split("/").at(-1) ?? "";

  const pageContent = (() => {
    switch (page) {
      case "hinweise":
        return (
          <DocumentationHinweise
            nextUrl={nextUrl ?? ""}
            previousUrl={previousUrl}
          />
        );
      case "regelungsvorhaben-titel":
        return (
          <DocumentationTitle
            currentUrl={currentUrl}
            nextUrl={nextUrl ?? ""}
            previousUrl={previousUrl}
            prinzips={prinzips}
          />
        );
      case "beteiligungsformate":
        return (
          <DocumentationParticipation
            currentUrl={currentUrl}
            nextUrl={nextUrl ?? ""}
            previousUrl={previousUrl}
            prinzips={prinzips}
          />
        );
      case "zusammenfassung":
        return (
          <DocumentationSummary
            routes={routes}
            nextUrl={nextUrl ?? ""}
            previousUrl={previousUrl}
            prinzips={prinzips}
          />
        );
      case "absenden":
        return <DocumentationSend prinzips={prinzips} />;
      case "principle":
        return (
          <DocumentationPrinciple
            principleId={principleId}
            currentUrl={currentUrl}
            nextUrl={nextUrl ?? ""}
            previousUrl={previousUrl}
            prinzips={prinzips}
          />
        );
      case "erlaeuterung":
        return (
          <DocumentationPrincipleErlaeuterung
            principleId={principleId}
            currentUrl={currentUrl}
            nextUrl={nextUrl ?? ""}
            previousUrl={previousUrl}
            prinzips={prinzips}
          />
        );
    }
  })();

  return (
    <LayoutWithDocumentationNavigation
      routes={routes}
      prinzips={prinzips}
      currentUrl={currentUrl}
    >
      {pageContent}
    </LayoutWithDocumentationNavigation>
  );
}

export default function DokumentationLayout({
  prinzips,
  page,
  currentUrl,
}: DokumentationLayoutProps) {
  const routes = buildDocumentationRoutes(prinzips);
  return (
    <DocumentationDataProvider>
      <DokumentationLayoutInner
        routes={routes}
        prinzips={prinzips}
        page={page}
        currentUrl={currentUrl}
      />
    </DocumentationDataProvider>
  );
}

export function DokumentationIndexPageWithProvider({
  prinzips,
}: {
  prinzips: PrinzipWithAspekteAndExample[];
}) {
  return (
    <DocumentationDataProvider>
      <DokumentationIndexPage prinzips={prinzips} />
    </DocumentationDataProvider>
  );
}
