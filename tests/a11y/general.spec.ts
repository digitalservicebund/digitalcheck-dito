import { AxeBuilder } from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

import {
  allRoutes,
  beispiele_prinzipien,
  methoden_fuenfPrinzipien,
} from "@/config/routes";
import { checkHeadingsForFlowContent } from "./utils.ts";

async function checkPage(page: Page) {
  const accessibilityResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityResults.violations).toEqual([]);

  await checkHeadingsForFlowContent(page);
}

test.describe("basic example a11y test", () => {
  allRoutes
    .filter((route) => !route.isStagingOnly)
    .forEach((route, i) => {
      test(`check a11y of ${route.path} (${i})`, async ({ page }) => {
        // Listen for redirects and update URL if needed
        const response = await page.goto(route.path);

        if (response !== null && [301, 302].includes(response.status())) {
          const redirectedUrl = response.headers()["location"];
          await page.goto(redirectedUrl);
        }

        await checkPage(page);
      });
    });

  test("check a11y of example pages", async ({ page }) => {
    await page.goto(beispiele_prinzipien.path);

    await checkPage(page);

    // get URL of first regelung from page
    const regelungUrl = await page.getAttribute(
      '[data-testid="regelung-on-prinzip"] a',
      "href",
    );
    expect(regelungUrl).not.toBeNull();

    if (regelungUrl !== null) {
      await page.goto(regelungUrl);

      await checkPage(page);
    }
  });

  test("check a11y of principle pages", async ({ page }) => {
    const principlesUrl = methoden_fuenfPrinzipien.path;
    await page.goto(principlesUrl);

    const principleLinks = page.locator(`a[href^="${principlesUrl}/"]`); // all URLs starting with current URL

    const urlPromises = (await principleLinks.all()).map((element) =>
      element.getAttribute("href"),
    );
    const urls = (await Promise.all(urlPromises)).filter(
      (url) => !!url,
    ) as string[];

    expect(urls.length).toBeGreaterThanOrEqual(5);

    for (const url of urls) {
      await page.goto(url);
      await checkPage(page);
    }
  });
});
