/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss",
  ],
  overrides: [
    {
      files: "*.astro",
      options: { parser: "astro" },
    },
  ],
  endOfLine: "auto",
};

export default config;
