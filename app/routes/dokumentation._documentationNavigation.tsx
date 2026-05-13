import {
  dokumentation,
  dokumentation_absenden,
  dokumentation_hinweise,
  dokumentation_zusammenfassung,
} from "@/config/routes";
import type { ReactNode } from "react";
import { Outlet, useLocation, useRouteLoaderData } from "react-router";
import HelpSidepanel from "~/components/HelpSidepanel";
import Nav from "~/components/Nav";
import Stepper from "~/components/Stepper";
import { HelpPanelProvider } from "~/contexts/HelpPanelContext";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import type { PrinzipWithAspekteAndExample } from "~/utils/strapiData.types";
import { useDocumentationDataService } from "./dokumentation/DocumentationDataProvider";

type _Route = { path: string; title: string };

type Route = _Route & {
  principleId?: string;
};

export type OnNavigateCallback = () => Promise<boolean>;
export type NavigationContext = {
  currentUrl: string;
  navigationBaseUrl: string;
  nextUrl: string;
  previousUrl: string;
  routes: (Route | Route[])[];
  prinzips: PrinzipWithAspekteAndExample[];
};

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
}: {
  routes: (Route | Route[])[];
  prinzips: PrinzipWithAspekteAndExample[];
  children?: ReactNode;
  currentUrl: string;
}) {
  // exclude documentation notes
  const displayedRoutes = routes.filter((route) => {
    if (Array.isArray(route)) return true;
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

  const flatRoutes = routes.flat();
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

  return (
    <HelpPanelProvider>
      <div
        className={
          showHelpPanel
            ? "parent-bg-blue breakout-grid-form-steps grow bg-blue-100"
            : "parent-bg-blue breakout-grid-form-steps grow bg-blue-100 [--content-max-width:750px] [--help-width:0]"
        }
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
              currentElementUrl={navigationBaseUrl}
              elements={routes.flat()}
            />
          </div>
          {/* force remount for different principles with key={currentUrl} */}
          <Outlet
            key={currentUrl}
            context={{
              currentUrl,
              navigationBaseUrl,
              nextUrl,
              previousUrl,
              routes,
              prinzips,
            }}
          />
          {children}
        </main>
        {showHelpPanel && <HelpSidepanel />}
      </div>
    </HelpPanelProvider>
  );
}

export default function Route() {
  const data = useRouteLoaderData<{
    routes: (Route | Route[])[];
    prinzips: PrinzipWithAspekteAndExample[];
  }>("routes/dokumentation");
  const location = useLocation();
  const currentUrl = location.pathname;
  if (!data) return null;
  return (
    <LayoutWithDocumentationNavigation
      routes={data.routes}
      prinzips={data.prinzips}
      currentUrl={currentUrl}
    />
  );
}
