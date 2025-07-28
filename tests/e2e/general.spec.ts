import { expect, test } from "@playwright/test";

import {
  type Route,
  ROUTE_A11Y,
  ROUTE_DOCUMENTATION,
  ROUTE_EXAMPLES_PRINCIPLES,
  ROUTE_FUNDAMENTALS,
  ROUTE_FUNDAMENTALS_PRINCIPLES,
  ROUTE_IMPRINT,
  ROUTE_LANDING,
  ROUTE_METHODS,
  ROUTE_PRECHECK,
  ROUTE_PRIVACY,
  ROUTES,
} from "~/resources/staticRoutes";

test.describe("test page titles", () => {
  ROUTES.filter((route) => !route.url.endsWith(".pdf")).forEach((route) => {
    function getExpectedTitle(route: Route) {
      const titleSuffix = " — Digitalcheck";

      if (route.url === ROUTE_LANDING.url)
        return "Digitalcheck: Digitaltaugliche Regelungen erarbeiten";
      if (route.url.startsWith(ROUTE_PRECHECK.url))
        // All pages in the pre-check flow have the same page title
        return `${ROUTE_PRECHECK.title}${titleSuffix}`;
      if (
        route.url.startsWith(ROUTE_EXAMPLES_PRINCIPLES.url) &&
        !route.url.endsWith(ROUTE_EXAMPLES_PRINCIPLES.url)
      ) {
        // All tabs (and their routes) on the principle example pages have the same page title
        return `${ROUTE_EXAMPLES_PRINCIPLES.title}${titleSuffix}`;
      }
      if (route.url === ROUTE_FUNDAMENTALS.url) {
        // this page does not exist and redirects to the sub-page
        return `${ROUTE_FUNDAMENTALS_PRINCIPLES.title}${titleSuffix}`;
      }

      return `${route.title}${titleSuffix}`;
    }

    test(`${route.url} has correct title`, async ({ page }) => {
      await page.goto(route.url);
      await expect(page).toHaveTitle(getExpectedTitle(route));
    });
  });

  test("error page title is correct", async ({ page }) => {
    await page.goto("/does-not-exist");
    await expect(page).toHaveTitle("Fehler — Digitalcheck");
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
    await page.goto(ROUTE_LANDING.url);
    await page
      .getByRole("link", { name: "Digitalbezug einschätzen" })
      .first()
      .click();
    await expect(page).toHaveURL(ROUTE_PRECHECK.url);
  });
});

test("footer is displayed", async ({ page }) => {
  await page.goto(ROUTE_LANDING.url);
  const footerEl = page.getByRole("contentinfo", { name: "Seitenfußbereich" });
  await expect(footerEl).toBeVisible();
  await expect(
    footerEl.getByRole("navigation", { name: "Schnellübersicht" }),
  ).toBeVisible();
  await expect(
    footerEl.getByRole("navigation", { name: "Sitemap" }),
  ).toBeVisible();
  await expect(
    footerEl.getByRole("navigation", { name: "Externe Verlinkungen" }),
  ).toBeVisible();
});

test.describe("test links", () => {
  [
    { name: "Datenschutzerklärung", url: ROUTE_PRIVACY.url },
    { name: "Barrierefreiheit", url: ROUTE_A11Y.url },
    { name: "Impressum", url: ROUTE_IMPRINT.url },
  ].forEach(({ name, url }) => {
    test(`link ${url} in footer works`, async ({ page }) => {
      await page.goto(ROUTE_LANDING.url);
      await page.getByRole("link", { name: name }).click();
      await expect(page).toHaveURL(url);
    });
  });

  test("links in landing page work", async ({ page }) => {
    await page.goto(ROUTE_LANDING.url);
    await page.getByRole("link", { name: "Regelung erarbeiten" }).click();
    await expect(page).toHaveURL(ROUTE_METHODS.url);
  });

  test("links leading to external pages open in new tab", async ({ page }) => {
    await page.goto(ROUTE_LANDING.url);
    const link = page.getByRole("link", {
      name: "DigitalService GmbH des Bundes",
    });

    await link.click();
    await expect(page).toHaveURL(ROUTE_LANDING.url, {
      timeout: 5000,
    });
  });
});

test.describe("test progress bar", () => {
  const routesWithProgressBar = ROUTES.filter(
    (route) =>
      route.url.startsWith(ROUTE_PRECHECK.url) ||
      route.url.startsWith(ROUTE_METHODS.url) ||
      route.url.startsWith(ROUTE_DOCUMENTATION.url),
  );
  routesWithProgressBar.forEach((route) => {
    test(`${route.title} has progress bar`, async ({ page }) => {
      await page.goto(route.url);
      await expect(page.getByLabel("Digitalcheck-Fortschritt")).toBeVisible();
    });
  });

  ROUTES.forEach((route) => {
    if (routesWithProgressBar.includes(route)) {
      return;
    }
    test(`${route.url} has no progress bar`, async ({ page }) => {
      await page.goto(route.url);
      await expect(page.getByLabel("Digitalcheck-Fortschritt")).toBeHidden();
    });
  });

  test("Correct step is highlighted in progress bar", async ({ page }) => {
    await page.goto(ROUTE_PRECHECK.url);
    const navigation = page.getByRole("navigation", {
      name: "Digitalcheck-Fortschritt",
    });
    await expect(navigation).toBeVisible();

    await expect(navigation.getByText("1")).toContainClass("bg-ds-dark-blue");
    await expect(navigation.getByText("2")).toContainClass("border-white");
    await page.goto(ROUTE_METHODS.url);
    await expect(navigation.getByText("2")).toContainClass("bg-ds-dark-blue");
    await expect(navigation.getByText("1")).toContainClass("border-white");
    await page.goto(ROUTE_DOCUMENTATION.url);
    await expect(navigation.getByText("3")).toContainClass("bg-ds-dark-blue");
    await expect(navigation.getByText("2")).toContainClass("border-white");
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
    await expect(page).toHaveURL(ROUTE_LANDING.url);
  });
});
