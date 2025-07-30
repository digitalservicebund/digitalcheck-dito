import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    !process.env.VITEST && reactRouter(),
    tailwindcss(),
    tsconfigPaths(),
    devtoolsJson(),
  ],
  build: {
    target: "ES2022",
    rollupOptions: {
      external: [/\.spec\.ts$/], // exclude test files from production build
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest-setup.ts"],
    include: ["app/**/*.{test,spec}.ts?(x)"],
  },
  ssr: {
    noExternal: ["posthog-js", "posthog-js/react"],
  },
});
