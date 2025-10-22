import { index, route, type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import {
  ROUTE_ZFL_A11Y,
  ROUTE_ZFL_IMPRINT,
  ROUTE_ZFL_LANDING,
  ROUTE_ZFL_PRIVACY,
  ROUTE_ZFL_TASK_FORCES,
  ROUTE_ZFL_TRAININGS,
} from "./zfl/routes";

export default [
  route(ROUTE_ZFL_LANDING.url, "./zfl/ZFL.tsx", [
    index("./zfl/Index.tsx"),
    route(ROUTE_ZFL_TASK_FORCES.path, "./zfl/TaskForces.tsx"),
    route(ROUTE_ZFL_TRAININGS.path, "./zfl/schulungen.tsx"),
    route(ROUTE_ZFL_IMPRINT.path, "./zfl/Impressum.tsx"),
    route(ROUTE_ZFL_PRIVACY.path, "./zfl/Datenschutz.tsx"),
    route(ROUTE_ZFL_A11Y.path, "./zfl/Barrierefreiheit.tsx"),
  ]),
  ...(await flatRoutes()),
] satisfies RouteConfig;
