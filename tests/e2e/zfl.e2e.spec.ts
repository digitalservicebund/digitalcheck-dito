import { expect, test } from "@playwright/test";
import { ZFL_TITLE } from "~/zfl/constants";
import {
  ROUTE_ZFL_A11Y,
  ROUTE_ZFL_BEGLEITUNGEN,
  ROUTE_ZFL_IMPRINT,
  ROUTE_ZFL_LANDING,
  ROUTE_ZFL_PRIVACY,
  ROUTE_ZFL_TRAININGS,
} from "~/zfl/routes";

test.describe("ZFL landing and header", () => {
  test("index loads and displays the header", async ({ page }) => {
    await page.goto(ROUTE_ZFL_LANDING.url());
    await expect(
      page.getByRole("heading", { name: "Bessere Rechtsetzung" }),
    ).toBeVisible();
  });

  test("Desktop header links navigate to Begleitungen and Schulungen", async ({
    page,
  }) => {
    test.skip(
      test.info().project.name.includes("Mobile"),
      "Skipping desktop nav test on mobile.",
    );
    await page.goto(ROUTE_ZFL_LANDING.url());
    const nav = page.getByTestId("desktop-nav");

    await nav.getByRole("link", { name: ROUTE_ZFL_BEGLEITUNGEN.title }).click();
    await expect(page).toHaveURL(ROUTE_ZFL_BEGLEITUNGEN.url());
    await expect(
      page.getByRole("heading", { name: /Begleitung/i }),
    ).toBeVisible();

    await page.getByRole("link", { name: ZFL_TITLE }).click();
    await expect(page).toHaveURL(ROUTE_ZFL_LANDING.url());

    await nav.getByRole("link", { name: ROUTE_ZFL_TRAININGS.title }).click();
    await expect(page).toHaveURL(ROUTE_ZFL_TRAININGS.url());
    await expect(
      page.getByRole("heading", {
        name: ROUTE_ZFL_TRAININGS.title,
        exact: true,
      }),
    ).toBeVisible();
  });
});

test.describe("ZFL footer links", () => {
  test("footer internal links work", async ({ page }) => {
    await page.goto(ROUTE_ZFL_LANDING.url());
    const footer = page.getByRole("navigation", { name: "Schnellübersicht" });
    await expect(footer).toBeVisible();

    await footer
      .getByRole("link", { name: ROUTE_ZFL_BEGLEITUNGEN.title })
      .click();
    await expect(page).toHaveURL(ROUTE_ZFL_BEGLEITUNGEN.url());

    await footer.getByRole("link", { name: ROUTE_ZFL_TRAININGS.title }).click();
    await expect(page).toHaveURL(ROUTE_ZFL_TRAININGS.url());

    await footer.getByRole("link", { name: ROUTE_ZFL_IMPRINT.title }).click();
    await expect(page).toHaveURL(ROUTE_ZFL_IMPRINT.url());

    await footer.getByRole("link", { name: ROUTE_ZFL_PRIVACY.title }).click();
    await expect(page).toHaveURL(ROUTE_ZFL_PRIVACY.url());

    await footer.getByRole("link", { name: ROUTE_ZFL_A11Y.title }).click();
    await expect(page).toHaveURL(ROUTE_ZFL_A11Y.url());
  });
});

test.describe("ZFL 404 within /zfl", () => {
  test("renders ZFL header/footer and back button links to ZFL landing", async ({
    page,
  }) => {
    const response = await page.goto(
      `${ROUTE_ZFL_LANDING.url()}/does-not-exist`,
    );
    expect(response?.status()).toBe(404);

    // header from ZFL layout still visible
    await expect(
      page.getByRole("link", { name: "Logo des Bundes" }),
    ).toBeVisible();

    await expect(page.locator("#error")).toBeVisible();
    await page.getByRole("link", { name: "Zurück zur Startseite" }).click();
    await expect(page).toHaveURL(ROUTE_ZFL_LANDING.url());
  });
});

test.describe("privacy page", () => {
  test("displays the content", async ({ page }) => {
    await page.goto(ROUTE_ZFL_PRIVACY.url());
    await expect(
      page.getByRole("heading", {
        name: "1.1 Verantwortlicher und Datenschutzbeauftragte/r",
      }),
    ).toBeVisible();
  });
});

test.describe("accessibility page", () => {
  test("displays the content", async ({ page }) => {
    await page.goto(ROUTE_ZFL_A11Y.url());
    await expect(
      page.getByRole("heading", {
        name: "Erklärung zur Barrierefreiheit",
      }),
    ).toBeVisible();

    await expect(
      page.getByText(
        "Diese Erklärung gilt für die Webseite des Zentrums für Legistik",
      ),
    ).toBeVisible();
  });
});
