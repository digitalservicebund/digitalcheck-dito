import { interoperabel } from "@/config/routes";
import { Navigate } from "react-router";
import { createRedirectLoader } from "~/utils/redirectLoader";
import { getTabAnchorLink } from "~/utils/tabs.ts";

const to =
  interoperabel.path +
  getTabAnchorLink("interoperable-loesungen", "interoperable-loesungen");

export const loader = createRedirectLoader(to);

export default function Redirect() {
  return <Navigate to={to} replace />;
}
