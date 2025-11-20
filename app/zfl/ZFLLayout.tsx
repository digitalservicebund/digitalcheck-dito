import { data, Outlet, useLocation } from "react-router";
import getFeatureFlag from "~/utils/featureFlags.server";
import Footer from "./components/Footer";
import PageHeader from "./components/PageHeader";

export function loader() {
  if (!getFeatureFlag("enable-zfl")) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw data("Not found", { status: 404 });
  }
}

const siteMeta = {
  siteName: "Zentrum für Legistik",
  description:
    "Unterstützung bei der Ausarbeitung von Regelungen. Für Vorhaben, die betroffenenzentriert, praxistauglich und digital umsetzbar sind.",
  BASE_URL: "https://zfl.bund.de",
};

export default function ZFLLayout() {
  const location = useLocation();
  const url = `${siteMeta.BASE_URL}${location.pathname}`;
  return (
    <>
      <meta name="description" content={siteMeta.description} />
      <meta property="og:site_name" content={siteMeta.siteName} />
      <meta property="og:description" content={siteMeta.description} />
      <meta property="twitter:description" content={siteMeta.description} />
      <meta property="og:url" content={url} />
      <meta property="twitter:url" content={url} />
      <PageHeader />
      <Outlet />
      <Footer />
    </>
  );
}
