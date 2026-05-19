import { useEffect } from "react";

/**
 * Sets `body[data-hydrated="true"]` once the calling component has mounted.
 *
 * Astro hydrates React islands asynchronously after each full-page load.
 * E2E tests that interact with controlled inputs or React-only event
 * handlers race against hydration: the DOM event fires before React's
 * handler is attached, and once hydration finishes React resets the
 * controlled value to its initial state.
 *
 * Playwright tests wait for this attribute as a precise readiness signal
 * (cleaner than `networkidle`, which Playwright's docs discourage).
 *
 * Call this from the root component of a page-level React island — the
 * one that owns the form/buttons tests will interact with. Don't call it
 * from shared layout islands (e.g. PageHeader), since those can hydrate
 * before the page content island and trigger the marker too early.
 *
 * Astro full-page navigations reset the DOM, so the attribute is re-set
 * on every page automatically.
 */
export function useHydrationMarker() {
  useEffect(() => {
    document.body.dataset.hydrated = "true";
  }, []);
}
