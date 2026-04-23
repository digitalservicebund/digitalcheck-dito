// @ts-check
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import process from "node:process";

const isPreview = !!process.env.PREVIEW_BUILD;
const PREVIEW_BASE_PATH =
  process.env.PREVIEW_BASE_PATH?.replace(/\/?$/, "/") ?? "/";

const PRODUCTION_SITE = "https://digitalcheck.bund.de";
const PREVIEW_SITE = "https://digitalservicebund.github.io";

export default defineConfig({
  output: "static",
  site: isPreview ? PREVIEW_SITE : PRODUCTION_SITE,
  base: isPreview ? PREVIEW_BASE_PATH : undefined,
  srcDir: "src",
  publicDir: "public",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "~/": new URL("./app/", import.meta.url).pathname,
        "@/": new URL("./src/", import.meta.url).pathname,
      },
    },
    define: {
      "import.meta.env.PREVIEW_BUILD": JSON.stringify(
        process.env.PREVIEW_BUILD,
      ),
    },
  },
  trailingSlash: "never",
  build: {
    assets: "_astro",
  },
});
