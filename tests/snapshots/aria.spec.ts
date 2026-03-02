import { expect, test } from "@playwright/test";

import { ROUTES } from "~/resources/staticRoutes";

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test.describe("compare main ARIA snapshots", () => {
  ROUTES.filter((route) => !route.url.endsWith(".pdf")).forEach((route) => {
    test(route.url, async ({ page }, testinfo) => {
      test.skip(testinfo.project.name.toLowerCase().includes("mobile"));
      // Listen for redirects and update URL if needed
      await page.goto(route.url, { waitUntil: "networkidle" });

      // wait to finish rendering
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      // extra wait to make sure the page is fully rendered
      await wait(250);
      await expect(page.getByRole("main")).toMatchAriaSnapshot();
    });
  });
});
