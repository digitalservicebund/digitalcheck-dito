// @ts-check
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

export default defineConfig({
  output: "static",
  site: isPreview ? PREVIEW_SITE : PRODUCTION_SITE,
  base: isPreview ? PREVIEW_BASE_PATH : undefined,
  redirects: {
    "/beispiele/prinzipien":
      "/beispiele/prinzipien/digitale-angebote-fuer-alle-nutzbar-gestalten",
    "/interoperabel/loesungen":
      "/interoperabel?tab=interoperable-loesungen#interoperable-loesungen",
    "/grundlagen": "/methoden/fuenf-prinzipien",
    "/grundlagen/fuenf-prinzipien": "/methoden/fuenf-prinzipien",
    "/methoden/ablaeufe-aufgaben-erfassen": "/methoden/visualisieren",
  },
  srcDir: "src",
  publicDir: "public",
  integrations: [
    react(),
    sitemap(),
    generateRoutes({
      pagesDir: "src/pages",
      output: "src/config/routes.ts",
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      tsconfigPaths: false,
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
