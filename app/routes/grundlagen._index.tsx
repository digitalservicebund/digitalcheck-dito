import { redirect } from "react-router";
import { ROUTE_FUNDAMENTALS_DIGITAL_READINESS } from "~/resources/staticRoutes.ts";

export function loader() {
  return redirect(ROUTE_FUNDAMENTALS_DIGITAL_READINESS.url);
}
