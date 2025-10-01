import { Outlet, useOutletContext } from "react-router";
import MetaTitle from "~/components/Meta";
import { ROUTE_PRECHECK } from "~/resources/staticRoutes";

export const handle = {
  hasProgressBar: true, // enable progress bar for all child routes
};

export default function Vorpruefung() {
  // Sets the meta title for all child pages
  // We need to pass the Outlet context to the child routes for the feature flags to work
  return (
    <>
      <MetaTitle prefix={ROUTE_PRECHECK.title} />
      <Outlet context={useOutletContext()} />
    </>
  );
}
