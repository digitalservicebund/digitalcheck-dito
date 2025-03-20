import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import _import from "eslint-plugin-import";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
import testingLibrary from "eslint-plugin-testing-library";
import { defineConfig } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    name: "basic config",
    ignores: ["**/*", "!app/**/*.{ts,tsx}", "!tests/**/*.{ts,tsx}"],
    extends: fixupConfigRules(
      compat.extends(
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:tailwindcss/recommended",
        "plugin:prettier/recommended", // needs to be the last item in the config
      ),
    ),

    plugins: {
      "testing-library": testingLibrary,
      react: fixupPluginRules(react),
      "jsx-a11y": fixupPluginRules(jsxA11Y),
      "react-refresh": reactRefresh,
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        tsconfigRootDir: __dirname,
        project: ["**/tsconfig.json"],
      },
    },

    settings: {
      react: {
        version: "detect",
      },

      formComponents: ["Form"],
      linkComponents: [
        {
          name: "Link",
          linkAttribute: "to",
        },
        {
          name: "NavLink",
          linkAttribute: "to",
        },
      ],

      "import/internal-regex": "^~/",
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx"],
        },
        typescript: {
          alwaysTryTypes: true,
          tsconfigRootDir: __dirname,
          project: ["**/tsconfig.json"],
        },
      },

      tailwindcss: {
        whitelist: ["ds\\-(.*)", "plausible\\-(.*)", "parent-bg-blue"],
      },
    },

    rules: {
      // Testing library rules
      "testing-library/await-async-queries": "error",
      "testing-library/no-await-sync-queries": "error",
      "testing-library/no-debugging-utils": "warn",
      "testing-library/no-dom-import": "off",

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
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],

      // Other rules
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
  // Tests
  {
    files: ["**/a11y/*.test.{js,ts,jsx,tsx}", "**/e2e/*.test.{js,ts,jsx,tsx}"],
    extends: compat.extends("plugin:playwright/recommended"),
  },
  // Config files
  {
    files: ["*.js", "*.cjs", "*.mjs"],
    ignores: ["app/**/*", "tests/**/*"],

    extends: compat.extends("eslint:recommended"),

    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
]);
