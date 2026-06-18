import type { LinkButtonProps } from "~/components/Button.tsx";

export type ContentLink = {
  text: string;
  id?: string;
  to: string;
  target?: string;
  download?: boolean;
} & Pick<LinkButtonProps, "look" | "className" | "iconLeft">;

export type StepConditionProps = {
  hasDigitalbezug: boolean;
  isBund: boolean;
  hasPruefstelle: boolean;
};

export type StepConditionFunc = (props: StepConditionProps) => boolean;

export type Step = {
  headline: { text: string };
  content?: string;
  link?: ContentLink;
  isDisabled?: boolean;
  finished?: { headline: { text: string }; isDisabled: boolean };
  condition?: StepConditionFunc;
};
