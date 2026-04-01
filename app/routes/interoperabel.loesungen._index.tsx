import { redirect } from "react-router";
import { ROUTE_INTEROPERABILITY } from "~/resources/staticRoutes.ts";
import { getTabAnchorLink } from "~/utils/tabs.ts";

export function loader() {
  return redirect(
    ROUTE_INTEROPERABILITY.url +
      getTabAnchorLink("interoperable-loesungen", "interoperable-loesungen"),
  );
}
