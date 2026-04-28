import { OpenInNewIcon } from "~/components/OpenInNewIcon.tsx";
import { Link, type LinkProps } from "~/utils/routerCompat";
import twMerge from "~/utils/tailwindMerge";

/**
 * A `Link` with target="_blank" and OpenInNewIcon
 */
export default function NewTabLink({
  children,
  className,
  ...props
}: Readonly<Omit<LinkProps, "target">>) {
  return (
    <Link
      {...props}
      target="_blank"
      className={twMerge("text-link", className)}
    >
      {children}
      <OpenInNewIcon />
    </Link>
  );
}
