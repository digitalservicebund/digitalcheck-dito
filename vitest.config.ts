// vitest.config.ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import devtoolsJson from "vite-plugin-devtools-json";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), devtoolsJson()],

  test: {
    chaiConfig: {
      truncateThreshold: 200,
    },
    projects: [
      {
        test: {
          name: "unit",
          globals: true,
          environment: "jsdom",
          setupFiles: ["vitest-setup.ts"],
          include: [
            "**/*.test.{ts,tsx}",
            "**/*.spec.{ts,tsx}",
            "!app/routes/__tests__/**",
            "!tests/**",
          ],
          typecheck: {
            tsconfig: "./tsconfig.test.json",
          },
        },
        extends: true,
      },
      {
        test: {
          name: "browser",
          setupFiles: ["vitest-browser-setup.ts"],
          include: [
            "app/routes/__tests__/**/*.test.{ts,tsx}",
            "app/routes/__tests__/**/*.spec.{ts,tsx}",
          ],
          typecheck: {
            tsconfig: "./tsconfig.browser-test.json",
          },
          chaiConfig: {
            truncateThreshold: 200,
          },
          browser: {
            provider: playwright(),
            enabled: true,
            instances: [{ browser: "chromium" }],
          },
          globals: false,
        },
        extends: true,
      },
    ],
  },
});
