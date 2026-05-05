import type { Route as _Route } from "~/resources/staticRoutes.ts";
import { Outlet } from "~/utils/routerCompat";
import type { PrinzipWithAspekte } from "~/utils/strapiData.types.ts";
import { DocumentationDataProvider } from "./DocumentationDataProvider";

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

export default function Documentation() {
  return (
    <DocumentationDataProvider>
      <Outlet />
    </DocumentationDataProvider>
  );
}
