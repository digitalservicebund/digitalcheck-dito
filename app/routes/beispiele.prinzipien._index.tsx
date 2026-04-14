import { ROUTE_EXAMPLES_DIGITAL_COMMUNICATION } from "~/resources/staticRoutes.ts";
import { createRedirectRoute } from "~/utils/previewRedirect";

const route = createRedirectRoute(ROUTE_EXAMPLES_DIGITAL_COMMUNICATION.url);

export const loader = route.loader;
export const meta = route.meta;
export default route.RedirectComponent;
