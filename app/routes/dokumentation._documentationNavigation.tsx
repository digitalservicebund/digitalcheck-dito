import { Outlet, useLoaderData, useLocation } from "react-router";
import { BadgeProps } from "~/components/Badge";
import Nav from "~/components/Nav";
import Stepper from "~/components/Stepper";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { features } from "~/resources/features";
import {
  type Route as InternalRoute,
  ROUTE_DOCUMENTATION,
  ROUTES_DOCUMENTATION_POST,
  ROUTES_DOCUMENTATION_PRE,
} from "~/resources/staticRoutes";
import useFeatureFlag from "~/utils/featureFlags";
import { Node } from "~/utils/paragraphUtils";
import { fetchStrapiData } from "~/utils/strapiData.server";

export type OnNavigateCallback = () => Promise<boolean>;

export type Aspekt = {
  Titel: string;
  Kurzbezeichnung: string;
  Beschreibung: string;
};

export type Prinzip = {
  Name: string;
  URLBezeichnung: string;
  documentId: string;
  Beschreibung: Node[];
  order: number;
  Nummer: BadgeProps["principleNumber"];
  Aspekte: Aspekt[];
};

export type NavigationContext = {
  currentUrl: string;
  nextUrl: string;
  previousUrl: string;
  routes: (InternalRoute | InternalRoute[])[];
  prinzips: Prinzip[];
};

const GET_PRINZIPS_QUERY = `
query GetPrinzips {
  prinzips(sort: "order") {
    documentId
    order
    Nummer
    URLBezeichnung
    Name
    Beschreibung
    Aspekte {
      Titel
      Kurzbezeichnung
      Beschreibung
    }
  }
}`;

const getUrlForSlug = (slug: string) => `/dokumentation/${slug}`;

function findIndexForRoute(routes: InternalRoute[], currentUrl: string) {
  const index = routes.findIndex((route) => route.url === currentUrl);

  if (index === -1) {
    throw new Error(`Could not find route with url ${currentUrl}`);
  }
  return index;
}

function getPreviousUrl(routes: InternalRoute[], currentUrl: string): string {
  return findIndexForRoute(routes, currentUrl) > 0
    ? routes[findIndexForRoute(routes, currentUrl) - 1].url
    : ROUTE_DOCUMENTATION.url;
}

function getNextUrl(
  routes: InternalRoute[],
  currentUrl: string,
): string | null {
  return findIndexForRoute(routes, currentUrl) < routes.length - 1
    ? routes[findIndexForRoute(routes, currentUrl) + 1].url
    : null;
}

export const loader = async () => {
  const prinzipData = await fetchStrapiData<{
    prinzips: Prinzip[];
  }>(GET_PRINZIPS_QUERY);

  if ("error" in prinzipData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(prinzipData.error, { status: 400 });
  }

  const { prinzips } = prinzipData;

  const routes: (InternalRoute[] | InternalRoute)[] = [
    ...ROUTES_DOCUMENTATION_PRE,
    prinzips.map<InternalRoute>(({ Name, URLBezeichnung }) => ({
      title: Name,
      url: getUrlForSlug(URLBezeichnung),
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

  const getNavItem = (route: InternalRoute) => (
    <Nav.Item key={route.url} url={route.url}>
      {route.title}
    </Nav.Item>
  );

  return (
    <div className="parent-bg-blue container flex max-w-none justify-center space-x-80 bg-blue-100 py-40 lg:py-80">
      <div className="hidden max-w-[248px] flex-none lg:block">
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
