import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { notOnZFL } from "./zfl/notOnZFL";

startTransition(() => {
  if (!notOnZFL()) {
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
