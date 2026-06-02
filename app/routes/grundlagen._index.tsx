import { methoden_fuenfPrinzipien } from "@/config/routes";
import { Navigate } from "react-router";
import { createRedirectLoader } from "~/utils/redirectLoader";

const to = methoden_fuenfPrinzipien.path;

export const loader = createRedirectLoader(to);

export default function Redirect() {
  return <Navigate to={to} replace />;
}
