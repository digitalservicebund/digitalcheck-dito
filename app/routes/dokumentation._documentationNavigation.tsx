import { Outlet, useLocation } from "react-router";
import { twJoin } from "tailwind-merge";
import HelpSidepanel from "~/components/HelpSidepanel";
import Nav from "~/components/Nav";
import Stepper from "~/components/Stepper";
import { useFeatureFlag } from "~/contexts/FeatureFlagContext";
import { HelpPanelProvider } from "~/contexts/HelpPanelContext";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  type Route as _Route,
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_INTEROPERABILITY_ASSESSMENT,
  ROUTE_DOCUMENTATION_NOTES,
  ROUTE_DOCUMENTATION_SEND,
  ROUTE_DOCUMENTATION_SUMMARY,
} from "~/resources/staticRoutes";
import { useDocumentationRouteData } from "~/routes/dokumentation/route.tsx";
import { features } from "~/utils/featureFlags";
import { PrinzipWithAspekteAndExample } from "~/utils/strapiData.server";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";

type Route = _Route & {
  principleId?: string;
};

export type OnNavigateCallback = () => Promise<boolean>;
export type NavigationContext = {
  currentUrl: string;
  nextUrl: string;
  previousUrl: string;
  routes: (Route | Route[])[];
  prinzips: PrinzipWithAspekteAndExample[];
};

function findIndexForRoute(routes: Route[], currentUrl: string) {
  const index = routes.findIndex((route) => route.url === currentUrl);

  if (index === -1) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(`Could not find route with url ${currentUrl}`, {
      status: 404,
    });
  }
  return index;
}

function getPreviousUrl(routes: Route[], currentUrl: string): string {
  return findIndexForRoute(routes, currentUrl) > 0
    ? routes[findIndexForRoute(routes, currentUrl) - 1].url
    : ROUTE_DOCUMENTATION.url;
}

function getNextUrl(routes: Route[], currentUrl: string): string | null {
  return findIndexForRoute(routes, currentUrl) < routes.length - 1
    ? routes[findIndexForRoute(routes, currentUrl) + 1].url
    : null;
}

function resolveAdjacentUrl(
  flatRoutes: Route[],
  fromUrl: string,
  getAdjacent: (routes: Route[], url: string) => string | null,
  simplifiedFlow: boolean,
  findData: (id: string) => unknown,
  isRouteAccessible: (route: Route) => boolean,
): string | null {
  let currentUrl = fromUrl;
  const visited = new Set<string>();

  while (true) {
    const rawUrl = getAdjacent(flatRoutes, currentUrl);
    if (!rawUrl) return rawUrl;
    if (visited.has(rawUrl)) return null;

    visited.add(rawUrl);

    const route = flatRoutes.find((r) => r.url === rawUrl);
    if (route && !isRouteAccessible(route)) {
      currentUrl = rawUrl;
      continue;
    }

    if (!simplifiedFlow) return rawUrl;

    if (route?.principleId) {
      const data = findData(route.principleId) as { answer?: string } | undefined;
      if (data?.answer) return `${rawUrl}/erlaeuterung`;
    }

    return rawUrl;
  }
}

