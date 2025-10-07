import { redirect } from "react-router";
import { ROUTE_METHODS_PRINCIPLES } from "~/resources/staticRoutes";

export function loader() {
  return redirect(ROUTE_METHODS_PRINCIPLES.url);
}
