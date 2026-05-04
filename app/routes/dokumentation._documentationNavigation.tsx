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
  ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS,
  ROUTE_DOCUMENTATION_INTEROPERABILITY_ASSESSMENT,
  ROUTE_DOCUMENTATION_INTEROPERABILITY_BINDING_REQUIREMENTS,
  ROUTE_DOCUMENTATION_NOTES,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_SEND,
  ROUTE_DOCUMENTATION_SUMMARY,
  ROUTE_DOCUMENTATION_TITLE,
} from "~/resources/staticRoutes";
import { useDocumentationRouteData } from "~/routes/dokumentation/hooks.tsx";
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

type NavigationTreeContext = {
  flatRoutes: Route[];
  principleRoutes: Route[];
  routeByUrl: Map<string, Route>;
  isInteroperabilityAssessmentAccessible: boolean;
};

type NavigationItemDefinition = {
  type: "item";
  key: string;
  getRoute: (context: NavigationTreeContext) => Route | null;
  isEnabled: (context: NavigationTreeContext, route: Route) => boolean;
};

type NavigationFolderDefinition = {
  type: "folder";
  key: string;
  label: string;
  getChildren: (context: NavigationTreeContext) => NavigationItemDefinition[];
};

type NavigationDefinition =
  | NavigationItemDefinition
  | NavigationFolderDefinition;

type ResolvedNavigationItem = {
  type: "item";
  key: string;
  route: Route;
  enabled: boolean;
};

type ResolvedNavigationFolder = {
  type: "folder";
  key: string;
  label: string;
  children: ResolvedNavigationItem[];
};

type ResolvedNavigationNode = ResolvedNavigationItem | ResolvedNavigationFolder;

const alwaysEnabled = () => true;

const getRouteByUrl =
  (url: string) =>
  ({ routeByUrl }: NavigationTreeContext) =>
    routeByUrl.get(url) ?? null;

const createRouteItem = (
  key: string,
  url: string,
  isEnabled: NavigationItemDefinition["isEnabled"] = alwaysEnabled,
): NavigationItemDefinition => ({
  type: "item",
  key,
  getRoute: getRouteByUrl(url),
  isEnabled,
});

const createPrincipleItem = (route: Route): NavigationItemDefinition => ({
  type: "item",
  key: route.url,
  getRoute: () => route,
  isEnabled: alwaysEnabled,
});

const staticDocumentationRoutes: Route[] = [
  ROUTE_DOCUMENTATION_TITLE,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS,
  ROUTE_DOCUMENTATION_INTEROPERABILITY_BINDING_REQUIREMENTS,
  ROUTE_DOCUMENTATION_INTEROPERABILITY_ASSESSMENT,
  ROUTE_DOCUMENTATION_SUMMARY,
  ROUTE_DOCUMENTATION_SEND,
];

const documentationNavigationTree: NavigationDefinition[] = [
  createRouteItem("title", ROUTE_DOCUMENTATION_TITLE.url),
  createRouteItem("participation", ROUTE_DOCUMENTATION_PARTICIPATION.url),
  {
    type: "folder",
    key: "principles",
    label: digitalDocumentation.navigation.principles,
    getChildren: ({ principleRoutes }) =>
      principleRoutes.map(createPrincipleItem),
  },
  {
    type: "folder",
    key: "eu-interoperability",
    label: digitalDocumentation.navigation.euInteroperability,
    getChildren: () => [
      createRouteItem(
        "eu-interoperability-requirements",
        ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS.url,
      ),
      createRouteItem(
        "interoperability-binding-requirements",
        ROUTE_DOCUMENTATION_INTEROPERABILITY_BINDING_REQUIREMENTS.url,
      ),
      createRouteItem(
        "interoperability-assessment",
        ROUTE_DOCUMENTATION_INTEROPERABILITY_ASSESSMENT.url,
        ({ isInteroperabilityAssessmentAccessible }) =>
          isInteroperabilityAssessmentAccessible,
      ),
    ],
  },
  createRouteItem("summary", ROUTE_DOCUMENTATION_SUMMARY.url),
  createRouteItem("send", ROUTE_DOCUMENTATION_SEND.url),
];

function resolveNavigationItem(
  item: NavigationItemDefinition,
  context: NavigationTreeContext,
): ResolvedNavigationItem | null {
  const route = item.getRoute(context);
  if (!route) return null;

  return {
    type: "item",
    key: item.key,
    route,
    enabled: item.isEnabled(context, route),
  };
}

