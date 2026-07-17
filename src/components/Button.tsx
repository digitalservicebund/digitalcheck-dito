import { getDownloadableExtensionName } from "@/utils/fileExtensionUtils";
import twMerge from "@/utils/tailwindMerge";
import { SaveAltOutlined as SaveAltOutlinedIcon } from "@digitalservicebund/icons";
import type React from "react";
import type { ReactElement } from "react";
import { cloneElement } from "react";
import { twJoin } from "tailwind-merge";

export type ButtonBaseProps = {
  fullWidth?: boolean;
  iconLeft?: ReactElementWithClassname;
  iconRight?: ReactElementWithClassname;
  look?: "primary" | "secondary" | "tertiary" | "ghost" | "link";
  size?: "large" | "medium" | "small";
};

// require an explicit type for buttons for clarity
type ExplicitButtonType = {
  type: "button" | "submit" | "reset";
};

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  ExplicitButtonType &
  ButtonBaseProps;

export type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonBaseProps;

type ReactElementWithClassname = ReactElement<{
  className?: string;
  "aria-hidden"?: boolean;
}>;

// ToDo change ds-button-icon to kern-icon
function formatIcon(icon?: ReactElementWithClassname) {
  if (!icon) return undefined;
  const className = `ds-button-icon ${icon.props.className ?? ""}`;
  return cloneElement(icon, { className, "aria-hidden": true });
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
      "kern-link inline-flex items-center text-left space-x-8",
      className,
    );
  }

  return twMerge(
    "kern-btn",
    look == "primary" && "kern-btn--primary",
    (look === "secondary" || look === "tertiary") && "kern-btn--secondary",
    look === "ghost" && "kern-btn--tertiary",
    size == "small" && "kern-btn--x-small",
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
  iconLeft,
  iconRight,
  fullWidth,
  look = "primary",
  size,
  className,
  type,
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
    <button
      {...props}
      type={type}
      id={id}
      data-testid={id}
      className={buttonClasses}
    >
      {formatIcon(iconLeft)}
      <span className="kern-label">{children}</span>
      {formatIcon(iconRight)}
    </button>
  );
}

export default Button;

/**
 * An anchor that looks like a button.
 */
export function LinkButton({
  children,
  id,
  iconLeft,
  iconRight,
  fullWidth,
  look,
  size,
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
    <a
      href={props.href}
      id={id}
      data-testid={id}
      className={twJoin("link-unstyled", buttonClasses)}
      onKeyDown={onKeyDown}
      {...props}
    >
      {iconLeft}{" "}
      <span className={look === "link" ? undefined : "kern-label"}>
        {children}
      </span>{" "}
      {iconRight}
    </a>
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
    typeof props.href === "string"
      ? getDownloadableExtensionName(props.href)
      : null;

  const iconLeft = omitIcon ? undefined : (
    <SaveAltOutlinedIcon className="fill-current" />
  );
  return (
    <LinkButton
      iconLeft={iconLeft}
      download
      title={extension ? `${extension}-Datei` : undefined}
      {...props}
    />
  );
}
