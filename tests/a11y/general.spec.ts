import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import {
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_SUPPORT,
  ROUTES,
} from "~/resources/staticRoutes";

test.describe("basic example a11y test", () => {
  ROUTES.filter(
    (route) =>
      ![".pdf", ".xlsx", ".docx", ROUTE_SUPPORT.url].some((r) =>
        route.url.endsWith(r),
      ),
  ).forEach((route, i) => {
    test(`check a11y of ${route.url} (${i})`, async ({ page }) => {
      // Listen for redirects and update URL if needed
      const response = await page.goto(route.url);

      if (response !== null && [301, 302].includes(response.status())) {
        const redirectedUrl = response.headers()["location"];
        await page.goto(redirectedUrl);
      }

      const accessibilityResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityResults.violations).toEqual([]);
    });
  });

  test("check a11y of example pages", async ({ page }) => {
    await page.goto(ROUTE_EXAMPLES_PRINCIPLES.url);

    const principleScanResults = await new AxeBuilder({ page }).analyze();
    expect(principleScanResults.violations).toEqual([]);

    // get URL of first regelung from page
    const regelungUrl = await page.getAttribute(
      '[data-testid="regelung-on-prinzip"] a',
      "href",
    );
    expect(regelungUrl).not.toBeNull();

    if (regelungUrl !== null) {
      await page.goto(regelungUrl);

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    }
  });
});
