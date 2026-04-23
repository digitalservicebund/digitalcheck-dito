import { OpenInNewIcon } from "~/components/OpenInNewIcon.tsx";
import { Link } from "~/utils/routerCompat";
import twMerge from "~/utils/tailwindMerge";

export type CustomLinkProps = {
  to: string;
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
};

/**
 * A `Link` with target="_blank" and OpenInNewIcon
 */
export default function NewTabLink({
  children,
  className,
  ...props
}: Readonly<Omit<CustomLinkProps, "target">>) {
  return (
    <Link
      {...(props as Parameters<typeof Link>[0])}
      target="_blank"
      className={twMerge("text-link", className)}
    >
      {children}
      <OpenInNewIcon />
    </Link>
  );
}
