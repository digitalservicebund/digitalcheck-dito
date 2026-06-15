import {
  dokumentation,
  dokumentation_absenden,
  dokumentation_hinweise,
  dokumentation_zusammenfassung,
} from "@/config/routes";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { twJoin } from "tailwind-merge";
import HelpSidepanel from "~/components/HelpSidepanel";
import Nav from "~/components/Nav";
import Stepper from "~/components/Stepper";
import { HelpPanelProvider } from "~/contexts/HelpPanelContext";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import type { PrinzipWithAspekte } from "~/utils/strapiData.types";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";
import type {
  Route,
  RouteGroup,
} from "./dokumentation/DocumentationNavigationContext";
import { DocumentationNavigationContext } from "./dokumentation/DocumentationNavigationContext";

function findIndexForRoute(routes: Route[], currentUrl: string) {
  const index = routes.findIndex((route) => route.path === currentUrl);

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
    ? routes[findIndexForRoute(routes, currentUrl) - 1].path
    : dokumentation.path;
}

function getNextUrl(routes: Route[], currentUrl: string): string | null {
  return findIndexForRoute(routes, currentUrl) < routes.length - 1
    ? routes[findIndexForRoute(routes, currentUrl) + 1].path
    : null;
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

export function LayoutWithDocumentationNavigation({
  routes,
  prinzips,
  children,
  currentUrl,
}: Readonly<{
  routes: (Route | RouteGroup)[];
  prinzips: PrinzipWithAspekte[];
  children?: ReactNode;
  currentUrl: string;
}>) {
  // exclude documentation notes
  const displayedRoutes = routes.filter((route) => {
    if ("routes" in route) return true; // RouteGroup
    return route.path !== dokumentation_hinweise.path;
  });

  // Detect erlaeuterung sub-page
  const isErlaeuterungPage = currentUrl.endsWith("/erlaeuterung");
  // For nav/stepper index lookups, use principle URL when on erlaeuterung page
  const navigationBaseUrl = isErlaeuterungPage
    ? currentUrl.replace("/erlaeuterung", "")
    : currentUrl;

  const { findDocumentationDataForUrl, getDocumentationSchemaFormUrl } =
    useDocumentationDataService();

  const flatRoutes = routes.flatMap((route) =>
    "routes" in route ? route.routes : route,
  );
  const currentRoute = flatRoutes.find((r) => r.path === navigationBaseUrl);
  const currentPrincipleFormData = currentRoute?.principleId
    ? findDocumentationDataForUrl(currentRoute.principleId)
    : undefined;

  const nextUrl = isErlaeuterungPage
    ? resolveAdjacentUrl(
        flatRoutes,
        navigationBaseUrl,
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
      navigationBaseUrl,
      getPreviousUrl,
      findDocumentationDataForUrl,
    ) ?? dokumentation.path;

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
    const formData = findDocumentationDataForUrl(
      route.principleId || route.path,
    );
    const schema = getDocumentationSchemaFormUrl(route.path);
    const valid = schema.safeParse(formData);

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
        error={formData && !valid.success}
        completed={formData && valid.success}
        disabled={isNavigationDisabled}
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
