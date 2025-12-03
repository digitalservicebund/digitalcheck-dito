import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import zflRoutes from "~/zfl/routes";

test.describe("ZFL a11y", () => {
  zflRoutes.forEach((route) => {
    test(`no a11y issues on ${route.url()}`, async ({ page }) => {
      await page.goto(route.url());
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  });
});
