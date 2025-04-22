// This file is needed for the breadcrumbs to work
// We don't return an Outlet here to pass the featureFlags from the root to the child routes

import { Outlet, useOutletContext } from "react-router";

export default function Vorpruefung() {
  return <Outlet context={useOutletContext()} />;
}
