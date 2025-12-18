import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import {
  ROUTE_ZFL_A11Y,
  ROUTE_ZFL_BEGLEITUNGEN,
  ROUTE_ZFL_IMPRINT,
  ROUTE_ZFL_LANDING,
  ROUTE_ZFL_NUMBERS_FACTS,
  ROUTE_ZFL_PRIVACY,
  ROUTE_ZFL_TRAININGS,
} from "./zfl/routes";

export default [
  layout("./zfl/ZFLLayout.tsx", [
    route(ROUTE_ZFL_LANDING.path, "./zfl/ZFL.tsx", [
      index("./zfl/Index.tsx"),
      route(ROUTE_ZFL_BEGLEITUNGEN.path, "./zfl/Begleitungen.tsx"),
      route(ROUTE_ZFL_TRAININGS.path, "./zfl/Schulungen.tsx"),
      route(ROUTE_ZFL_IMPRINT.path, "./zfl/Impressum.tsx"),
      route(ROUTE_ZFL_PRIVACY.path, "./zfl/Datenschutz.tsx"),
      route(ROUTE_ZFL_A11Y.path, "./zfl/Barrierefreiheit.tsx"),
      route(ROUTE_ZFL_NUMBERS_FACTS.path, "./zfl/ZahlenUndFakten.tsx"),
      route("*", "./zfl/NotFound.tsx"),
    ]),
  ]),
  ...(await flatRoutes()),
] satisfies RouteConfig;
