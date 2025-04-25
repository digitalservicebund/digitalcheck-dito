import { redirect } from "react-router";
import { ROUTE_PRINCIPLES_FIRST_PRINCIPLE } from "~/resources/staticRoutes.ts";

export function loader() {
  return redirect(ROUTE_PRINCIPLES_FIRST_PRINCIPLE.url);
}
