import { ROUTE_METHODS } from "~/resources/routeDefinitions";

export const handle = {
  breadcrumb: () => ROUTE_METHODS,
};

// We don't return an Outlet here to pass the featureFlags from the root to the child routes
