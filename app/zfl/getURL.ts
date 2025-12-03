import { notOnZFL } from "./notOnZFL";
import { ROUTE_ZFL_LANDING } from "./routes";

export const getZFLURL = ({ path }: { path: string }) =>
  notOnZFL() ? `${ROUTE_ZFL_LANDING.url()}/${path}` : path;
