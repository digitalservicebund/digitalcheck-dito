import { expect, test } from "@playwright/test";
import {
  ROUTE_EXAMPLES_AUTOMATION,
  ROUTE_EXAMPLES_DATA_PROTECTION_AND_INFORMATION_SECURITY,
  ROUTE_EXAMPLES_DIGITAL_COMMUNICATION,
  ROUTE_EXAMPLES_ESTABLISHED_TECHNOLOGIES,
  ROUTE_EXAMPLES_REUSE_DATA_AND_STANDARDS,
  ROUTE_METHODS_PRINCIPLES,
} from "~/resources/staticRoutes";

const beispielvorhabenSites = [
  "/beispiele/regelungen/elektronischer-rechtsverkehr-mit-dem-bundesverfassungsgericht-b-verf-g",
  "/beispiele/regelungen/entwurf-eines-gesetzes-zur-staerkung-der-oeffentlichen-gesundheit",
  "/beispiele/regelungen/register-ueber-betreiber-von-unbemannten-fluggeraeten-luft-vg",
  "/beispiele/regelungen/identifikation-der-nutzer-unternehmensregisterverordnung-urv",
  "/beispiele/regelungen/einrichtung-herkunftsnachweisregister-fuer-gas-waerme-und-kaelte-gwkhv",
  "/beispiele/regelungen/modernisierung-des-postrechts",
  "/beispiele/regelungen/entwurf-eines-gesetzes-zur-entwicklung-und-erprobung-eines-online-verfahrens-in-der-zivilgerichtsbarkeit",
];

const sites = [
  ROUTE_METHODS_PRINCIPLES,
  ROUTE_EXAMPLES_DIGITAL_COMMUNICATION,
  ROUTE_EXAMPLES_REUSE_DATA_AND_STANDARDS,
  ROUTE_EXAMPLES_ESTABLISHED_TECHNOLOGIES,
  ROUTE_EXAMPLES_AUTOMATION,
  ROUTE_EXAMPLES_DATA_PROTECTION_AND_INFORMATION_SECURITY,
];

test.describe("Snapshots of all strapi related pages", () => {
  for (const site of sites) {
    test(`displays information for page: ${site.url}`, async ({ page }) => {
      await page.goto(site.url);

      const mainContent = page.locator("main");
      await mainContent.waitFor();
      await expect(mainContent).toMatchAriaSnapshot();
    });
  }

  for (const beispielvorhaben of beispielvorhabenSites) {
    test(`displays information for page: ${beispielvorhaben}`, async ({
      page,
    }) => {
      test.slow();
      await page.goto(beispielvorhaben);

      const mainContent = page.locator("main");
      await mainContent.waitFor();
      await expect(mainContent).toMatchAriaSnapshot();
    });
  }
});
