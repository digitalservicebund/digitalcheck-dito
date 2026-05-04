import { useRouteLoaderData } from "react-router";

import { DocumentationRouteData } from "~/routes/dokumentation/route.tsx";

export function useDocumentationRouteData() {
  const data = useRouteLoaderData<DocumentationRouteData>(
    "routes/dokumentation",
  );

  return data!;
}
