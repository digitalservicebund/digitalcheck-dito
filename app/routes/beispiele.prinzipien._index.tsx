import { Navigate } from "react-router";
import { createRedirectLoader } from "~/utils/redirectLoader";

const to =
  "/beispiele/prinzipien/digitale-angebote-fuer-alle-nutzbar-gestalten";

// normal SSR build
export const loader = createRedirectLoader(to);

// preview build: use `<Navigate />`
export default function Redirect() {
  return <Navigate to={to} replace />;
}
