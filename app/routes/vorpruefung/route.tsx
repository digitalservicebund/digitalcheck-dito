import { Outlet, useOutletContext } from "react-router";

export const handle = {
  hasProgressBar: true, // enable progress bar for all child routes
};

export default function Vorpruefung() {
  // Sets the meta title for all child pages
  // We need to pass the Outlet context to the child routes for the feature flags to work
  return <Outlet context={useOutletContext()} />;
}
