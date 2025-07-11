import { devices, PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../", ".env.test") });

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
  // Omit tests with mobile chrome due to very flaky test results
  // {
  //   name: "Mobile Chrome",
  //   use: { ...devices["Pixel 7"] },
  // },
  {
    name: "Mobile Safari",
    use: { ...devices["iPhone 14 Pro"] },
  },
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

const defaultProjects = allProjects.filter(
  (project) => project.name === "Desktop Chrome",
);

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI, // Fail the build on CI if test.only is present
  retries: process.env.CI ? 1 : 0, // Retry on CI only
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined, // Limit the number of workers on CI, use default locally
  timeout: 5000,
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
  projects: defaultProjects,
  webServer: {
    // We're testing the built code, but set the NODE_ENV to enable mocks
    command: "npm run build && NODE_ENV=development PORT=5172 npm run start",
    port: 5172,
  },
};

export default config;
