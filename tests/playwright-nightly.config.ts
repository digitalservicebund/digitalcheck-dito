import type { PlaywrightTestConfig } from "@playwright/test";
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
  fullyParallel: false,
  projects: allProjects,
  workers: 1,
  retries: 5, // retry more often to allow flaky tests to succeed
  globalTimeout: process.env.CI ? 10 * 60_000 : undefined, // Give nightly tests more time in CI (10 minutes)
  timeout: 20_000,
};

export default config;
