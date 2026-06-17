import {
  dokumentation,
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
  dokumentation_zusammenfassung,
} from "@/config/routes";
import { type ReactNode, useCallback, useMemo } from "react";
import { twJoin } from "tailwind-merge";
import HelpSidepanel from "~/components/HelpSidepanel";
import Nav from "~/components/Nav";
import Stepper from "~/components/Stepper";
import { HelpPanelProvider } from "~/contexts/HelpPanelContext";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import type { PrinzipWithAspekte } from "~/utils/strapiData.types";
import {
  useDocumentationDataService,
  ValidationResult,
} from "./dokumentation/DocumentationDataProvider";
import type {
  Route,
  RouteGroup,
} from "./dokumentation/DocumentationNavigationContext";
import { DocumentationNavigationContext } from "./dokumentation/DocumentationNavigationContext";

function getPreviousUrl(routes: Route[], currentUrl: string): string | null {
  const index = routes.findIndex((route) => route.path === currentUrl);
  if (index === -1) return null;
  return index > 0 ? routes[index - 1].path : dokumentation.path;
}

function getNextUrl(routes: Route[], currentUrl: string): string | null {
  const index = routes.findIndex((route) => route.path === currentUrl);
  if (index === -1) return null;
  return index < routes.length - 1 ? routes[index + 1].path : null;
}

function resolveAdjacentUrl(
  flatRoutes: Route[],
  fromUrl: string,
  getAdjacent: (routes: Route[], path: string) => string | null,
  findData: (id: string) => unknown,
  isDisabled: (route: Route) => boolean, // <-- new parameter
): string | null {
  let currentFrom = fromUrl;

  // Loop until we find a non-disabled route or run out
  while (true) {
    const rawUrl = getAdjacent(flatRoutes, currentFrom);
    if (!rawUrl) return rawUrl; // end of list

    const route = flatRoutes.find((r) => r.path === rawUrl);

    // Skip disabled routes
    if (route && isDisabled(route)) {
      currentFrom = rawUrl; // advance past the disabled route and try again
      continue;
    }

    if (route?.principleId) {
      const data = findData(route.principleId) as
        | { answer?: string }
        | undefined;
      if (data?.answer) return `${rawUrl}/erlaeuterung`;
    }
    return rawUrl;
  }
}

