import { useEffect } from "react";

/**
 * Sets `body[data-hydrated="true"]` after mount, as a readiness signal
 * for Playwright. Call from the root of the page-level island that owns
 * the interactive elements tests touch.
 */
export function useHydrationMarker() {
  useEffect(() => {
    document.body.dataset.hydrated = "true";
  }, []);
}
