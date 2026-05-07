import { methoden_visualisieren } from "@/config/routes";
import { Navigate } from "react-router";
import { createRedirectLoader } from "~/utils/redirectLoader";

const to = methoden_visualisieren.path;

export const loader = createRedirectLoader(to, 308);

export default function Redirect() {
  return <Navigate to={to} replace />;
}
