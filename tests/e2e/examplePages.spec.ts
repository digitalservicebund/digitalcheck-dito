import { expect, test } from "@playwright/test";
import {
  ROUTE_EXAMPLES_AUTOMATION,
  ROUTE_EXAMPLES_DATA_PROTECTION_AND_INFORMATION_SECURITY,
  ROUTE_EXAMPLES_DIGITAL_COMMUNICATION,
  ROUTE_EXAMPLES_ESTABLISHED_TECHNOLOGIES,
  ROUTE_EXAMPLES_REUSE_DATA_AND_STANDARDS,
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_REGELUNGEN,
} from "~/resources/staticRoutes";

const principles = [
  ROUTE_EXAMPLES_DIGITAL_COMMUNICATION,
  ROUTE_EXAMPLES_REUSE_DATA_AND_STANDARDS,
  ROUTE_EXAMPLES_ESTABLISHED_TECHNOLOGIES,
  ROUTE_EXAMPLES_AUTOMATION,
  ROUTE_EXAMPLES_DATA_PROTECTION_AND_INFORMATION_SECURITY,
];

test.describe("Prinzipienseiten", () => {
  for (const principle of principles) {
    test(`displays information for principle: ${principle.url}`, async ({
      page,
    }) => {
      await page.goto(principle.url);

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
    test(`displays paragraphs with relevant principles for: ${principle.url}`, async ({
      page,
    }) => {
      test.skip(principle === ROUTE_EXAMPLES_ESTABLISHED_TECHNOLOGIES); // skipped because we do not have examples for this atm

      await page.goto(principle.url);

      const highlights = page.locator("mark");
      await expect(highlights.first()).toBeVisible();

      const highlightCount = await highlights.count();
      expect(highlightCount).toBeGreaterThan(0);
    });

    test(`navigates to laws associated with principle: ${principle.url}`, async ({
      page,
      context,
    }) => {
      test.skip(principle === ROUTE_EXAMPLES_ESTABLISHED_TECHNOLOGIES); // skipped because we do not have examples for this atm

      await page.goto(principle.url);

      const lawLinks = page.locator(`a[href^="${ROUTE_REGELUNGEN.url}"]`);
      await expect(lawLinks.first()).toBeVisible();

      const [newTab] = await Promise.all([
        context.waitForEvent("page"),
        lawLinks.first().click(),
      ]);

      await newTab.waitForLoadState("domcontentloaded");
      await expect(newTab).toHaveURL(new RegExp(`${ROUTE_REGELUNGEN.url}/.+`));

      const mainContent = newTab.getByRole("main");
      await expect(mainContent).toBeVisible();
    });
  }
});

test.describe("Visualizations Overview Page", () => {
  test("displays main heading and subtitle", async ({ page }) => {
    await page.goto(ROUTE_EXAMPLES_VISUALISATIONS.url);

    const pageTitle = page.getByRole("heading", { level: 1 });
    await expect(pageTitle).toContainText("Beispiele für Visualisierungen");

    const subtitle = page.getByText(
      "Hier finden Sie Visualisierungen, welche Legistinnen und Legisten beim Erarbeiten der Digitaltauglichkeit geholfen haben und veröffentlicht wurden.",
    );
    await expect(subtitle).toBeVisible();
  });

  test("displays visualization details correctly", async ({ page }) => {
    await page.goto(ROUTE_EXAMPLES_VISUALISATIONS.url);

    const firstVisualization = page.locator(".flex.max-sm\\:flex-col").first();

    await expect(firstVisualization.locator("img")).toBeVisible();

    const metadataSection = firstVisualization.locator(".p-12.bg-gray-100");
    await expect(metadataSection.getByText("Veröffentlicht am")).toBeVisible();
    await expect(
      metadataSection.getByText("Art der Visualisierung"),
    ).toBeVisible();
  });

  test("opens images in new tab", async ({ page, context }) => {
    await page.goto(ROUTE_EXAMPLES_VISUALISATIONS.url);

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
    await page.goto(ROUTE_EXAMPLES_VISUALISATIONS.url);

    const firstRegelungLink = page
      .locator(`a[href^="${ROUTE_REGELUNGEN.url}"]`)
      .first();
    await firstRegelungLink.click();

    await expect(page).toHaveURL(new RegExp(`${ROUTE_REGELUNGEN.url}/.+`));
  });
});
