import ViteYaml from "@modyfi/vite-plugin-yaml";
import { reactRouter } from "@react-router/dev/vite";
import * as fs from "fs";
import JsonToTS from "json-to-ts";
import path from "path";
import { defineConfig } from "vite";
import { ViteToml } from "vite-plugin-toml";
import tsconfigPaths from "vite-tsconfig-paths";
import yaml from "yaml";

function generateYamlTypes() {
  const CONTENT_DIR = path.resolve(__dirname, "app/resources/content");
  const OUTPUT_DIR = path.resolve(__dirname, "app/resources/types");

  // Generate types for all YAML files
  let inputFileEnding = ".yml";
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(inputFileEnding));

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const typeName = path.basename(file, inputFileEnding); // Use filename as type

    const fileContent = fs.readFileSync(filePath, "utf8");
    const jsonData = yaml.parse(fileContent);

    // console.log(jsonData);
    let tsTypes = JsonToTS(jsonData, {
      useTypeAlias: false,
      rootName: typeName,
    });

    fs.writeFileSync(
      path.join(OUTPUT_DIR, file.replace(inputFileEnding, ".d.ts")),
      tsTypes.join("\n\n") + "\n",
      // tsTypes.join("\n\n").replaceAll("Image", "MyImage"),
    );
    console.log(`✅ YAML-Typen generiert für ${file}`);
  }

  console.log("🎉 Type generation complete!");
}

export default defineConfig({
  plugins: [
    !process.env.VITEST && reactRouter(),
    tsconfigPaths(),
    ViteYaml(),
    ViteToml(),
    {
      name: "generate-yaml-types",
      buildStart() {
        generateYamlTypes();
      },
    },
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
