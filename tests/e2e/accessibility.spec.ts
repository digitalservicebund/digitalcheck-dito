import { expect, test } from "@playwright/test";
import { ROUTE_A11Y } from "~/resources/staticRoutes";

test.describe("accessibility page", () => {
  test("displays the content", async ({ page }) => {
    await page.goto(ROUTE_A11Y.url);
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
