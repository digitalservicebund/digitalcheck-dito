import { redirect } from "react-router";
import { ROUTE_FUNDAMENTALS_PRINCIPLES } from "~/resources/staticRoutes.ts";

export function loader() {
  return redirect(ROUTE_FUNDAMENTALS_PRINCIPLES.url);
}
