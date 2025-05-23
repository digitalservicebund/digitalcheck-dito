import { expect, test } from "@playwright/test";
import { ROUTE_SUPPORT } from "~/resources/staticRoutes";

test.describe("test support page", () => {
  test.beforeEach("Go to support page", async ({ page }) => {
    await page.goto(ROUTE_SUPPORT.url);
  });

  test("suppport tabs switch between offerings", async ({
    page,
    browserName,
    isMobile,
  }) => {
    test.skip(browserName === "webkit" && isMobile);

    await page.getByRole("tab", { name: "Schnelle Hilfe" }).click();
    await expect(
      page.getByRole("heading", { name: "IT-Wissen" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Digitale Umsetzung erarbeiten" }),
    ).toBeHidden();

    await page.getByRole("tab", { name: "Umfangreiche Beratung" }).click();
    await expect(page.getByRole("heading", { name: "IT-Wissen" })).toBeHidden();
    await expect(
      page.getByRole("heading", { name: "Digitale Umsetzung erarbeiten" }),
    ).toBeVisible();
  });
});
