import { datenschutz } from "@/config/routes";
import { expect, test } from "@playwright/test";

test.describe("privacy page", () => {
  test("displays the content", async ({ page }) => {
    await page.goto(datenschutz.path);
    await expect(
      page.getByRole("heading", {
        name: "1.1 Verantwortlicher und Datenschutzbeauftragte/r",
      }),
    ).toBeVisible();
  });
});
