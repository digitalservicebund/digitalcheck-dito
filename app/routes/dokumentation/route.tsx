import {
  dokumentation,
  dokumentation_absenden,
  dokumentation_beteiligungsformate,
  dokumentation_hinweise,
  dokumentation_regelungsvorhabenTitel,
  dokumentation_zusammenfassung,
} from "@/config/routes";
import { Outlet, useRouteLoaderData } from "react-router";
import {
  fetchStrapiData,
  GET_PRINZIPS_WITH_EXAMPLES_QUERY,
} from "~/utils/strapiData.server.ts";
import type {
  PrinzipWithAspekte,
  PrinzipWithAspekteAndExample,
} from "~/utils/strapiData.types";
import { DocumentationDataProvider } from "./DocumentationDataProvider";

type _Route = { path: string; title: string };

const ROUTE_DOCUMENTATION = {
  path: dokumentation.path,
  title: dokumentation.title,
};
const ROUTES_DOCUMENTATION_INTRO: _Route[] = [
  { path: dokumentation_hinweise.path, title: dokumentation_hinweise.title },
  {
    path: dokumentation_regelungsvorhabenTitel.path,
    title: dokumentation_regelungsvorhabenTitel.title,
  },
  {
    path: dokumentation_beteiligungsformate.path,
    title: dokumentation_beteiligungsformate.title,
  },
];
const ROUTES_DOCUMENTATION_FINALIZE: _Route[] = [
  {
    path: dokumentation_zusammenfassung.path,
    title: dokumentation_zusammenfassung.title,
  },
  { path: dokumentation_absenden.path, title: dokumentation_absenden.title },
];

type Route = _Route & {
  principleId?: string;
};

export const handle = {
  hasProgressBar: true,
};

export type DocumentationRouteData = {
  routes: (Route[] | Route)[];
  prinzips: PrinzipWithAspekte[];
};

const getUrlForSlug = (slug: string) => `${ROUTE_DOCUMENTATION.path}/${slug}`;

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
      path: getUrlForSlug(URLBezeichnung),
      principleId: documentId,
    })),
    ...ROUTES_DOCUMENTATION_FINALIZE,
  ];

  return { routes, prinzips };
};

// eslint-disable-next-line react-refresh/only-export-components
export function useDocumentationRouteData() {
  const data = useRouteLoaderData<DocumentationRouteData>(
    "routes/dokumentation",
  );

  return data!;
}

export default function Documentation() {
  return (
    <DocumentationDataProvider>
      <Outlet />
    </DocumentationDataProvider>
  );
}
