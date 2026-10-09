import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge<"kernStack">({
  extend: {
    classGroups: {
      kernStack: [
        "kern-stack",
        { "kern-stack": ["none", "xxs", "xs", "sm", "md", "lg", "xl"] },
      ],
    },
  },
});

export default customTwMerge;
