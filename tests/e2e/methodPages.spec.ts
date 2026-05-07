import {
  beispiele,
  methoden,
  methoden_fuenfPrinzipien,
  methoden_itSystemeErfassen,
  methoden_technischeUmsetzbarkeit,
  methoden_zustaendigeAkteurinnenAuflisten,
} from "@/config/routes";
import { expect, test } from "@playwright/test";

const ROUTE_LANDING = "/";
const ROUTE_EXAMPLES = beispiele.path;
const ROUTE_EXAMPLES_DIGITAL_COMMUNICATION =
  "/beispiele/prinzipien/digitale-angebote-fuer-alle-nutzbar-gestalten";
const ROUTE_EXAMPLES_REUSE_DATA_AND_STANDARDS =
  "/beispiele/prinzipien/datenwiederverwendung-benoetigt-einheitliches-recht";
const ROUTE_EXAMPLES_DATA_PROTECTION_AND_INFORMATION_SECURITY =
  "/beispiele/prinzipien/datenschutz-und-informationssicherheit-schaffen-vertrauen";
const ROUTE_EXAMPLES_AUTOMATION =
  "/beispiele/prinzipien/automatisierung-basiert-auf-eindeutigen-regelungen";
const ROUTE_METHODS = methoden.path;
const ROUTE_METHODS_PRINCIPLES = methoden_fuenfPrinzipien.path;
const ROUTE_METHODS_COLLECT_IT_SYSTEMS = methoden_itSystemeErfassen.path;
const ROUTE_METHODS_RESPONSIBLE_ACTORS =
  methoden_zustaendigeAkteurinnenAuflisten.path;
const ROUTE_METHODS_TECHNICAL_FEASIBILITY =
  methoden_technischeUmsetzbarkeit.path;

test.describe("five principles page", () => {
  test.fixme("five principles conditional next step is accurate", async ({
    page,
  }) => {
    await page.goto(ROUTE_LANDING);

    await page.getByRole("link", { name: "Details und Beispiele" }).click();
    await expect(page).toHaveURL(ROUTE_METHODS_PRINCIPLES);

    await expect(page.getByRole("main")).toContainText(
      "Vorprüfung: Digitalbezug einschätzen",
    );
    await page.getByRole("link", { name: "Digitalbezug einschätzen" }).click();
    await expect(page).toHaveURL(ROUTE_LANDING);

    await page.getByRole("link", { name: "Zu „Erarbeiten“" }).click();
    await expect(page).toHaveURL(ROUTE_METHODS);

    await page.getByRole("link", { name: "Fünf Prinzipien nutzen" }).click();
    await expect(page).toHaveURL(ROUTE_METHODS_PRINCIPLES);

    await expect(page.getByRole("main")).toContainText(
      "Technische Umsetzbarkeit sicherstellen",
    );
    await page.getByRole("link", { name: "IT-Auswirkungen prüfen" }).click();
    await expect(page).toHaveURL(ROUTE_METHODS_TECHNICAL_FEASIBILITY);
  });

  [
    ROUTE_EXAMPLES,
    ROUTE_EXAMPLES_DIGITAL_COMMUNICATION,
    ROUTE_EXAMPLES_REUSE_DATA_AND_STANDARDS,
    ROUTE_EXAMPLES_DATA_PROTECTION_AND_INFORMATION_SECURITY,
    ROUTE_EXAMPLES_AUTOMATION,
  ].forEach((url, index) => {
    test.fixme(`five principles page ${url} links to examples`, async ({
      page,
    }) => {
      let attempt = 0;

      // retries to prevent flakiness for firefox
      while (attempt < 3) {
        try {
          await page.goto(ROUTE_METHODS_PRINCIPLES, {
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
    });
  });
});

test.describe("method sub page downloads", () => {
  test("responsible actors excel spreadsheet", async ({ page }) => {
    await page.goto(ROUTE_METHODS_RESPONSIBLE_ACTORS);

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("link", { name: "Vorlage herunterladen" }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain(".xlsx");
  });

  test("it-systems excel spreadsheet", async ({ page }) => {
    await page.goto(ROUTE_METHODS_COLLECT_IT_SYSTEMS);

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("link", { name: "Vorlage herunterladen" }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain(".xlsx");
  });

  test("technical feasibility pdf document", async ({ page }) => {
    await page.goto(ROUTE_METHODS_TECHNICAL_FEASIBILITY);

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("link", { name: "Vorlage herunterladen" }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain(".pdf");
  });
});
