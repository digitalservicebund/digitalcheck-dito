import { Navigate } from "react-router";
import { ROUTE_FUNDAMENTALS_PRINCIPLES } from "~/resources/staticRoutes.ts";
import { createRedirectLoader } from "~/utils/redirectLoader";

const to = ROUTE_FUNDAMENTALS_PRINCIPLES.url;

export const loader = createRedirectLoader(to);

export default function Redirect() {
  return <Navigate to={to} replace />;
}
