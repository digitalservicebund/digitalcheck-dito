import { ROUTE_INTEROPERABILITY } from "~/resources/staticRoutes.ts";
import { createRedirectRoute } from "~/utils/previewRedirect";
import { getTabAnchorLink } from "~/utils/tabs.ts";

const route = createRedirectRoute(
  ROUTE_INTEROPERABILITY.url +
    getTabAnchorLink("interoperable-loesungen", "interoperable-loesungen"),
);

export const loader = route.loader;
export const meta = route.meta;
export default route.RedirectComponent;
