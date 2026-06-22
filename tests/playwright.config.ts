import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({
  path: path.resolve(__dirname, "../", ".env.test"),
  quiet: true,
});

export const allProjects: PlaywrightTestConfig["projects"] = [
  {
    name: "Desktop Chrome",
    use: {
      ...devices["Desktop Chrome"],
      channel: "chrome",
      contextOptions: {
        permissions: ["clipboard-read", "clipboard-write"],
      },
    },
  },
  {
    name: "Desktop Firefox",
    use: { ...devices["Desktop Firefox"] },
  },
  {
    name: "Desktop Safari",
    use: { ...devices["Desktop Safari"] },
  },
  {
    name: "Desktop Edge",
    use: { ...devices["Desktop Edge"] },
  },
  {
    name: "Mobile Chrome",
    use: {
      ...devices["Pixel 7"],
      contextOptions: {
        permissions: ["clipboard-read", "clipboard-write"],
      },
    },
  },
  // Omit tests with mobile safari due to flaky test results
  // {
  //   name: "Mobile Safari",
  //   use: { ...devices["iPhone 14 Pro"] },
  // },
  {
    name: "Tablet Chrome",
    use: {
      ...devices["Galaxy Tab S4 landscape"],
      contextOptions: {
        permissions: ["clipboard-read", "clipboard-write"],
      },
      isMobile: false,
    },
  },
  {
    name: "Tablet Safari",
    use: { ...devices["iPad Pro 11 landscape"], isMobile: false },
  },
];

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI, // Fail the build on CI if test.only is present
  retries: process.env.CI ? 1 : 0, // Retry on CI only
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined, // Limit the number of workers on CI, use default locally
  timeout: 10_000,
  expect: {
    timeout: 5_000, // Shorter default timeout for assertions
  },
  globalTimeout: process.env.CI ? 5 * 60_000 : undefined, // Stop the whole test run after 5 minutes (in CI)
  use: {
    viewport: { width: 1280, height: 720 },
    acceptDownloads: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  reporter: [
    [process.env.CI ? "blob" : "list"],
    [
      "html",
      {
        outputFolder: "./playwright-report",
        open: process.env.CI ? "never" : "on-failure",
      },
    ],
  ],
  projects: allProjects,
  webServer: process.env.PLAYWRIGHT_USE_DOCKER
    ? {
        command: `docker run --rm -p 8080:8080 -e NGINX_DIR=staging ${process.env.PLAYWRIGHT_DOCKER_IMAGE ?? "digitalcheck-dito:local"}`,
        port: 8080,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
      }
    : {
        command: "pnpm astro build && pnpm astro preview --port 4399",
        port: 4399,
        cwd: path.resolve(__dirname, ".."),
      },
};

export default config;
