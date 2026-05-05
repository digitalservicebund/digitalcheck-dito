import { barrierefreiheit } from "@/config/routes";
import { expect, test } from "@playwright/test";

test.describe("accessibility page", () => {
  test("displays the content", async ({ page }) => {
    await page.goto(barrierefreiheit.path);
    await expect(
      page.getByRole("heading", {
        name: "Erklärung zur Barrierefreiheit",
      }),
    ).toBeVisible();

    await expect(
      page.getByText("Diese Erklärung gilt für die Webseite des Digitalcheck"),
    ).toBeVisible();
  });
});
