import { redirect } from "react-router";
import { ROUTE_EXAMPLES_DIGITAL_COMMUNICATION } from "~/resources/staticRoutes.ts";

export function loader() {
  return redirect(ROUTE_EXAMPLES_DIGITAL_COMMUNICATION.url);
}
