import { ROUTE_METHODS_PRINCIPLES } from "~/resources/staticRoutes";
import { createRedirectRoute } from "~/utils/previewRedirect";

const route = createRedirectRoute(ROUTE_METHODS_PRINCIPLES.url);

export const loader = route.loader;
export const meta = route.meta;
export default route.RedirectComponent;
