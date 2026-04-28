// @ts-check
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import process from "node:process";
import { generateRoutes } from "./integrations/routeGenerator";

const isPreview = process.env.PUBLIC_STAGE === "preview";
const PREVIEW_BASE_PATH = process.env.PREVIEW_BASE_PATH;

const PRODUCTION_SITE = "https://digitalcheck.bund.de";
const PREVIEW_SITE = "https://digitalservicebund.github.io";

export default defineConfig({
  output: "static",
  site: isPreview ? PREVIEW_SITE : PRODUCTION_SITE,
  base: isPreview ? PREVIEW_BASE_PATH : undefined,
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
  trailingSlash: "never",
  build: {
    assets: "_astro",
  },
});
