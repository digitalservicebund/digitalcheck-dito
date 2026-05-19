import type { Page } from "@playwright/test";

/**
 * Wait until React islands have hydrated on the current page.
 *
 * Astro hydrates React islands asynchronously after each full-page load.
 * Interacting with controlled inputs/buttons before hydration is a race —
 * the DOM event fires but React's handler isn't attached yet, and once
 * hydration finishes React resets controlled inputs to their initial state.
 *
 * `PageHeader` is on every route and sets `body[data-hydrated]` in its
 * mount effect, so this attribute is a precise readiness signal — cleaner
 * than waiting on `networkidle`, which Playwright's docs discourage.
 */
export async function waitForHydration(page: Page) {
  await page.locator("body[data-hydrated]").waitFor({ state: "attached" });
}
