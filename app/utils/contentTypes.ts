import { LinkButtonProps } from "~/components/Button.tsx";

export type ContentLink = {
  text: string;
  id?: string;
  to: string;
  target?: string;
  download?: boolean;
  plausibleEventName?: string;
} & Pick<LinkButtonProps, "look" | "className" | "iconLeft">;

export type Step = {
  headline: { text: string };
  content?: string;
  link?: ContentLink;
  isDisabled?: boolean;
  finished?: { headline: { text: string }; isDisabled: boolean };
};
