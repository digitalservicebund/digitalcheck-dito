import { expect, test } from "@playwright/test";
import { ROUTE_PRIVACY } from "~/resources/staticRoutes";

test.describe("privacy page", () => {
  test("displays the content", async ({ page }) => {
    await page.goto(ROUTE_PRIVACY.url);
    await expect(
      page.getByRole("heading", {
        name: "1.1 Verantwortlicher und Datenschutzbeauftragte/r",
      }),
    ).toBeVisible();
  });
});
