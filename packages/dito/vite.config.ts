import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { cjsInterop } from "vite-plugin-cjs-interop";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // publicDir: "../shared/public",
  plugins: [
    remix(),
    tsconfigPaths(),
    cjsInterop({
      dependencies: ["@digitalservicebund/icons/*"],
    }),
  ],
});
