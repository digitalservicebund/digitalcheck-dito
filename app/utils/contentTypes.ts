import { ButtonBaseProps, ButtonProps } from "~/components/Button.tsx";

type BaseAction = Omit<ButtonBaseProps, "text"> & {
  text: string; // deprecated in ButtonBaseProps, okay here
  id?: string;
  className?: string;
};

export type ButtonAction = BaseAction &
  Pick<ButtonProps, "onClick" | "disabled">;

export type LinkAction = BaseAction & {
  linkTo: string;
  target?: string;
  download?: boolean;
};

/**
 * Represents the props for actions within content files.
 */
export type ContentAction = LinkAction | ButtonAction;

export type Step<ActionType extends BaseAction = ContentAction> = {
  headline: { text: string };
  content?: string;
  action?: ActionType;
  isDisabled?: boolean;
  finished?: { headline: { text: string }; isDisabled: boolean };
};
