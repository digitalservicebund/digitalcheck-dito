// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { generateRoutes } from "astro-route-generator";
import { defineConfig } from "astro/config";
import process from "node:process";

const isPreview = process.env.PUBLIC_STAGE === "preview";
const PREVIEW_BASE_PATH = process.env.PREVIEW_BASE_PATH;

const PRODUCTION_SITE = "https://digitalcheck.bund.de";
const PREVIEW_SITE = "https://digitalservicebund.github.io";

const base = isPreview ? PREVIEW_BASE_PATH : undefined;

const rawRedirects = {
  "/beispiele/prinzipien":
    "/beispiele/prinzipien/digitale-angebote-fuer-alle-nutzbar-gestalten",
  "/interoperabel/loesungen":
    "/interoperabel?tab=interoperable-loesungen#interoperable-loesungen",
  "/grundlagen": "/methoden/fuenf-prinzipien",
  "/grundlagen/fuenf-prinzipien": "/methoden/fuenf-prinzipien",
  "/methoden/ablaeufe-aufgaben-erfassen": "/methoden/visualisieren",
};

const redirects = Object.fromEntries(
  Object.entries(rawRedirects).map(([from, to]) => [from, (base ?? "") + to]),
);

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
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "~/": new URL("./app/", import.meta.url).pathname,
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
