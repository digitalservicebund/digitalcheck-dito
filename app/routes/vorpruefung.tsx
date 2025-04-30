// This file is needed for the breadcrumbs to work
import { Outlet, useOutletContext } from "react-router";

export const handle = {
  hideBreadcrumbs: true, // disable breadcrumbs for all child routes
  hasProgressBar: true, // enable progress bar for all child routes
};

export default function Vorpruefung() {
  // We need to pass the Outlet context to the child routes for the feature flags to work
  return <Outlet context={useOutletContext()} />;
}
