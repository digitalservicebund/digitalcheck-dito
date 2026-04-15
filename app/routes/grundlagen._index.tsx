import { ROUTE_FUNDAMENTALS_PRINCIPLES } from "~/resources/staticRoutes.ts";
import { createRedirectRoute } from "~/utils/previewRedirect";

const route = createRedirectRoute(ROUTE_FUNDAMENTALS_PRINCIPLES.url);

export const loader = route.loader;
export const meta = route.meta;
export default route.RedirectComponent;
