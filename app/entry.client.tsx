import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { isOnZFL } from "./zfl/isOnZFL";

startTransition(() => {
  if (isOnZFL()) {
    console.warn("Skipping hydration for ZFL domain.");
    return;
  }

  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
