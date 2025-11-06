import SaveAltOutlinedIcon from "@digitalservicebund/icons/SaveAltOutlined";
import React, { cloneElement, type ReactElement } from "react";
import { Link, LinkProps } from "react-router";
import { twJoin } from "tailwind-merge";
import { getDownloadableExtensionName } from "~/utils/fileExtensionUtils";
import { getPlausibleEventClassName } from "~/utils/plausibleUtils";
import twMerge from "~/utils/tailwindMerge";

export type ButtonBaseProps = {
  fullWidth?: boolean;
  iconLeft?: ReactElementWithClassname;
  iconRight?: ReactElementWithClassname;
  look?: "primary" | "secondary" | "tertiary" | "ghost" | "link";
  plausibleEventName?: string;
  size?: "large" | "medium" | "small";
  /**
   * @deprecated use children instead
   */
  text?: string;
};

// require an explicit type for buttons for clarity
type ExplicitButtonType = {
  type: "button" | "submit" | "reset";
};

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  ExplicitButtonType &
  ButtonBaseProps;

export type LinkButtonProps = LinkProps & ButtonBaseProps;

type ReactElementWithClassname = ReactElement<{ className: string }>;

function formatIcon(icon?: ReactElementWithClassname) {
  if (!icon) return undefined;
  const className = `ds-button-icon ${icon.props.className ?? ""}`;
  return cloneElement(icon, { className });
}

function createButtonClasses({
  look,
  size,
  iconLeft,
  iconRight,
  fullWidth,
  className,
}: Pick<
  LinkButtonProps,
  "look" | "size" | "iconLeft" | "iconRight" | "fullWidth" | "className"
>) {
  if (look === "link") {
    return twMerge(
      "text-link inline-flex items-center text-left space-x-8",
      className,
    );
  }
  return twMerge(
    "ds-button",
    look == "secondary" && "ds-button-secondary",
    look == "tertiary" && "ds-button-tertiary",
    look == "ghost" && "ds-button-ghost",
    size == "large" && "ds-button-large",
    size == "small" && "ds-button-small",
    (iconLeft ?? iconRight) && ["ds-button-with-icon"],
    fullWidth && "ds-button-full-width",
    className,
  );
}

/**
 * Wrapper for <button> that provides extra styling.
 */
function Button({
  id,
  children,
  text,
  iconLeft,
  iconRight,
  fullWidth,
  look,
  size,
  plausibleEventName,
  className,
  ...props
}: ButtonProps) {
  const buttonClasses = createButtonClasses({
    look,
    size,
    iconRight,
    iconLeft,
    fullWidth,
    className,
  });

  return (
    <button {...props} id={id} data-testid={id} className={buttonClasses}>
      {formatIcon(iconLeft)}{" "}
      {<span className="ds-button-label">{children ?? text}</span>}{" "}
      {formatIcon(iconRight)}
    </button>
  );
}

export default Button;

/**
 * A react-router <Link> that looks like a button.
 */
export function LinkButton({
  children,
  text,
  id,
  iconLeft,
  iconRight,
  fullWidth,
  look,
  size,
  plausibleEventName,
  className,
  ...props
}: Readonly<LinkButtonProps>) {
  const buttonClasses = createButtonClasses({
    look: look ?? "primary",
    size,
    iconRight,
    iconLeft,
    fullWidth,
    className,
  });

  iconLeft = formatIcon(iconLeft);
  iconRight = formatIcon(iconRight);

  const plausibleEvent = getPlausibleEventClassName(plausibleEventName);

  // for links that have role="button" we need to add an event handler so that it can
  // be activated with the space bar
  // see: https://github.com/alphagov/govuk_elements/pull/272#issuecomment-233028270
  const onKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (event.code === "Space") {
      event.currentTarget.click();
      event.preventDefault();
    }
  };

  return (
    <Link
      {...props}
      id={id}
      data-testid={id}
      className={twJoin(buttonClasses, plausibleEvent)}
      onKeyDown={onKeyDown}
      {...props}
    >
      {iconLeft} <span className="ds-button-label">{children ?? text}</span>{" "}
      {iconRight}
    </Link>
  );
}

/**
 * A button that indicates a download will be triggered.
 * For linking to a document directly, use `DownloadLinkButton` instead.
 */
export function DownloadButton(
  props: Readonly<Omit<ButtonProps, "iconLeft" | "type">>,
) {
  return (
    <Button
      type="button"
      iconLeft={<SaveAltOutlinedIcon className="fill-current" />}
      {...props}
    />
  );
}

/**
 * A link to a file that looks like a button.
 */
export function DownloadLinkButton({
  omitIcon,
  ...props
}: Readonly<Omit<LinkButtonProps, "iconLeft"> & { omitIcon?: boolean }>) {
  const extension =
    typeof props.to === "string"
      ? getDownloadableExtensionName(props.to)
      : null;

  const iconLeft = omitIcon ? undefined : (
    <SaveAltOutlinedIcon className="fill-current" />
  );
  return (
    <LinkButton
      iconLeft={iconLeft}
      download
      reloadDocument
      title={extension ? `${extension}-Datei` : undefined}
      {...props}
    />
  );
}
