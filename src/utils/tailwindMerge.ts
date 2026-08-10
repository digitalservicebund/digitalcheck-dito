import { extendTailwindMerge } from "tailwind-merge";

const typographyVariants = [
  "01-reg",
  "01-bold",
  "02-reg",
  "02-bold",
  "03-reg",
  "03-bold",
];

const customTwMerge = extendTailwindMerge<
  | "dsButtonSize"
  | "dsButtonColor"
  | "dsCheckbox"
  | "dsInput"
  | "dsRadio"
  | "dsSelect"
  | "kernStack"
  | "dsTypography"
>({
  extend: {
    classGroups: {
      dsButtonSize: [{ "ds-button": ["small", "large"] }],
      dsButtonColor: [{ "ds-button": ["secondary", "tertiary", "ghost"] }],
      dsCheckbox: [{ "ds-checkbox": ["small", "mini"] }],
      dsInput: [{ "ds-input": ["medium", "small"] }],
      dsRadio: [{ "ds-radio": ["small", "mini"] }],
      dsSelect: [{ "ds-input": ["medium", "small"] }],
      kernStack: [
        "kern-stack",
        { "kern-stack": ["xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"] },
      ],
      dsTypography: [
        "ds-title-reg",
        { "ds-heading": typographyVariants },
        "ds-subhead",
        { "ds-label": typographyVariants },
        "ds-label-section",
        { "ds-body": typographyVariants },
        { "ds-link": typographyVariants },
      ],
    },
  },
});

export default customTwMerge;
