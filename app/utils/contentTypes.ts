import { ButtonBaseProps, ButtonProps } from "~/components/Button.tsx";

type BaseContentAction = Omit<ButtonBaseProps, "text"> & {
  // The text prop is deprecated in ButtonBaseProps but expected for content files
  text: string;
  id?: string;
  className?: string;
};

export type ButtonAction = BaseContentAction &
  Pick<ButtonProps, "onClick" | "disabled">;

export type LinkAction = BaseContentAction & {
  // maps to the `to` prop of a react-router `Link`
  linkTo: string;
  target?: string;
  download?: boolean;
};

/**
 * An action can be a button with a click handler, a link to another page,
 * or a download link.
 */
export type ContentAction = LinkAction | ButtonAction;

export type Step<ActionType extends BaseContentAction = ContentAction> = {
  headline: { text: string };
  content?: string;
  action?: ActionType;
  isDisabled?: boolean;
  finished?: { headline: { text: string }; isDisabled: boolean };
};
