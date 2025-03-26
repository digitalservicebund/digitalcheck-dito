import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import playwright from "eslint-plugin-playwright";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import testingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config(
  // Global ignores
  includeIgnoreFile(fileURLToPath(new URL(".gitignore", import.meta.url))),
  // Global settings
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        tsconfigRootDir: __dirname,
        project: [path.join(__dirname, "tsconfig.json")],
      },
    },
  },
  // React & Typescript
  {
    files: ["app/**/*.{ts,tsx}", "tests/**/*.{ts,tsx}"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat["jsx-runtime"],
      reactHooks.configs["recommended-latest"],
      jsxA11y.flatConfigs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      reactRefresh.configs.recommended,
      prettierPlugin, // should be the last one in the list
    ],

    settings: {
      react: { version: "detect" },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],

      "import/internal-regex": "^~/",
      "import/resolver": {
        node: { extensions: [".ts", ".tsx"] },
        typescript: {
          alwaysTryTypes: true,
          tsconfigRootDir: __dirname,
          project: ["**/tsconfig.json"],
        },
      },
    },

    rules: {
      // React rules
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
          allowExportNames: ["meta", "links", "headers", "loader", "action"],
        },
      ],

      // TypeScript rules
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/restrict-template-expressions": "warn",
      "@typescript-eslint/only-throw-error": "warn",

      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "tailwind-merge",
              importNames: ["twMerge"],
              message:
                "Please import { twMerge } from '@digitalcheck/shared/utils/tailwind-merge'.",
            },
          ],
        },
      ],
    },
  },
  // Additional Rules for test files
  {
    files: ["**/a11y/*.{spec,test}.{ts,tsx}", "**/e2e/*.{spec,test}.{ts,tsx}"],
    extends: [playwright.configs["flat/recommended"]],
    plugins: { "testing-library": testingLibrary },

    rules: {
      // Testing library rules
      "testing-library/await-async-queries": "error",
      "testing-library/no-await-sync-queries": "error",
      "testing-library/no-debugging-utils": "warn",
      "testing-library/no-dom-import": "off",

      // Playwright rules
      "playwright/no-conditional-expect": "off",
      "playwright/no-conditional-in-test": "off",
      "playwright/no-skipped-test": [
        "error",
        {
          allowConditional: true,
        },
      ],
    },
  },
  // Config files in root folder
  {
    extends: [eslint.configs.recommended],
    ignores: ["**/*", "!*.js", "!*.cjs", "!*.mjs", "!*.ts"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off",
    },
  },
);