export function LayoutWithDocumentationNavigation({
  prinzips,
  children,
  currentUrl,
}: Readonly<{
  prinzips: PrinzipWithAspekte[];
  children?: ReactNode;
  currentUrl: string;
}>) {
  const ROUTES_DOCUMENTATION_INTRO: Route[] = [
    dokumentation_hinweise,
    dokumentation_regelungsvorhabenTitel,
    dokumentation_beteiligungsformate,
  ];

  const ROUTES_DOCUMENTATION_FINALIZE: Route[] = [
    dokumentation_zusammenfassung,
    dokumentation_absenden,
  ];

  const { findDocumentationDataForUrl, validateDocumentationDataForRoute } =
    useDocumentationDataService();

  const routes: (Route | RouteGroup)[] = [
    ...ROUTES_DOCUMENTATION_INTRO,
    {
      title: "Prinzipien",
      routes: prinzips.map<Route>(({ Name, URLBezeichnung, documentId }) => ({
        title: Name,
        path: `${dokumentation.path}/${URLBezeichnung}`,
        principleId: documentId,
      })),
    },
    {
      title: "EU-Interoperabilität",
      routes: [
        dokumentation_euInteroperabilitaetsbezug,
        dokumentation_verbindlicheAnforderungen,
        dokumentation_bewertungRechtlich,
        dokumentation_bewertungOrganisatorisch,
        dokumentation_bewertungSemantisch,
        dokumentation_bewertungTechnisch,
      ],
    },
    ...ROUTES_DOCUMENTATION_FINALIZE,
  ];

  // exclude documentation notes
  const displayedRoutes = useMemo(
    () =>
      routes.filter((route) => {
        if ("routes" in route) return true; // RouteGroup
        return route.path !== dokumentation_hinweise.path;
      }),
    [routes],
  );

  // Detect erlaeuterung sub-page
  const isErlaeuterungPage = currentUrl.endsWith("/erlaeuterung");
  // For nav/stepper index lookups, use principle URL when on erlaeuterung page
  const navigationBaseUrl = isErlaeuterungPage
    ? currentUrl.replace("/erlaeuterung", "")
    : currentUrl;

  const flatRoutes = useMemo(
    () => routes.flatMap((route) => ("routes" in route ? route.routes : route)),
    [routes],
  );

  const currentRoute = useMemo(
    () => flatRoutes.find((r) => r.path === navigationBaseUrl),
    [flatRoutes, navigationBaseUrl],
  );

  const currentPrincipleFormData = useMemo(
    () =>
      currentRoute?.principleId
        ? findDocumentationDataForUrl(currentRoute.principleId)
        : undefined,
    [currentRoute?.principleId, findDocumentationDataForUrl],
  );

  const isRouteDisabled = useCallback(
    (route: Route) => {
      const { validationResult } = validateDocumentationDataForRoute(
        route.path,
        route.principleId,
      );
      return validationResult === ValidationResult.disabled;
    },
    [validateDocumentationDataForRoute],
  );

  const nextUrl = useMemo(
    () =>
      isErlaeuterungPage
        ? resolveAdjacentUrl(
            flatRoutes,
            navigationBaseUrl,
            getNextUrl,
            findDocumentationDataForUrl,
            isRouteDisabled,
          )
        : currentRoute?.principleId &&
            (currentPrincipleFormData as { answer?: string } | undefined)
              ?.answer
          ? `${currentUrl}/erlaeuterung`
          : resolveAdjacentUrl(
              flatRoutes,
              currentUrl,
              getNextUrl,
              findDocumentationDataForUrl,
              isRouteDisabled,
            ),
    [
      isErlaeuterungPage,
      flatRoutes,
      navigationBaseUrl,
      currentRoute?.principleId,
      currentPrincipleFormData,
      currentUrl,
      findDocumentationDataForUrl,
    ],
  );

  const previousUrl = useMemo(
    () =>
      resolveAdjacentUrl(
        flatRoutes,
        navigationBaseUrl,
        getPreviousUrl,
        findDocumentationDataForUrl,
        isRouteDisabled,
      ) ?? dokumentation.path,
    [flatRoutes, navigationBaseUrl, findDocumentationDataForUrl],
  );

  const isNavigationDisabled = currentUrl === dokumentation_hinweise.path;

  const excludedPanelRoutes = [
    dokumentation_hinweise.path,
    dokumentation_zusammenfassung.path,
    dokumentation_absenden.path,
  ];
  const showHelpPanel = !excludedPanelRoutes.some((url) =>
    currentUrl.startsWith(url),
  );

  const getNavItem = (route: Route) => {
    const { formData, validationResult } = validateDocumentationDataForRoute(
      route.path,
      route.principleId,
    );
    const navUrl =
      route.principleId && (formData as { answer?: string } | undefined)?.answer
        ? `${route.path}/erlaeuterung`
        : route.path;

    return (
      <Nav.Item
        key={route.path}
        url={navUrl}
        activeUrls={
          route.principleId
            ? [route.path, `${route.path}/erlaeuterung`]
            : undefined
        }
        error={validationResult === ValidationResult.missingData}
        completed={validationResult === ValidationResult.completed}
        disabled={
          isNavigationDisabled || validationResult == ValidationResult.disabled
        }
      >
        {route.title}
      </Nav.Item>
    );
  };

  const navigationContextValue = useMemo(
    () => ({
      currentUrl,
      navigationBaseUrl,
      nextUrl: nextUrl ?? "",
      previousUrl,
      routes,
      prinzips,
    }),
    [currentUrl, navigationBaseUrl, nextUrl, previousUrl, routes, prinzips],
  );

  return (
    <DocumentationNavigationContext.Provider value={navigationContextValue}>
      <HelpPanelProvider currentPath={currentUrl}>
        <div
          className={twJoin(
            "breakout-grid-form-steps grow bg-blue-100",
            !showHelpPanel && "[--content-max-width:750px] [--help-width:0]",
          )}
        >
          <Nav
            className="sticky top-0 hidden self-start py-80 lg:block"
            activeElementUrl={currentUrl}
            ariaLabel={digitalDocumentation.navigation.ariaLabel}
          >
            <Nav.Items>
              {displayedRoutes.map((route) => {
                if ("routes" in route)
                  return (
                    <Nav.Item
                      key={route.title}
                      disabled={isNavigationDisabled}
                      subItems={
                        <Nav.Items>
                          {route.routes.map((element) => getNavItem(element))}
                        </Nav.Items>
                      }
                    >
                      {route.title}
                    </Nav.Item>
                  );
                return getNavItem(route);
              })}
            </Nav.Items>
          </Nav>
          <main className="space-y-40 py-80">
            <div className="lg:hidden">
              <Stepper
                currentElementUrl={navigationBaseUrl}
                elements={flatRoutes}
              />
            </div>
            {children}
          </main>
          {showHelpPanel && <HelpSidepanel />}
        </div>
      </HelpPanelProvider>
    </DocumentationNavigationContext.Provider>
  );
}
