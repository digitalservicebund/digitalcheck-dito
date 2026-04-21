import { Navigate } from "react-router";
import { ROUTE_METHODS_PRINCIPLES } from "~/resources/staticRoutes";
import { createRedirectLoader } from "~/utils/redirectLoader";

const to = ROUTE_METHODS_PRINCIPLES.url;

export const loader = createRedirectLoader(to);

export default function Redirect() {
  return <Navigate to={to} replace />;
}
