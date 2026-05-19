import type { Page } from "@playwright/test";

/**
 * Wait until all SSR Astro islands on the page have hydrated.
 * Astro removes the `ssr` attribute from `<astro-island>` after hydration.
 * Use before interacting with controlled inputs or React-only handlers.
 */
export async function waitForHydration(page: Page) {
  await page.waitForFunction(
    () => document.querySelectorAll("astro-island[ssr]").length === 0,
  );
}
