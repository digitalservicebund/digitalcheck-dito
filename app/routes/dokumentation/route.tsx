import { Outlet } from "react-router";
import {
  Route as _Route,
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS,
  ROUTE_DOCUMENTATION_INTEROPERABILITY_ASSESSMENT,
  ROUTE_DOCUMENTATION_INTEROPERABILITY_BINDING_REQUIREMENTS,
  ROUTES_DOCUMENTATION_FINALIZE,
  ROUTES_DOCUMENTATION_INTRO,
} from "~/resources/staticRoutes.ts";
import {
  fetchStrapiData,
  GET_PRINZIPS_WITH_EXAMPLES_QUERY,
  PrinzipWithAspekte,
  PrinzipWithAspekteAndExample,
} from "~/utils/strapiData.server.ts";
import { DocumentationDataProvider } from "./DocumentationDataProvider";

export const handle = {
  hasProgressBar: true,
};

export default function Documentation() {
  return (
    <DocumentationDataProvider>
      <Outlet />
    </DocumentationDataProvider>
  );
}
type Route = _Route & {
  principleId?: string;
};
export type DocumentationRouteData = {
  routes: (Route[] | Route)[];
  prinzips: PrinzipWithAspekte[];
};
const getUrlForSlug = (slug: string) => `${ROUTE_DOCUMENTATION.url}/${slug}`;
export const loader: () => Promise<DocumentationRouteData> = async () => {
  const prinzipData = await fetchStrapiData<{
    prinzips: PrinzipWithAspekteAndExample[];
  }>(GET_PRINZIPS_WITH_EXAMPLES_QUERY);

  if ("error" in prinzipData) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response(prinzipData.error, { status: 400 });
  }

  const { prinzips } = prinzipData;

  const routes: (Route[] | Route)[] = [
    ...ROUTES_DOCUMENTATION_INTRO,
    prinzips.map<Route>(({ Name, URLBezeichnung, documentId }) => ({
      title: Name,
      url: getUrlForSlug(URLBezeichnung),
      principleId: documentId,
    })),
    ROUTE_DOCUMENTATION_EU_INTEROPERABILITY_REQUIREMENTS,
    ROUTE_DOCUMENTATION_INTEROPERABILITY_BINDING_REQUIREMENTS,
    ROUTE_DOCUMENTATION_INTEROPERABILITY_ASSESSMENT,
    ...ROUTES_DOCUMENTATION_FINALIZE,
  ];

  return { routes, prinzips };
};
