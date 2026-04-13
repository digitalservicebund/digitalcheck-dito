import { PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import configDefault, { allProjects } from "./playwright.config";

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({
  path: path.resolve(__dirname, "../", ".env.test"),
  quiet: true,
});

const config: PlaywrightTestConfig = {
  ...configDefault,
  projects: allProjects,
  testDir: "e2e-onlineDocumentationV2",
  webServer: {
    // Cannot use `npm run start` because it unconditionally exports .env which
    // overrides FEATURE_FLAGS_PATH. Run build via npm (uses project root), then
    // serve directly with the V2 feature flag path.
    command:
      "npm run build && cd .. && export $(grep -v '^#' .env | xargs) && FEATURE_FLAGS_PATH=./tests/feature-flags-onlineDocumentationV2.json NODE_ENV=development PORT=5173 react-router-serve build/server/index.js",
    port: 5173,
  },
};

export default config;
