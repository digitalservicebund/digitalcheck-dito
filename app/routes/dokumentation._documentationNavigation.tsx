import { Outlet, useLoaderData, useLocation } from "react-router";
import Nav from "~/components/Nav";
import Stepper from "~/components/Stepper";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { features } from "~/resources/features";
import {
  type Route as _Route,
  ROUTE_DOCUMENTATION,
  ROUTES_DOCUMENTATION_POST,
  ROUTES_DOCUMENTATION_PRE,
} from "~/resources/staticRoutes";
import useFeatureFlag from "~/utils/featureFlags";
import {
  fetchStrapiData,
  GET_PRINZIPS_WITH_ASPECTS_QUERY,
  type PrinzipWithAspekte,
} from "~/utils/strapiData.server";
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
  prinzips: PrinzipWithAspekte[];
};

const getUrlForSlug = (slug: string) => `/dokumentation/${slug}`;

function findIndexForRoute(routes: Route[], currentUrl: string) {
  const index = routes.findIndex((route) => route.url === currentUrl);

  if (index === -1) {
    throw new Error(`Could not find route with url ${currentUrl}`);
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

export const loader = async () => {
  const prinzipData = await fetchStrapiData<{
    prinzips: PrinzipWithAspekte[];
  }>(GET_PRINZIPS_WITH_ASPECTS_QUERY);

  if ("error" in prinzipData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(prinzipData.error, { status: 400 });
  }

  const { prinzips } = prinzipData;

  const routes: (Route[] | Route)[] = [
    ...ROUTES_DOCUMENTATION_PRE,
    prinzips.map<Route>(({ Name, URLBezeichnung, documentId }) => ({
      title: Name,
      url: getUrlForSlug(URLBezeichnung),
      principleId: documentId,
    })),
    ...ROUTES_DOCUMENTATION_POST,
  ];

  return { routes, prinzips };
};

export default function LayoutWithDocumentationNavigation() {
  const { routes, prinzips } = useLoaderData<typeof loader>();
  const location = useLocation();
  const currentUrl = location.pathname;

  const enableDigitalDocumentation = useFeatureFlag(
    features.enableDigitalDocumentation,
  );

  if (!enableDigitalDocumentation) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Feature is not enabled for this environment", {
      status: 404,
    });
  }

  const nextUrl = getNextUrl(routes.flat(), currentUrl);
  const previousUrl = getPreviousUrl(routes.flat(), currentUrl);

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
      >
        {route.title}
      </Nav.Item>
    );
  };

  return (
    <div className="parent-bg-blue container flex max-w-none justify-center space-x-80 bg-blue-100 py-40 lg:py-80">
      <div className="hidden max-w-[248px] flex-none lg:block">
        <div className="sticky top-40">
          <Nav
            activeElementUrl={currentUrl}
            ariaLabel={digitalDocumentation.navigation.ariaLabel}
          >
            <Nav.Items>
              {routes.map((route) => {
                if (Array.isArray(route))
                  return (
                    <Nav.Item
                      key="principles"
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
      <section className="w-[51rem] space-y-40">
        <div className="lg:hidden">
          <Stepper currentElementUrl={currentUrl} elements={routes.flat()} />
        </div>
        {/* force remount for different principles with key={currentUrl} */}
        <Outlet
          key={currentUrl}
          context={{ currentUrl, nextUrl, previousUrl, routes, prinzips }}
        />
      </section>
    </div>
  );
}
