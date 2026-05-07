import { unterstuetzung } from "@/config/routes";
import { expect, test } from "@playwright/test";

test.describe("test support page", () => {
  test.beforeEach("Go to support page", async ({ page }) => {
    await page.goto(unterstuetzung.path);
  });

  test("suppport tabs switch between offerings", async ({ page, isMobile }) => {
    await expect(
      page.getByRole("heading", { name: "IT-Wissen" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Digitale Umsetzung erarbeiten" }),
    ).toBeHidden();

    if (isMobile) {
      await page.getByRole("button", { name: "Schnelle Hilfe" }).click();
      await page.getByRole("option", { name: "Umfangreiche Beratung" }).click();
    } else {
      await page.getByRole("tab", { name: "Umfangreiche Beratung" }).click();
    }

    await expect(page.getByRole("heading", { name: "IT-Wissen" })).toBeHidden();
    await expect(
      page.getByRole("heading", { name: "Digitale Umsetzung erarbeiten" }),
    ).toBeVisible();
  });
});
