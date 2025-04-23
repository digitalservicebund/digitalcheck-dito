import { redirect } from "react-router";
import allRoutes from "~/resources/allRoutes.ts";
import { ROUTE_PRINCIPLES } from "~/resources/staticRoutes.ts";

export function loader() {
  return redirect(
    allRoutes.filter((route) => route.parent === ROUTE_PRINCIPLES.url)[0].url,
  );
}
