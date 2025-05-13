// This file is needed for the breadcrumbs to work
import { Outlet, useOutletContext } from "react-router";

export default function Interoperability() {
  // We need to pass the Outlet context to the child routes for the feature flags to work
  return <Outlet context={useOutletContext()} />;
}
