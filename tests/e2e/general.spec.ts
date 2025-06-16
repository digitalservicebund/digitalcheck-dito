import { expect, test } from "@playwright/test";

import {
  ROUTE_A11Y,
  ROUTE_DOCUMENTATION,
  ROUTE_FUNDAMENTALS_PRINCIPLES,
  ROUTE_IMPRINT,
  ROUTE_LANDING,
  ROUTE_METHODS,
  ROUTE_METHODS_COLLECT_IT_SYSTEMS,
  ROUTE_PRECHECK,
  ROUTE_PRIVACY,
  ROUTES,
} from "~/resources/staticRoutes";

test.describe("test breadcrumbs and titles", () => {
  ROUTES.forEach((route, i) => {
    if (route.url.endsWith(".pdf")) {
      return;
    }
    if (
      route.url === ROUTE_LANDING.url ||
      route.url.startsWith(ROUTE_PRECHECK.url)
    ) {
      test(`${route.title} to not have breadcrumbs`, async ({ page }) => {
        await page.goto(route.url);
        await expect(page.getByTestId("breadcrumbs-menu")).toBeHidden();
      });
    } else {
      test(`${route.title} (${i}) has breadcrumbs and title`, async ({
        page,
      }) => {
        await page.goto(route.url);
        await expect(page.getByTestId("breadcrumbs-menu")).toBeVisible();
        await expect(page).toHaveTitle(
          /Digitalcheck: Digitaltaugliche Regelungen erarbeiten$/,
        );
      });
    }
  });
});

test.describe("test meta titles", () => {
  test("landing title is correct", async ({ page }) => {
    await page.goto(ROUTE_LANDING.url);
    await expect(page).toHaveTitle(
      "Digitalcheck: Digitaltaugliche Regelungen erarbeiten",
    );
  });

  test("principles title is correct", async ({ page }) => {
    await page.goto(ROUTE_FUNDAMENTALS_PRINCIPLES.url);
    await expect(page).toHaveTitle(
      "Prinzipien — Digitalcheck: Digitaltaugliche Regelungen erarbeiten",
    );
  });

  test("error page title is correct", async ({ page }) => {
    await page.goto("/does-not-exist");
    await expect(page).toHaveTitle(
      "Fehler — Digitalcheck: Digitaltaugliche Regelungen erarbeiten",
    );
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

  test("list items on landing page are visible", async ({ page }) => {
    await page.goto(ROUTE_LANDING.url);
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

  test("breadcrumb landing link works", async ({ page }) => {
    await page.goto(ROUTE_PRIVACY.url);
    await page
      .getByLabel("navigation")
      .getByRole("link", { name: "Startseite" })
      .click();
    await expect(page).toHaveURL(ROUTE_LANDING.url);
    await page.goto(ROUTE_METHODS_COLLECT_IT_SYSTEMS.url);
    await page
      .getByLabel("navigation")
      .getByRole("link", { name: "Startseite" })
      .click();
    await expect(page).toHaveURL(ROUTE_LANDING.url);
  });

  test("breadcrumb parent link works", async ({ page }) => {
    // using label here as there is a sidebar with the same role
    await page.goto(ROUTE_METHODS_COLLECT_IT_SYSTEMS.url);
    await expect(
      page.getByTestId("breadcrumbs-menu").getByRole("link"),
    ).toHaveCount(2);
    await page.getByTestId("breadcrumbs-menu").getByRole("link").last().click();
    await expect(page).toHaveURL(ROUTE_METHODS.url);
  });

  test("links in landing page work", async ({ page }) => {
    await page.goto(ROUTE_LANDING.url);
    await page.getByRole("link", { name: "Zu „Erarbeiten“" }).click();
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

  ROUTES.forEach((route, i) => {
    if (routesWithProgressBar.includes(route)) {
      return;
    }
    test(`${route.title} (${i}) has no progress bar`, async ({ page }) => {
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

    await expect(navigation.getByText("1")).toContainClass("bg-blue-800");
    await expect(navigation.getByText("2")).toContainClass("border-white");
    await page.goto(ROUTE_METHODS.url);
    await expect(navigation.getByText("2")).toContainClass("bg-blue-800");
    await expect(navigation.getByText("1")).toContainClass("border-white");
    await page.goto(ROUTE_DOCUMENTATION.url);
    await expect(navigation.getByText("3")).toContainClass("bg-blue-800");
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
