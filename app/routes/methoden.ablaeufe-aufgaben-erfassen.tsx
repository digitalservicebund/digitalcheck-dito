import { Navigate } from "react-router";
import { ROUTE_METHODS_VISUALIZE } from "~/resources/staticRoutes.ts";
import { createRedirectLoader } from "~/utils/redirectLoader";

const to = ROUTE_METHODS_VISUALIZE.url;

export const loader = createRedirectLoader(to, 308);

export default function Redirect() {
  return <Navigate to={to} replace />;
}
