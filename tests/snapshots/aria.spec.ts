import { expect, test } from "@playwright/test";

import { allRoutes } from "@/config/routes";

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test.describe("compare main ARIA snapshots", () => {
  allRoutes
    .filter((route) => !route.path.endsWith(".pdf"))
    .forEach((route) => {
      test(route.path, async ({ page }, testinfo) => {
        test.skip(testinfo.project.name.toLowerCase().includes("mobile"));
        // Listen for redirects and update URL if needed
        await page.goto(route.path, { waitUntil: "networkidle" });

        // wait to finish rendering
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

        // extra wait to make sure the page is fully rendered
        await wait(250);
        await expect(page.getByRole("main")).toMatchAriaSnapshot();
      });
    });
});
