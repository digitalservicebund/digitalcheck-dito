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
    // Use `start:test` (does not source .env) so the inline FEATURE_FLAGS_PATH
    // below wins. `.env.test` provides the other test env vars.
    command:
      "pnpm run build && cd .. && export $(grep -v '^#' .env.test | xargs) && FEATURE_FLAGS_PATH=./tests/feature-flags-onlineDocumentationV2.json NODE_ENV=development PORT=5173 pnpm run start:test",
    port: 5173,
  },
};

export default config;
