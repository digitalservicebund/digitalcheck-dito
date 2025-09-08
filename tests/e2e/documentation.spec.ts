import { expect, test } from "@playwright/test";
import { ROUTE_DOCUMENTATION } from "~/resources/staticRoutes";

test.describe("documentation process", () => {
  test("downloading documentation document works", async ({ page }) => {
    await page.goto(ROUTE_DOCUMENTATION.url, { waitUntil: "domcontentloaded" });

    const downloadPromise = page.waitForEvent("download");
    await page
      .getByRole("link", { name: "Dokumentation herunterladen" })
      .click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain(
      "Dokumentieren-der-Digitaltauglichkeit_V1-5-1.docx",
    );
  });
});
