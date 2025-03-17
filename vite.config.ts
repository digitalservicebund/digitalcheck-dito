import ViteYaml from "@modyfi/vite-plugin-yaml";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { ViteToml } from "vite-plugin-toml";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    !process.env.VITEST && reactRouter(),
    tsconfigPaths(),
    ViteYaml(),
    ViteToml(),
  ],
  build: {
    target: "ES2022",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest-setup.ts"],
    include: ["app/**/*.spec.ts*"],
  },
});
