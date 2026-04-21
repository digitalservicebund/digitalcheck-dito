import { Navigate } from "react-router";
import { ROUTE_INTEROPERABILITY } from "~/resources/staticRoutes.ts";
import { createRedirectLoader } from "~/utils/redirectLoader";
import { getTabAnchorLink } from "~/utils/tabs.ts";

const to =
  ROUTE_INTEROPERABILITY.url +
  getTabAnchorLink("interoperable-loesungen", "interoperable-loesungen");

export const loader = createRedirectLoader(to);

export default function Redirect() {
  return <Navigate to={to} replace />;
}
