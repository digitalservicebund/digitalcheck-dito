import { Navigate } from "react-router";
import { ROUTE_EXAMPLES_DIGITAL_COMMUNICATION } from "~/resources/staticRoutes.ts";
import { createRedirectLoader } from "~/utils/redirectLoader";

const to = ROUTE_EXAMPLES_DIGITAL_COMMUNICATION.url;

// normal SSR build
export const loader = createRedirectLoader(to);

// preview build: use `<Navigate />`
export default function Redirect() {
  return <Navigate to={to} replace />;
}
