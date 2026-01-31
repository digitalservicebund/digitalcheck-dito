import { useMemo } from "react";
import { Outlet, useLocation } from "react-router";
import Nav from "~/components/Nav";
import Stepper from "~/components/Stepper";
import { useFederalState } from "~/contexts/FederalStateContext";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  type Route as _Route,
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_NOTES,
  ROUTE_DOCUMENTATION_PARTICIPATION,
} from "~/resources/staticRoutes";
import { useDocumentationRouteData } from "~/routes/dokumentation/route.tsx";
import { PrinzipWithAspekteAndExample } from "~/utils/strapiData.server";
import { useDocumentationData } from "./dokumentation/documentationDataHook";
import { getDocumentationSchemaFormUrl } from "./dokumentation/documentationDataSchema";

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

export default function LayoutWithDocumentationNavigation() {
  const { routes: baseRoutes, brandenburgRoutes, prinzips } = useDocumentationRouteData();
  const { currentState } = useFederalState();

  // Include Brandenburg routes after Beteiligungsformate if Brandenburg is selected
  const routes = useMemo(() => {
    if (currentState !== "brandenburg") {
      return baseRoutes;
    }

    // Find the index of participation route and insert Brandenburg routes after it
    const participationIndex = baseRoutes.findIndex(
      (route) => !Array.isArray(route) && route.url === ROUTE_DOCUMENTATION_PARTICIPATION.url,
    );

    if (participationIndex === -1) {
      return baseRoutes;
    }

    return [
      ...baseRoutes.slice(0, participationIndex + 1),
      ...brandenburgRoutes,
      ...baseRoutes.slice(participationIndex + 1),
    ];
  }, [baseRoutes, brandenburgRoutes, currentState]);

  // exclude documentation notes
  const displayedRoutes = routes.filter((route) => {
    if (Array.isArray(route)) return true;
    return route.url !== ROUTE_DOCUMENTATION_NOTES.url;
  });

  const location = useLocation();
  const currentUrl = location.pathname;

  const nextUrl = getNextUrl(routes.flat(), currentUrl);
  const previousUrl = getPreviousUrl(routes.flat(), currentUrl);

  const isNavigationDisabled = currentUrl === ROUTE_DOCUMENTATION_NOTES.url;

  const { findDocumentationDataForUrl } = useDocumentationData();

  const getNavItem = (route: Route) => {
    const formData = findDocumentationDataForUrl(
      route.principleId || route.url,
    );
    const schema = getDocumentationSchemaFormUrl(route.url);
    const valid = schema.safeParse(formData);

    return (
      <Nav.Item
        key={route.url}
        url={route.url}
        error={formData && !valid.success}
        completed={formData && valid.success}
        disabled={isNavigationDisabled}
      >
        {route.title}
      </Nav.Item>
    );
  };

  return (
    <div className="parent-bg-blue container flex max-w-none justify-center space-x-80 bg-blue-100 py-40 lg:py-80">
      <div className="hidden max-w-[248px] flex-none grow lg:block">
        <div className="sticky top-40">
          <Nav
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
                      subItems={<Nav.Items>{route.map(getNavItem)}</Nav.Items>}
                    >
                      {digitalDocumentation.navigation.principles}
                    </Nav.Item>
                  );
                return getNavItem(route);
              })}
            </Nav.Items>
          </Nav>
        </div>
      </div>
      <main className="w-[51rem] space-y-40">
        <div className="lg:hidden">
          <Stepper currentElementUrl={currentUrl} elements={routes.flat()} />
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
    </div>
  );
}
