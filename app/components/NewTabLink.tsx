import { Link, LinkProps } from "react-router";
import { OpenInNewIcon } from "~/components/OpenInNewIcon.tsx";
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
    >
      {children}
      <OpenInNewIcon />
    </Link>
  );
}
