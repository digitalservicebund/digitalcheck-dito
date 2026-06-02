import type { Page } from "@playwright/test";

/**
 * Wait until the page's React island has hydrated, signalled by
 * `body[data-hydrated]` (set via `useHydrationMarker`). Use before
 * interacting with controlled inputs or React-only handlers.
 */
export async function waitForHydration(page: Page) {
  await page.locator("body[data-hydrated]").waitFor({ state: "attached" });
}
