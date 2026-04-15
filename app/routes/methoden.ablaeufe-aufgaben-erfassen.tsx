import { ROUTE_METHODS_VISUALIZE } from "~/resources/staticRoutes.ts";
import { createRedirectRoute } from "~/utils/previewRedirect";

const route = createRedirectRoute(ROUTE_METHODS_VISUALIZE.url, { status: 308 });

export const loader = route.loader;
export const meta = route.meta;
export default route.RedirectComponent;
