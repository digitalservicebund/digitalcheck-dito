import { OpenInNewIcon } from "~/components/OpenInNewIcon.tsx";
import twMerge from "~/utils/tailwindMerge";

/**
 * A `Link` with target="_blank" and OpenInNewIcon
 */
export default function NewTabLink({
  children,
  className,
  ...props
}: Readonly<Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "target">>) {
  return (
    <a
      href={props.href}
      {...props}
      target="_blank"
      rel="noreferrer"
      className={twMerge("text-link", className)}
    >
      {children}
      <OpenInNewIcon />
    </a>
  );
}
