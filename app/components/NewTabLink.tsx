import OpenInNewIcon from "@digitalservicebund/icons/OpenInNew";
import { Link, LinkProps } from "react-router";
import { general } from "~/resources/content/shared/general.ts";
import twMerge from "~/utils/tailwindMerge";

export type CustomLinkProps = Omit<LinkProps, "target">;

/**
 * A `Link` with target="_blank" and OpenInNewIcon
 */
export default function NewTabLink({
  children,
  className,
  ...props
}: Readonly<CustomLinkProps>) {
  return (
    <Link
      {...props}
      target="_blank"
      className={twMerge("flex items-center", className)}
      aria-description={general.a11yMessageNewWindow}
    >
      {children}
      <OpenInNewIcon className="scale-75 fill-current" />
    </Link>
  );
}
