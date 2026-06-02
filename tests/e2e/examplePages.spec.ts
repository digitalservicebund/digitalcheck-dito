import { beispiele_visualisierungen } from "@/config/routes";
import { expect, test } from "@playwright/test";
import { ROUTE_REGELUNGEN } from "~/resources/staticRoutes";

const ROUTE_EXAMPLES_DIGITAL_COMMUNICATION =
  "/beispiele/prinzipien/digitale-angebote-fuer-alle-nutzbar-gestalten";
const ROUTE_EXAMPLES_REUSE_DATA_AND_STANDARDS =
  "/beispiele/prinzipien/datenwiederverwendung-benoetigt-einheitliches-recht";
const ROUTE_EXAMPLES_ESTABLISHED_TECHNOLOGIES =
  "/beispiele/prinzipien/etablierte-technologien-ermoeglichen-effiziente-umsetzung";
const ROUTE_EXAMPLES_AUTOMATION =
  "/beispiele/prinzipien/automatisierung-basiert-auf-eindeutigen-regelungen";
const ROUTE_EXAMPLES_DATA_PROTECTION_AND_INFORMATION_SECURITY =
  "/beispiele/prinzipien/datenschutz-und-informationssicherheit-schaffen-vertrauen";
const ROUTE_EXAMPLES_VISUALISATIONS = beispiele_visualisierungen.path;

const principles = [
  ROUTE_EXAMPLES_DIGITAL_COMMUNICATION,
  ROUTE_EXAMPLES_REUSE_DATA_AND_STANDARDS,
  ROUTE_EXAMPLES_ESTABLISHED_TECHNOLOGIES,
  ROUTE_EXAMPLES_AUTOMATION,
  ROUTE_EXAMPLES_DATA_PROTECTION_AND_INFORMATION_SECURITY,
];

test.describe("Prinzipienseiten", () => {
  for (const principle of principles) {
    test(`displays information for principle: ${principle}`, async ({
      page,
    }) => {
      await page.goto(principle);

      const mainContent = page.locator("main");
      await mainContent.waitFor();
      await expect(mainContent).toContainText(
        "Die Prinzipien im Regelungstext",
      );
    });
  }
});

test.describe("Prinzipien Detail", () => {
  for (const principle of principles) {
    test(`displays paragraphs with relevant principles for: ${principle}`, async ({
      page,
    }) => {
      test.skip(principle === ROUTE_EXAMPLES_ESTABLISHED_TECHNOLOGIES); // skipped because we do not have examples for this atm

      await page.goto(principle);

      const highlights = page.locator("mark");
      await expect(highlights.first()).toBeVisible();

      const highlightCount = await highlights.count();
      expect(highlightCount).toBeGreaterThan(0);
    });

    test(`navigates to laws associated with principle: ${principle}`, async ({
      page,
    }) => {
      test.skip(principle === ROUTE_EXAMPLES_ESTABLISHED_TECHNOLOGIES); // skipped because we do not have examples for this atm

      await page.goto(principle);

      const lawLinks = page.locator(`a[href^="${ROUTE_REGELUNGEN}"]`);
      await expect(lawLinks.first()).toBeVisible();

      await lawLinks.first().click();

      await page.waitForLoadState("domcontentloaded");
      await expect(page).toHaveURL(new RegExp(`${ROUTE_REGELUNGEN}/.+`));

      const mainContent = page.getByRole("main");
      await expect(mainContent).toBeVisible();
    });
  }
});

test.describe("Visualizations Overview Page", () => {
  test("displays main heading and subtitle", async ({ page }) => {
    await page.goto(ROUTE_EXAMPLES_VISUALISATIONS);

    const pageTitle = page.getByRole("heading", { level: 1 });
    await expect(pageTitle).toContainText("Beispiele für Visualisierungen");

    const subtitle = page.getByText(
      "Hier finden Sie Visualisierungen, welche Legistinnen und Legisten beim Erarbeiten der Digitaltauglichkeit geholfen haben und veröffentlicht wurden.",
    );
    await expect(subtitle).toBeVisible();
  });

  test("displays visualization details correctly", async ({ page }) => {
    await page.goto(ROUTE_EXAMPLES_VISUALISATIONS);

    const firstVisualization = page
      .locator(String.raw`.flex.max-sm\:flex-col`)
      .first();

    await expect(firstVisualization.locator("img")).toBeVisible();

    await expect(
      firstVisualization.getByText("Art der Visualisierung"),
    ).toBeVisible();
  });

  test("opens images in new tab", async ({ page, context }) => {
    await page.goto(ROUTE_EXAMPLES_VISUALISATIONS);

    const firstImage = page.locator('a[target="_blank"]').first();
    await expect(firstImage).toBeVisible();

    // Test image zoom in new tab
    const [newTab] = await Promise.all([
      context.waitForEvent("page"),
      firstImage.click(),
    ]);

    await newTab.waitForLoadState("load");
    expect(newTab.url()).toContain("visualisierung");
  });

  test("navigation to regelung detail works", async ({ page }) => {
    await page.goto(ROUTE_EXAMPLES_VISUALISATIONS);

    const firstRegelungLink = page
      .locator(`a[href^="${ROUTE_REGELUNGEN}"]`)
      .first();
    await firstRegelungLink.click();

    await expect(page).toHaveURL(new RegExp(`${ROUTE_REGELUNGEN}/.+`));
  });
});
