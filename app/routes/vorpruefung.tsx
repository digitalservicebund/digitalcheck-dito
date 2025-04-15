import { ROUTE_PRECHECK } from "~/resources/routeDefinitions";

export const handle = {
  breadcrumb: () => ROUTE_PRECHECK,
};

// We don't return an Outlet here to pass the featureFlags from the root to the child routes
