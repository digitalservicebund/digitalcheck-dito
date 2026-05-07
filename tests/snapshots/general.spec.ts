import { expect, test } from "@playwright/test";

import { ROUTES } from "~/resources/staticRoutes";

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test.describe("compare snapshots", () => {
  ROUTES.filter((route) => !route.url.endsWith(".pdf")).forEach((route) => {
    test(route.url, async ({ page }) => {
      // Listen for redirects and update URL if needed
      const response = await page.goto(route.url);

      if (response !== null && [301, 302].includes(response.status())) {
        const redirectedUrl = response.headers()["location"];
        await page.goto(redirectedUrl);
      }

      // wait to finish rendering
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      // wait to make sure the page is fully rendered
      await wait(250);

      await expect(page).toHaveScreenshot({
        maxDiffPixels: 1000,
        fullPage: true,
      });
    });
  });
});

/**
 * This Test will create `screenshots` for the whole application in a screenshots folder in `root`
 *
 * it is skipped by default only enable locally for making the screenshots
 */
test.describe.skip("create screenshots", () => {
  ROUTES.filter((route) => !route.url.endsWith(".pdf")).forEach((route) => {
    test(route.url, async ({ page }) => {
      const url = route.url;
      // Listen for redirects and update URL if needed
      const response = await page.goto(url);

      if (response !== null && [301, 302].includes(response.status())) {
        const url = response.headers()["location"];
        await page.goto(url);
      }

      // wait to finish rendering
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      // wait to make sure the page is fully rendered
      await wait(250);

      const filename = url.slice(1).replaceAll("/", "-") || "index";
      const year = new Date().getFullYear();

      console.log(filename);

      await page.screenshot({
        path: `./screenshots/${filename}-screenshot-${year}.png`,
        fullPage: true,
      });
    });
  });
});
