import { cloneElement, type ReactElement } from "react";
import { Link } from "react-router";
import { twJoin } from "tailwind-merge";
import twMerge from "~/utils/tailwindMerge";

type Props = {
  text?: string;
  look?: "primary" | "secondary" | "tertiary" | "ghost" | "link";
  size?: "large" | "medium" | "small";
  href?: string;
  iconLeft?: ReactElementWithClassname;
  iconRight?: ReactElementWithClassname;
  fullWidth?: boolean;
  prefetch?: "intent" | "viewport" | "render";
  onClickCallback?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  plausibleEventName?: string;
};

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    Props {}
export interface ButtonLinkProps
  extends React.ComponentPropsWithoutRef<"a">,
    Props {}
type ReactElementWithClassname = ReactElement<{ className: string }>;

function formatIcon(icon?: ReactElementWithClassname) {
  if (!icon) return undefined;
  const className = `ds-button-icon ${icon.props.className ?? ""}`;
  return cloneElement(icon, { className });
}

function Button({
  id,
  children,
  text,
  iconLeft,
  iconRight,
  fullWidth,
  look,
  size,
  href,
  prefetch,
  onClickCallback,
  plausibleEventName,
  ...props
}: ButtonProps | ButtonLinkProps) {
  let buttonClasses = twMerge(
    "ds-button",
    look == "secondary" && "ds-button-secondary",
    look == "tertiary" && "ds-button-tertiary",
    look == "ghost" && "ds-button-ghost",
    size == "large" && "ds-button-large",
    size == "small" && "ds-button-small",
    (iconLeft ?? iconRight) && ["ds-button-with-icon"],
    fullWidth && "ds-button-full-width",
    props.className,
  );
  if (look === "link") {
    buttonClasses = "text-link font-bold";
  }

  const textSpan = text ? <span className="ds-button-label">{text}</span> : "";
  const childrenSpan = <span className="ds-button-label">{children}</span>;
  iconLeft = formatIcon(iconLeft);
  iconRight = formatIcon(iconRight);

  const plausibleEvent = `plausible-event-name=${plausibleEventName}`;

  // for links that have role="button" we need to add an event handler so that it can
  // be activated with the space bar
  // see: https://github.com/alphagov/govuk_elements/pull/272#issuecomment-233028270
  const onKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (event.code === "Space") {
      event.currentTarget.click();
      event.preventDefault();
    }
  };

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClickCallback) {
      onClickCallback(event);
    }
  };

  if (href) {
    const ext =
      (href.endsWith(".pdf") && "PDF") ||
      (href.endsWith(".xlsx") && "XSLX") ||
      (href.endsWith(".docx") && "DOCX") ||
      (href.endsWith(".pptx") && "PPTX");
    const isDownload = !!ext;

    return (
      <Link
        {...(props as ButtonLinkProps)}
        to={href}
        className={twJoin(buttonClasses, plausibleEvent)}
        onKeyDown={onKeyDown}
        onClick={onClick}
        id={id}
        data-testid={id}
        reloadDocument={isDownload}
        download={isDownload}
        title={isDownload ? `${text} (${ext}-Datei)` : undefined}
        prefetch={prefetch}
      >
        {iconLeft} {children ? childrenSpan : textSpan} {iconRight}
      </Link>
    );
  }

  return (
    <button
      {...(props as ButtonProps)}
      className={buttonClasses}
      id={id}
      data-testid={id}
    >
      {iconLeft} {children ? childrenSpan : textSpan} {iconRight}
    </button>
  );
}

export default Button;
