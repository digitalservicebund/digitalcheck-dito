/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
  },

  // Base configs
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended", // Make sure this is always the last element in the array.
  ],

  rules: {
    "testing-library/await-async-queries": "error",
    "testing-library/no-await-sync-queries": "error",
    "testing-library/no-debugging-utils": "warn",
    "testing-library/no-dom-import": "off",
    // support eol for all os
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
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

  overrides: [
    // React
    {
      files: ["app/**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y", "react-refresh"],
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      settings: {
        react: {
          version: "detect",
        },
        formComponents: ["Form"],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
        ],
        "import/resolver": {
          typescript: {},
        },
      },
      rules: {
        "react-refresh/only-export-components": [
          "warn",
          {
            allowConstantExport: true,
            allowExportNames: ["meta", "links", "headers", "loader", "action"],
          },
        ],
      },
    },

    // Typescript
    {
      files: ["app/**/*.{ts,tsx}", "tests/**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint", "import", "testing-library"],
      extends: [
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:tailwindcss/recommended",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["**/tsconfig.json"],
      },
      settings: {
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
      },
    },

    // Playwright
    {
      files: [
        "**/a11y/*.test.{js,ts,jsx,tsx}",
        "**/e2e/*.test.{js,ts,jsx,tsx}",
      ],
      extends: "plugin:playwright/recommended",
    },

    // Node
    {
      files: [".eslintrc.cjs"],
      env: {
        node: true,
      },
    },
  ],
};
