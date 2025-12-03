import { Outlet, useRouteLoaderData } from "react-router";
import {
  Route,
  ROUTE_DOCUMENTATION,
  ROUTES_DOCUMENTATION_FINALIZE,
  ROUTES_DOCUMENTATION_INTRO,
} from "~/resources/staticRoutes.ts";
import {
  fetchStrapiData,
  GET_PRINZIPS_WITH_EXAMPLES_QUERY,
  type PrinzipWithAspekte,
  PrinzipWithAspekteAndExample,
} from "~/utils/strapiData.server.ts";

export const handle = {
  hasProgressBar: true,
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
    ...ROUTES_DOCUMENTATION_FINALIZE,
  ];

  return { routes, prinzips };
};

export function useDocumentationRouteData() {
  const data = useRouteLoaderData<DocumentationRouteData>(
    "routes/dokumentation",
  );

  return data!;
}

export default function Documentation() {
  return <Outlet />;
}
