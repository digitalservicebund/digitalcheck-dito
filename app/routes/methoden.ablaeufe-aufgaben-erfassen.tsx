import { redirect } from "react-router";
import { ROUTE_METHODS_VISUALIZE } from "~/resources/staticRoutes.ts";

const permanentRedirectCode = 308;
export function loader() {
  return redirect(ROUTE_METHODS_VISUALIZE.url, permanentRedirectCode);
}
