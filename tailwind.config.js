import angiePlugin from "@digitalservice4germany/angie";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  plugins: [angiePlugin],
  theme: {
    extend: {
      fontFamily: {
        sans: "BundesSansWeb",
      },
    },
  },
};
