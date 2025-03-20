import tailwindPreset from "@digitalservice4germany/style-dictionary/tailwind";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [tailwindPreset],
  theme: {
    extend: {
      fontFamily: {
        sans: "BundesSansWeb",
      },
    },
  },
  corePlugins: {
    container: false,
  },
};
