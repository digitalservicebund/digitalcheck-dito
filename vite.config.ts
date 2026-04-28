import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    !process.env.VITEST && reactRouter(),
    tailwindcss(),
    devtoolsJson(),
  ],
  build: {
    target: "ES2022",
    cssTarget: "chrome100",
    rollupOptions: {
      external: [/\.spec\.tsx?$/], // exclude test files from production build
    },
  },
  ssr: {
    noExternal: ["posthog-js", "posthog-js/react"],
  },
  /*
     Fix disallowed MIME type errors when running in development mode.
     See https://github.com/vitejs/vite/discussions/13910#discussioncomment-8377145
  */
  base:
    process.env.PREVIEW_BASE_PATH ??
    (process.env.DEVELOPMENT ? "./" : undefined),
  define: {
    "import.meta.env.PREVIEW_BUILD": process.env.PREVIEW_BUILD,
  },
});
