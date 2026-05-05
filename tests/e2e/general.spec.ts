import { expect, test } from "@playwright/test";

import {
  allRoutes,
  barrierefreiheit,
  beispiele_prinzipien,
  datenschutz,
  dokumentation,
  grundlagen,
  home,
  impressum,
  methoden,
  methoden_fuenfPrinzipien,
  type Route,
  vorpruefung,
  vorpruefung_automatisierung,
  vorpruefung_datenaustausch,
  vorpruefung_ergebnis,
  vorpruefung_euBezug,
  vorpruefung_hinweise,
  vorpruefung_itSystem,
  vorpruefung_kommunikation,
  vorpruefung_verpflichtungenFuerBeteiligte,
} from "@/config/routes";

// Order matches the content-defined question sequence in pre-check-questions.ts
const ROUTES_PRECHECK_QUESTIONS = [
  vorpruefung_itSystem,
  vorpruefung_verpflichtungenFuerBeteiligte,
  vorpruefung_datenaustausch,
  vorpruefung_kommunikation,
  vorpruefung_automatisierung,
  vorpruefung_euBezug,
];

function getExpectedTitle(route: Route) {
  const titleSuffix = " — Digitalcheck";

  if (route.path === home.path)
    return "Digitalcheck: Digitaltaugliche Regelungen erarbeiten";
  if (
    route.path.startsWith(beispiele_prinzipien.path) &&
    !route.path.endsWith(beispiele_prinzipien.path)
  ) {
    // All tabs (and their routes) on the principle example pages have the same page title
    return `${beispiele_prinzipien.title}${titleSuffix}`;
  }
  if (
    route.path === grundlagen.path ||
    route.path === "/grundlagen/fuenf-prinzipien"
  ) {
    // this page does not exist and redirects to the sub-page
    return `${methoden_fuenfPrinzipien.title}${titleSuffix}`;
  }
  if (
    route.path.startsWith(dokumentation.path) &&
    route.path !== dokumentation.path
  ) {
    // subpages of documentation
    return `Dokumentation: ${route.title}${titleSuffix}`;
  }

  return `${route.title}${titleSuffix}`;
}

test.describe("page titles", () => {
  allRoutes
    .filter(
      (route) =>
        !route.path.endsWith(".pdf") &&
        !route.path.startsWith(vorpruefung.path),
    )
    .forEach((route) => {
      test(`${route.path} has correct title`, async ({ page }) => {
        await page.goto(route.path);
        await expect(page).toHaveTitle(getExpectedTitle(route));
      });
    });

  // pre-check pages redirect to first unanswered question
  test("pre-check page titles", async ({ page }) => {
    await page.goto(vorpruefung.path);
    await expect(page).toHaveTitle(getExpectedTitle(vorpruefung));

    await page.goto(vorpruefung_hinweise.path);
    await expect(page).toHaveTitle(getExpectedTitle(vorpruefung_hinweise));

    await page.goto(ROUTES_PRECHECK_QUESTIONS[0].path);
    for (const route of ROUTES_PRECHECK_QUESTIONS) {
      await page.waitForURL(route.path);
      await expect(page).toHaveTitle(getExpectedTitle(route));
      await page.getByLabel("Ja").click();
      await page.getByRole("button", { name: "Übernehmen" }).click();
    }

    await expect(page).toHaveURL(vorpruefung_ergebnis.path);
    await expect(page).toHaveTitle(getExpectedTitle(vorpruefung_ergebnis));
  });

  test("error page title is correct", async ({ page }) => {
    await page.goto("/does-not-exist");
    await expect(page).toHaveTitle("Fehler — Digitalcheck");
  });
});

test.describe("landing page", () => {
  test("landing is reachable and has h1", async ({ page }) => {
    await page.goto("/");
    // noinspection CssInvalidPseudoSelector
    await expect(
      page.locator("h1:has-text('Digitaltaugliche Regelungen erarbeiten')"),
    ).toBeVisible();
  });

  test("CTA on landing works", async ({ page }) => {
    await page.goto(home.path);
    await page
      .getByRole("link", { name: "Digitalbezug einschätzen" })
      .first()
      .click();
    await expect(page).toHaveURL(vorpruefung.path);
  });
});

test("footer is displayed", async ({ page }) => {
  await page.goto(home.path);
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

test.describe("links", () => {
  [
    { name: "Datenschutzerklärung", url: datenschutz.path },
    { name: "Barrierefreiheit", url: barrierefreiheit.path },
    { name: "Impressum", url: impressum.path },
  ].forEach(({ name, url }) => {
    test(`link ${url} in footer works`, async ({ page }) => {
      await page.goto(home.path);
      await page.getByRole("link", { name: name }).click();
      await expect(page).toHaveURL(url);
    });
  });

  test("links in landing page work", async ({ page }) => {
    await page.goto(home.path);
    await page.getByRole("link", { name: "Regelung erarbeiten" }).click();
    await expect(page).toHaveURL(methoden.path);
  });

  test("links leading to external pages open in new tab", async ({ page }) => {
    await page.goto(home.path, { waitUntil: "domcontentloaded" });
    const linkLocator = page.getByRole("link", {
      name: "DigitalService GmbH des Bundes",
    });
    await expect(linkLocator).toHaveAttribute("target", "_blank");
  });
});

test.describe("progress bar", () => {
  const routesWithProgressBarOrRedirects = allRoutes.filter(
    (route) =>
      route.path.startsWith(vorpruefung.path) ||
      route.path.startsWith(methoden.path) ||
      route.path.startsWith(dokumentation.path) ||
      route.path === "/grundlagen/fuenf-prinzipien" ||
      route.path === grundlagen.path,
  );
  routesWithProgressBarOrRedirects.forEach((route) => {
    test(`${route.title} has progress bar`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.getByLabel("Digitalcheck-Fortschritt")).toBeVisible();
    });
  });

  allRoutes.forEach((route) => {
    if (routesWithProgressBarOrRedirects.includes(route)) {
      return;
    }

    test(`${route.path} has no progress bar`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.getByLabel("Digitalcheck-Fortschritt")).toBeHidden();
    });
  });

  test("Correct step is highlighted in progress bar", async ({ page }) => {
    const navigation = page.getByRole("navigation", {
      name: "Digitalcheck-Fortschritt",
    });

    const step1 = navigation.getByRole("listitem").filter({ hasText: "1" });
    const step2 = navigation.getByRole("listitem").filter({ hasText: "2" });
    const step3 = navigation.getByRole("listitem").filter({ hasText: "3" });

    await page.goto(vorpruefung.path);
    await expect(navigation).toBeVisible();
    await expect(step1).toContainClass("font-bold");
    await expect(step1).toHaveAttribute("aria-current", "step");
    await expect(step2).not.toContainClass("font-bold");
    await expect(step2).not.toHaveAttribute("aria-current", "step");

    await page.goto(methoden.path);
    await expect(step2).toContainClass("font-bold");
    await expect(step2).toHaveAttribute("aria-current", "step");
    await expect(step1).not.toContainClass("font-bold");
    await expect(step1).not.toHaveAttribute("aria-current", "step");

    await page.goto(dokumentation.path);
    await expect(step3).toContainClass("font-bold");
    await expect(step3).toHaveAttribute("aria-current", "step");
    await expect(step2).not.toContainClass("font-bold");
    await expect(step2).not.toHaveAttribute("aria-current", "step");
  });
});

test.describe("error pages", () => {
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
    await expect(page).toHaveURL(home.path);
  });
});
