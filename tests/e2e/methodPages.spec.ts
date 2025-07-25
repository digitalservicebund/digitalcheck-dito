import { expect, test } from "@playwright/test";
import {
  ROUTE_EXAMPLES,
  ROUTE_EXAMPLES_AUTOMATION,
  ROUTE_EXAMPLES_DATA_PROTECTION_AND_INFORMATION_SECURITY,
  ROUTE_EXAMPLES_DIGITAL_COMMUNICATION,
  ROUTE_EXAMPLES_REUSE_DATA_AND_STANDARDS,
  ROUTE_LANDING,
  ROUTE_METHODS,
  ROUTE_METHODS_COLLECT_IT_SYSTEMS,
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_METHODS_RESPONSIBLE_ACTORS,
  ROUTE_METHODS_TASKS_PROCESSES,
  ROUTE_METHODS_TECHNICAL_FEASIBILITY,
} from "~/resources/staticRoutes";

test.describe("five principles page", () => {
  test.fixme(
    "five principles conditional next step is accurate",
    async ({ page }) => {
      await page.goto(ROUTE_LANDING.url);

      await page.getByRole("link", { name: "Details und Beispiele" }).click();
      await expect(page).toHaveURL(ROUTE_METHODS_PRINCIPLES.url);

      await expect(page.getByRole("main")).toContainText(
        "Vorprüfung: Digitalbezug einschätzen",
      );
      await page
        .getByRole("link", { name: "Digitalbezug einschätzen" })
        .click();
      await expect(page).toHaveURL(ROUTE_LANDING.url);

      await page.getByRole("link", { name: "Zu „Erarbeiten“" }).click();
      await expect(page).toHaveURL(ROUTE_METHODS.url);

      await page.getByRole("link", { name: "Fünf Prinzipien nutzen" }).click();
      await expect(page).toHaveURL(ROUTE_METHODS_PRINCIPLES.url);

      await expect(page.getByRole("main")).toContainText(
        "Technische Umsetzbarkeit sicherstellen",
      );
      await page.getByRole("link", { name: "IT-Auswirkungen prüfen" }).click();
      await expect(page).toHaveURL(ROUTE_METHODS_TECHNICAL_FEASIBILITY.url);
    },
  );

  [
    ROUTE_EXAMPLES.url,
    ROUTE_EXAMPLES_DIGITAL_COMMUNICATION.url,
    ROUTE_EXAMPLES_REUSE_DATA_AND_STANDARDS.url,
    ROUTE_EXAMPLES_DATA_PROTECTION_AND_INFORMATION_SECURITY.url,
    ROUTE_EXAMPLES_AUTOMATION.url,
  ].forEach((url, index) => {
    test.fixme(
      `five principles page ${url} links to examples`,
      async ({ page }) => {
        let attempt = 0;

        // retries to prevent flakiness for firefox
        while (attempt < 3) {
          try {
            await page.goto(ROUTE_METHODS_PRINCIPLES.url, {
              waitUntil: "domcontentloaded",
            });

            const linksOnPage = await page
              .locator('a:has-text("Beispiele betrachten")')
              .all();
            const link = linksOnPage[index];
            await expect(link).toBeVisible({ timeout: 5000 });

            const navigationPromise = page.waitForURL(url);
            await link.click();
            await navigationPromise;

            await expect(page).toHaveURL(url);

            break;
          } catch (error) {
            attempt++;
            console.warn(`Retry ${attempt}: Error navigating to ${url}`);
            if (attempt === 3) {
              throw error;
            }
          }
        }
      },
    );
  });
});

test.describe("method sub page downloads", () => {
  test("responsible actors excel spreadsheet", async ({ page }) => {
    await page.goto(ROUTE_METHODS_RESPONSIBLE_ACTORS.url);

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("link", { name: "Vorlage herunterladen" }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain(".xlsx");
  });

  test("tasks & processes powerpoint", async ({ page, isMobile }) => {
    await page.goto(ROUTE_METHODS_TASKS_PROCESSES.url);

    const downloadPromise = page.waitForEvent("download");
    if (isMobile) {
      await page.getByRole("button", { name: "Intro" }).click();
      await page.getByRole("option", { name: "Anleitung" }).click();
    } else {
      await page.getByRole("tab", { name: "Anleitung" }).click();
    }

    await page.getByRole("link", { name: "PPT-Vorlage runterladen" }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain(".pptx");
  });

  test("it-systems excel spreadsheet", async ({ page }) => {
    await page.goto(ROUTE_METHODS_COLLECT_IT_SYSTEMS.url);

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("link", { name: "Vorlage herunterladen" }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain(".xlsx");
  });

  test("technical feasibility pdf document", async ({ page }) => {
    await page.goto(ROUTE_METHODS_TECHNICAL_FEASIBILITY.url);

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("link", { name: "Vorlage herunterladen" }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain(".pdf");
  });
});
