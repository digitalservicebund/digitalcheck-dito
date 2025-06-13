// This file is needed for the breadcrumbs to work
import { Outlet, useOutletContext } from "react-router";
import { features } from "~/resources/features";
import useFeatureFlag from "~/utils/featureFlags";

export const handle = {
  hideBreadcrumbs: true, // disable breadcrumbs for all child routes
  hasProgressBar: true, // enable progress bar for all child routes
};

export default function PrototypDokumentation() {
  const enableDocumentationPrototype = useFeatureFlag(
    features.enableDocumentationPrototype,
  );

  if (!enableDocumentationPrototype) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw new Response("Feature is not enabled for this environment", {
      status: 404,
    });
  }

  // We need to pass the Outlet context to the child routes for the feature flags to work
  return <Outlet context={useOutletContext()} />;
}
