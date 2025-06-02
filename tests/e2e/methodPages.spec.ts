import { expect, test } from "@playwright/test";
import {
  ROUTE_DOCUMENTATION,
  ROUTE_EXAMPLES,
  ROUTE_EXAMPLES_AUTOMATION,
  ROUTE_EXAMPLES_CLEAR_REGULATIONS,
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

test.describe("test method page link flow", () => {
  test.fixme("happy path method pages", async ({ page }, testInfo) => {
    // This test takes a bit longer to click through the method process, so we up the limit for this test only to 20 seconds.
    testInfo.setTimeout(20000);

    await page.goto(ROUTE_METHODS.url);
    await expect(page.getByRole("main")).toContainText(
      "Erarbeiten eines digitaltauglichen Regelungsvorhabens",
    );

    await page.getByRole("link", { name: "Ansprechpersonen finden" }).click();
    await expect(page).toHaveURL(ROUTE_METHODS_RESPONSIBLE_ACTORS.url);

    await page
      .getByRole("link", { name: "Aufgaben und Abläufe klären" })
      .click();
    await expect(page).toHaveURL(ROUTE_METHODS_TASKS_PROCESSES.url);

    await page.getByRole("link", { name: "IT-Landschaft verstehen" }).click();
    await expect(page).toHaveURL(ROUTE_METHODS_COLLECT_IT_SYSTEMS.url);

    await page.getByRole("link", { name: "Fünf Prinzipien nutzen" }).click();
    await expect(page).toHaveURL(ROUTE_METHODS_PRINCIPLES.url);

    await page.getByRole("link", { name: "IT-Auswirkungen prüfen" }).click();
    await expect(page).toHaveURL(ROUTE_METHODS_TECHNICAL_FEASIBILITY.url);

    await page.getByRole("link", { name: "Zu „Erarbeiten“" }).click();
    await expect(page).toHaveURL(ROUTE_METHODS.url);
  });
});

test.describe("test method sub pages", () => {
  test.beforeEach("Go to methods page", async ({ page }) => {
    await page.goto(ROUTE_METHODS.url);
    await page.waitForURL(ROUTE_METHODS.url);
  });

  // NOTE: 70-tage tmp skipped
  test.skip("links to responsible actors", async ({ page }) => {
    await page.getByRole("link", { name: "Ansprechpersonen finden" }).click();
    await expect(page).toHaveURL(ROUTE_METHODS_RESPONSIBLE_ACTORS.url);
    await expect(page.getByRole("main")).toContainText(
      "Zuständige Akteurinnen und Akteure auflisten",
    );
  });

  // NOTE: 70-tage tmp skipped
  test.skip("links to tasks & processes", async ({ page }) => {
    await page
      .getByRole("link", { name: "Aufgaben und Abläufe klären" })
      .click();
    await expect(page).toHaveURL(ROUTE_METHODS_TASKS_PROCESSES.url);
    await expect(page.getByRole("main")).toContainText(
      "Aufgaben und Abläufe gemeinsam erfassen",
    );
  });

  // NOTE: 70-tage tmp skipped
  test.skip("links to collect it-systems", async ({ page }) => {
    await page.getByRole("link", { name: "IT-Landschaft verstehen" }).click();
    await expect(page).toHaveURL(ROUTE_METHODS_COLLECT_IT_SYSTEMS.url);
    await expect(page.getByRole("main")).toContainText(
      "IT-Systeme gemeinsam erfassen",
    );
  });

  test.skip("links to five principles", async ({ page }) => {
    await page.getByRole("link", { name: "Fünf Prinzipien nutzen" }).click();
    await expect(page).toHaveURL(ROUTE_METHODS_PRINCIPLES.url);
    await expect(page.getByRole("main")).toContainText(
      "Fünf Prinzipien für digitaltaugliche Gesetzgebung",
    );
  });

  // NOTE: 70-tage tmp skipped
  test.skip("links to technical feasibility", async ({ page }) => {
    await page.getByRole("link", { name: "IT-Auswirkungen prüfen" }).click();
    await expect(page).toHaveURL(ROUTE_METHODS_TECHNICAL_FEASIBILITY.url);
    await expect(page.getByRole("main")).toContainText(
      "Technische Umsetzbarkeit sicherstellen",
    );
  });

  test("method page links to documentation", async ({ page }) => {
    await page.getByRole("link", { name: "Zu „Dokumentieren“" }).click();
    await expect(page).toHaveURL(ROUTE_DOCUMENTATION.url);
  });
});

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
    ROUTE_EXAMPLES_CLEAR_REGULATIONS.url,
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

  test("tasks & processes excel spreadsheet", async ({ page }) => {
    await page.goto(ROUTE_METHODS_TASKS_PROCESSES.url);

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("link", { name: "Vorlage herunterladen" }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain(".xlsx");
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
