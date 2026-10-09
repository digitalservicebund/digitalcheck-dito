import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge<"kernStack">({
  extend: {
    classGroups: {
      kernStack: [
        "kern-stack",
        { "kern-stack": ["xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"] },
      ],
    },
  },
});

export default customTwMerge;