function resolveNavigationTree(
  tree: NavigationDefinition[],
  context: NavigationTreeContext,
): ResolvedNavigationNode[] {
  return tree.reduce<ResolvedNavigationNode[]>((resolvedTree, node) => {
    if (node.type === "item") {
      const item = resolveNavigationItem(node, context);
      if (item) resolvedTree.push(item);
      return resolvedTree;
    }

    const children = node
      .getChildren(context)
      .flatMap((child) => resolveNavigationItem(child, context) ?? []);

    if (children.length > 0) {
      resolvedTree.push({
        type: "folder",
        key: node.key,
        label: node.label,
        children,
      } satisfies ResolvedNavigationFolder);
    }

    return resolvedTree;
  }, []);
}

function flattenNavigationItems(
  tree: ResolvedNavigationNode[],
): ResolvedNavigationItem[] {
  return tree.flatMap((node) =>
    node.type === "item" ? [node] : flattenNavigationItems(node.children),
  );
}

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
      const data = findData(route.principleId) as
        | { answer?: string }
        | undefined;
      if (data?.answer) return `${rawUrl}/erlaeuterung`;
    }

    return rawUrl;
  }
}

export default function LayoutWithDocumentationNavigation() {
  const { routes, prinzips } = useDocumentationRouteData();
  const simplifiedFlow = useFeatureFlag(features.simplifiedPrincipleFlow);
  const flatRoutes = routes.flat();
  const principleRoutes = routes.flatMap((route) =>
    Array.isArray(route) ? route : [],
  );
  const routeByUrl = new Map(
    [...staticDocumentationRoutes, ...flatRoutes].map((route) => [
      route.url,
      route,
    ]),
  );

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
    documentationData.euInteroperabilityOutcome?.outcomeId === "REQUIRED" ||
    documentationData.euInteroperabilityOutcome?.outcomeId ===
      "NOT_REQUIRED_NOT_FIRST_ASSESSMENT";

  const navigationTreeContext: NavigationTreeContext = {
    flatRoutes,
    principleRoutes,
    routeByUrl,
    isInteroperabilityAssessmentAccessible,
  };

  const resolvedNavigationTree = resolveNavigationTree(
    documentationNavigationTree,
    navigationTreeContext,
  );
  const accessibleRouteUrls = new Set([
    ROUTE_DOCUMENTATION_NOTES.url,
    ...flattenNavigationItems(resolvedNavigationTree)
      .filter((item) => item.enabled)
      .map((item) => item.route.url),
  ]);

  const isRouteAccessible = (route: Route) =>
    accessibleRouteUrls.has(route.url);

  const currentRoute = flatRoutes.find((r) => r.url === navigationCurrentUrl);
  const currentPrincipleFormData = currentRoute?.principleId
    ? findDocumentationDataForUrl(currentRoute.principleId)
    : undefined;

  let nextUrl: string | null;

  if (isErlaeuterungPage) {
    nextUrl = resolveAdjacentUrl(
      flatRoutes,
      navigationCurrentUrl,
      getNextUrl,
      simplifiedFlow,
      findDocumentationDataForUrl,
      isRouteAccessible,
    );
  } else if (
    simplifiedFlow &&
    currentRoute?.principleId &&
    (currentPrincipleFormData as { answer?: string } | undefined)?.answer
  ) {
    nextUrl = `${currentUrl}/erlaeuterung`;
  } else {
    nextUrl = resolveAdjacentUrl(
      flatRoutes,
      currentUrl,
      getNextUrl,
      simplifiedFlow,
      findDocumentationDataForUrl,
      isRouteAccessible,
    );
  }
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

  const getNavItem = ({ route, enabled }: ResolvedNavigationItem) => {
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
        disabled={isNavigationDisabled || !enabled}
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
            {resolvedNavigationTree.map((node) => {
              if (node.type === "folder") {
                return (
                  <Nav.Item
                    key={node.key}
                    disabled={isNavigationDisabled}
                    subItems={
                      <Nav.Items>
                        {node.children.map((item) => getNavItem(item))}
                      </Nav.Items>
                    }
                  >
                    {node.label}
                  </Nav.Item>
                );
              }
              return getNavItem(node);
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
