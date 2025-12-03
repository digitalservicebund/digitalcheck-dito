import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

startTransition(() => {
  const hostname = window.location.hostname;
  if (
    hostname.startsWith("zfl.bund.de") ||
    hostname.startsWith("zentrum-fuer-legistik.bund.de")
  ) {
    console.warn("Skipping hydration for ZFL domain.", hostname);
    return;
  }

  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
