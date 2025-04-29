import { expect, test } from "@playwright/test";
import {
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_EXAMPLES_VISUALISATIONS,
  ROUTE_REGELUNGEN,
} from "~/resources/staticRoutes";

const principles = [
  "digitale-kommunikation-sicherstellen",
  "wiederverwendung-von-daten-und-standards-ermoeglichen",
  "datenschutz-und-informationssicherheit-gewaehrleisten",
  "klare-regelungen-fuer-eine-digitale-ausfuehrung-finden",
  "automatisierung-ermoeglichen",
];

test.describe("Prinzipienseiten", () => {
  for (const principle of principles) {
    test(`displays information for principle: ${principle}`, async ({
      page,
    }) => {
      const url = `${ROUTE_EXAMPLES_PRINCIPLES.url}/${principle}`;
      await page.goto(url);

      const mainContent = page.locator("main");
      await mainContent.waitFor();
      await expect(mainContent).toContainText(
        `Prinzip ${principles.indexOf(principle) + 1} in Regelungstexten`,
      );
    });

    test(`renders navigation links for principle: ${principle}`, async ({
      page,
    }) => {
      const url = `${ROUTE_EXAMPLES_PRINCIPLES.url}/${principle}`;
      await page.goto(url);

      const nextPrincipleIndex = principles.indexOf(principle) + 1;
      if (nextPrincipleIndex < principles.length) {
        const nextPrincipleLink = page.getByRole("link", {
          name: `Prinzip ${nextPrincipleIndex + 1}`,
        });
        await nextPrincipleLink.waitFor();
        await nextPrincipleLink.click();
        await expect(page).toHaveURL(
          `${ROUTE_EXAMPLES_PRINCIPLES.url}/${principles[nextPrincipleIndex]}`,
        );
      }
    });
  }
});

test.describe("Prinzipien Detail", () => {
  for (const principle of principles) {
    test(`displays paragraphs with relevant principles for: ${principle}`, async ({
      page,
    }) => {
      const url = `${ROUTE_EXAMPLES_PRINCIPLES.url}/${principle}`;
      await page.goto(url);

      const highlights = page.locator("mark");
      await expect(highlights.first()).toBeVisible();

      const highlightCount = await highlights.count();
      expect(highlightCount).toBeGreaterThan(0);
    });

    test(`navigates to laws associated with principle: ${principle}`, async ({
      page,
      context,
    }) => {
      const url = `${ROUTE_EXAMPLES_PRINCIPLES.url}/${principle}`;
      await page.goto(url);

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

    const pageTitle = page.getByRole("heading").first();
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
