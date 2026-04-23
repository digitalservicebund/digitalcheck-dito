/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest-setup.ts"],
    include: ["app/**/*.{test,spec}.ts?(x)"],
    chaiConfig: {
      truncateThreshold: 200,
    },
  },
});