export default function LayoutWithDocumentationNavigation() {
  const { routes, prinzips } = useDocumentationRouteData();
  const simplifiedFlow = useFeatureFlag(features.simplifiedPrincipleFlow);

  // exclude documentation notes
  const displayedRoutes = routes.filter((route) => {
    if (Array.isArray(route)) return true;
    return route.url !== ROUTE_DOCUMENTATION_NOTES.url;
  });

  const location = useLocation();
  const currentUrl = location.pathname;

  // Detect erlaeuterung sub-page
  const isErlaeuterungPage = currentUrl.endsWith("/erlaeuterung");
  const principleBaseUrl = isErlaeuterungPage
    ? currentUrl.replace("/erlaeuterung", "")
    : null;

  // For nav/stepper index lookups, use principle URL when on erlaeuterung page
  const navigationCurrentUrl = principleBaseUrl ?? currentUrl;

  const {
    documentationData,
    findDocumentationDataForUrl,
    getDocumentationSchemaFormUrl,
  } = useDocumentationDataService();

  const isInteroperabilityAssessmentAccessible =
    documentationData.euInteroperabilityOutcome?.outcomeId === "REQUIRED";

  const isRouteAccessible = (route: Route) => {
    if (
      route.url === ROUTE_DOCUMENTATION_INTEROPERABILITY_ASSESSMENT.url &&
      !isInteroperabilityAssessmentAccessible
    ) {
      return false;
    }

    return true;
  };

  const flatRoutes = routes.flat();
  const currentRoute = flatRoutes.find((r) => r.url === navigationCurrentUrl);
  const currentPrincipleFormData = currentRoute?.principleId
    ? findDocumentationDataForUrl(currentRoute.principleId)
    : undefined;

  const nextUrl = isErlaeuterungPage
    ? resolveAdjacentUrl(
        flatRoutes,
        navigationCurrentUrl,
        getNextUrl,
        simplifiedFlow,
        findDocumentationDataForUrl,
        isRouteAccessible,
      )
    : simplifiedFlow &&
        currentRoute?.principleId &&
        (currentPrincipleFormData as { answer?: string } | undefined)?.answer
      ? `${currentUrl}/erlaeuterung`
      : resolveAdjacentUrl(
          flatRoutes,
          currentUrl,
          getNextUrl,
          simplifiedFlow,
          findDocumentationDataForUrl,
          isRouteAccessible,
        );
  const previousUrl =
    resolveAdjacentUrl(
      flatRoutes,
      navigationCurrentUrl,
      getPreviousUrl,
      simplifiedFlow,
      findDocumentationDataForUrl,
      isRouteAccessible,
    ) ?? ROUTE_DOCUMENTATION.url;

  const isNavigationDisabled = currentUrl === ROUTE_DOCUMENTATION_NOTES.url;

  const excludedPanelRoutes = [
    ROUTE_DOCUMENTATION_NOTES.url,
    ROUTE_DOCUMENTATION_SUMMARY.url,
    ROUTE_DOCUMENTATION_SEND.url,
  ];
  const showHelpPanel =
    simplifiedFlow &&
    !excludedPanelRoutes.some((url) => currentUrl.startsWith(url));

  const getNavItem = (route: Route) => {
    const formData = findDocumentationDataForUrl(
      route.principleId || route.url,
    );
    const schema = getDocumentationSchemaFormUrl(route.url);
    const valid = schema.safeParse(formData);

    const navUrl =
      simplifiedFlow &&
      route.principleId &&
      (formData as { answer?: string } | undefined)?.answer
        ? `${route.url}/erlaeuterung`
        : route.url;

    return (
      <Nav.Item
        key={route.url}
        url={navUrl}
        activeUrls={
          route.principleId
            ? [route.url, `${route.url}/erlaeuterung`]
            : undefined
        }
        error={formData && !valid.success}
        completed={formData && valid.success}
        disabled={isNavigationDisabled || !isRouteAccessible(route)}
      >
        {route.title}
      </Nav.Item>
    );
  };

  return (
    <HelpPanelProvider>
      <div
        className={twJoin(
          "parent-bg-blue breakout-grid-form-steps grow bg-blue-100",
          !simplifiedFlow &&
            "[--content-max-width:calc(var(--max-content-width)-var(--nav-max-width)-var(--gutter)-var(--container-padding-inline)*2)] [--help-width:0]",
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
              if (Array.isArray(route))
                return (
                  <Nav.Item
                    key="principles"
                    disabled={isNavigationDisabled}
                    subItems={
                      <Nav.Items>
                        {route.map((element) => getNavItem(element))}
                      </Nav.Items>
                    }
                  >
                    {digitalDocumentation.navigation.principles}
                  </Nav.Item>
                );
              return getNavItem(route);
            })}
          </Nav.Items>
        </Nav>
        <main className="space-y-40 py-80">
          <div className="lg:hidden">
            <Stepper
              currentElementUrl={navigationCurrentUrl}
              elements={routes.flat().filter(isRouteAccessible)}
            />
          </div>
          {/* force remount for different principles with key={currentUrl} */}
          <Outlet
            key={currentUrl}
            context={{
              currentUrl,
              nextUrl,
              previousUrl,
              routes,
              prinzips,
            }}
          />
        </main>
        {showHelpPanel && <HelpSidepanel />}
      </div>
    </HelpPanelProvider>
  );
}
