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
    // Disable minification when DEBUG_BUILD is set for better error messages
    minify: process.env.DEBUG_BUILD !== "true" ? "esbuild" : false,
    // Enable source maps for debugging
    sourcemap: process.env.DEBUG_BUILD === "true" ? true : false,
    rollupOptions: {
      external: [/\.spec\.tsx?$/], // exclude test files from production build
    },
  },
  ssr: {
    noExternal: ["posthog-js", "posthog-js/react"],
  },
});
