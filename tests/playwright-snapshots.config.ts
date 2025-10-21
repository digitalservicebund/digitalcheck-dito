import { devices, PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import configDefault from "./playwright.config";

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({
  path: path.resolve(__dirname, "../", ".env.test"),
  quiet: true,
});

// use larger viewports for snapshot tests
const desktopViewport = { width: 1200, height: 4800 };
const mobileHeight = 3200;

const config: PlaywrightTestConfig = {
  ...configDefault,
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        viewport: desktopViewport,
      },
    },
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 7"],
        viewport: { ...devices["Pixel 7"].viewport, height: mobileHeight },
      },
    },
  ],
};

export default config;
