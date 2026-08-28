// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { generateRoutes } from "astro-route-generator";
import { defineConfig } from "astro/config";
import process from "node:process";

const isPreview = process.env.PUBLIC_STAGE === "preview";
const PREVIEW_BASE_PATH = process.env.PREVIEW_BASE_PATH;

const PRODUCTION_SITE = "https://digitalcheck.bund.de";
const PREVIEW_SITE = "https://digitalservicebund.github.io";
const ZFL_BASE_URL = "https://zfl.bund.de";

const base = isPreview ? PREVIEW_BASE_PATH : undefined;

const rawRedirects = {
  "/interoperabel/loesungen":
    "/interoperabel?tab=interoperable-loesungen#interoperable-loesungen",
  "/grundlagen": "/methoden/fuenf-prinzipien",
  "/grundlagen/fuenf-prinzipien": "/methoden/fuenf-prinzipien",
  "/methoden/ablaeufe-aufgaben-erfassen": `${ZFL_BASE_URL}/werkzeuge/ressourcen/flussdiagramm`,
};

// Some pages were moved to the Zentrum für Legistik
const zflRedirects = {
  "/beispiele/prinzipien/digitale-angebote-fuer-alle-nutzbar-gestalten": `${ZFL_BASE_URL}/werkzeuge/digitaltauglichkeit/beispiele#prinzip-1`,
  "/beispiele/prinzipien/datenwiederverwendung-benoetigt-einheitliches-recht": `${ZFL_BASE_URL}/werkzeuge/digitaltauglichkeit/beispiele#prinzip-2`,
  "/beispiele/prinzipien/etablierte-technologien-ermoeglichen-effiziente-umsetzung": `${ZFL_BASE_URL}/werkzeuge/digitaltauglichkeit/beispiele#prinzip-3`,
  "/beispiele/prinzipien/automatisierung-basiert-auf-eindeutigen-regelungen": `${ZFL_BASE_URL}/werkzeuge/digitaltauglichkeit/beispiele#prinzip-4`,
  "/beispiele/prinzipien/datenschutz-und-informationssicherheit-schaffen-vertrauen": `${ZFL_BASE_URL}/werkzeuge/digitaltauglichkeit/beispiele#prinzip-5`,
  "beispiele/prinzipien": `${ZFL_BASE_URL}/werkzeuge/digitaltauglichkeit/beispiele`,
  "/beispiele/visualisierungen": `${ZFL_BASE_URL}/werkzeuge/ressourcen/visualisierungen`,
  "/grundlagen/digitaltauglichkeit": `${ZFL_BASE_URL}/werkzeuge/digitaltauglichkeit`,
  "/methoden/interview-leitfaden": `${ZFL_BASE_URL}/werkzeuge/ressourcen/interview-leitfaden`,
  "/methoden/interview-leitfaden-schritte": `${ZFL_BASE_URL}/werkzeuge/ressourcen/interview-leitfaden`,
  "/methoden/zustaendige-akteurinnen-auflisten": `${ZFL_BASE_URL}/werkzeuge/ressourcen/interviewleitfaden#halten-sie-die-akteurinnen-und-akteure-in-einer-uebersicht-fest`,
  "/methoden/it-systeme-erfassen": `${ZFL_BASE_URL}/werkzeuge/ressourcen/it-systeme`,
  "/methoden/technische-umsetzbarkeit": `${ZFL_BASE_URL}/werkzeuge/ressourcen/technische-umsetzbarkeit`,
  "/methoden/visualisieren": `${ZFL_BASE_URL}/werkzeuge/ressourcen/flussdiagramm`,
  "/methoden/visualisieren/flussdiagramm": `${ZFL_BASE_URL}/werkzeuge/ressourcen/flussdiagramm`,
};

const redirects = {
  ...Object.fromEntries(
    Object.entries(rawRedirects).map(([from, to]) => [from, (base ?? "") + to]),
  ),
  ...zflRedirects,
};

export default defineConfig({
  output: "static",
  site: isPreview ? PREVIEW_SITE : PRODUCTION_SITE,
  base,
  redirects,
  srcDir: "src",
  publicDir: "public",
  integrations: [
    react(),
    mdx(),
    sitemap(),
    generateRoutes({
      pagesDir: "src/pages",
      output: "src/config/routes.ts",
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@/": new URL("./src/", import.meta.url).pathname,
      },
    },
  },
  build: {
    assets: "_astro",
  },
  prefetch: {
    prefetchAll: true,
  },
  security: {
    csp: false,
  },
  trailingSlash: "never",
});
