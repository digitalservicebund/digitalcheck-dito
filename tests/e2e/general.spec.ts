import { expect, test } from "@playwright/test";
import allRoutes from "~/resources/allRoutes";
import { preCheck } from "~/resources/content/vorpruefung";
import * as staticRoutes from "~/resources/staticRoutes";

test.describe("test breadcrumbs and titles", () => {
  test("landing page to not have breadcrumbs", async ({ page }) => {
    await page.goto(allRoutes[0].url);
    await expect(page.getByTestId("breadcrumbs-menu")).toBeHidden();
  });

  // Remove landing page
  allRoutes.slice(1).forEach((route) => {
    if (route.url.endsWith(".pdf")) {
      return;
    }
    test(`${route.url} has breadcrumbs and title`, async ({ page }) => {
      await page.goto(route.url);
      await expect(page.getByTestId("breadcrumbs-menu")).toBeVisible();
      await expect(page).toHaveTitle(
        /Digitalcheck: Digitaltaugliche Regelungen erarbeiten$/,
      );
    });
  });
});

test.describe("test landing page", () => {
  test("landing is reachable and has h1", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("h1:has-text('Digitaltaugliche Regelungen erarbeiten')"),
    ).toBeVisible();
  });

  test("CTA on landing works", async ({ page }) => {
    await page.goto(staticRoutes.ROUTE_LANDING.url);
    await page.getByRole("link", { name: "Digitalbezug einschätzen" }).click();
    await expect(page).toHaveURL(staticRoutes.ROUTE_PRECHECK.url);
  });

  test("list items on landing page are visible", async ({ page }) => {
    await page.goto(staticRoutes.ROUTE_LANDING.url);
    await expect(page.getByRole("main")).toContainText(
      "1Vorprüfung: Digitalbezug einschätzen",
    );
    await expect(page.getByRole("main")).toContainText(
      "2Erarbeiten des Regelungsvorhabens",
    );
    await expect(page.getByRole("main")).toContainText(
      "3Dokumentieren des Regelungsvorhabens",
    );
    await expect(page.getByRole("main")).toContainText("4Prüfen durch den NKR");
  });
});

test.describe("test links", () => {
  [
    { name: "Datenschutzerklärung", url: staticRoutes.ROUTE_PRIVACY.url },
    { name: "Barrierefreiheit", url: staticRoutes.ROUTE_A11Y.url },
    { name: "Impressum", url: staticRoutes.ROUTE_IMPRINT.url },
  ].forEach(({ name, url }) => {
    test(`link ${url} in footer works`, async ({ page }) => {
      await page.goto(staticRoutes.ROUTE_LANDING.url);
      await page.getByRole("link", { name: name }).click();
      await expect(page).toHaveURL(url);
    });
  });

  test("breadcrumb landing link works", async ({ page }) => {
    await page.goto(staticRoutes.ROUTE_PRECHECK.url);
    await page
      .getByLabel("navigation")
      .getByRole("link", { name: "Startseite" })
      .click();
    await expect(page).toHaveURL(staticRoutes.ROUTE_LANDING.url);
    await page.goto(preCheck.questions[0].url);
    // using label here as there is a sidebar with the same role
    await page
      .getByLabel("navigation")
      .getByRole("link", { name: "Startseite" })
      .click();
    await expect(page).toHaveURL(staticRoutes.ROUTE_LANDING.url);
  });

  test("breadcrumb parent link works", async ({ page }) => {
    // using label here as there is a sidebar with the same role
    await page.goto(preCheck.questions[0].url);
    await expect(
      page.getByTestId("breadcrumbs-menu").getByRole("link"),
    ).toHaveCount(2);
    await page.getByTestId("breadcrumbs-menu").getByRole("link").last().click();
    await expect(page).toHaveURL(staticRoutes.ROUTE_PRECHECK.url);
  });

  test("links in landing page work", async ({ page }) => {
    await page.goto(staticRoutes.ROUTE_LANDING.url);
    await page.getByRole("link", { name: "Zu „Erarbeiten“" }).click();
    await expect(page).toHaveURL(staticRoutes.ROUTE_METHODS.url);
  });

  test("links leading to external pages open in new tab", async ({ page }) => {
    await page.goto(staticRoutes.ROUTE_LANDING.url);
    const link = page.getByRole("link", {
      name: "DigitalService GmbH des Bundes",
    });

    await link.click();
    await expect(page).toHaveURL(staticRoutes.ROUTE_LANDING.url, {
      timeout: 5000,
    });
  });
});

test.describe("test error pages", () => {
  test("error page is displayed for 404s", async ({ page }) => {
    const response = await page.goto("/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("main")).toContainText(
      "404Seite konnte nicht gefunden werden",
    );
  });

  test("can return to landing page from an error", async ({ page }) => {
    const response = await page.goto("/does-not-exist");
    expect(response?.status()).toBe(404);
    await page.getByRole("link", { name: "Zurück zur Startseite" }).click();
    await expect(page).toHaveURL(staticRoutes.ROUTE_LANDING.url);
  });
});
