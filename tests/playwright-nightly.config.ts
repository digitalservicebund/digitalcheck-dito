import { PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
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
};

export default config;
