import { data, Outlet } from "react-router";
import type { Route } from "./+types/ZFL";
import Footer from "./components/Footer";
import PageHeader from "./components/PageHeader";

export function loader({ request }: Route.LoaderArgs) {
  if (request.url.includes("digitalcheck.bund.de")) {
    throw data("Not found", { status: 404 });
  }
}

export default function ZFLLayout() {
  return (
    <>
      <PageHeader />
      <Outlet />
      <Footer />
    </>
  );
}
