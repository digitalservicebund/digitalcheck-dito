import { Outlet } from "react-router";
import ErrorBoundaryComponent from "~/layout/ErrorBoundary";
import type { Route } from "./+types/ZFL";
import { ROUTE_ZFL_LANDING } from "./routes";

export default function ZFLLayout() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <ErrorBoundaryComponent error={error} backLink={ROUTE_ZFL_LANDING.url} />
  );
}
