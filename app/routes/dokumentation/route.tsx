import { Outlet, useOutletContext } from "react-router";

export const handle = {
  hasProgressBar: true,
};

export default function Documentation() {
  // We need to pass the Outlet context to the child routes for the feature flags to work
  return <Outlet context={useOutletContext()} />;
}
