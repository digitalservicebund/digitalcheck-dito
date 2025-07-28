import OpenInNewIcon from "@digitalservicebund/icons/OpenInNew";
import { ReactNode } from "react";
import { Link } from "react-router";
import twMerge from "~/utils/tailwindMerge";

export type CustomLinkProps = {
  children: ReactNode;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  to: string;
  className?: string;
};

export default function CustomLink({
  children,
  target,
  rel,
  to,
  className,
}: Readonly<CustomLinkProps>) {
  const isExternal = target === "_blank";

  return (
    <Link
      to={to}
      target={target ?? (isExternal ? "_blank" : undefined)}
      rel={target === "_blank" || isExternal ? "noreferrer" : rel}
      className={twMerge("flex items-center", className)}
    >
      {children}
      {(target === "_blank" || isExternal) && (
        <OpenInNewIcon className="fill-ds-dark-blue scale-75" />
      )}
    </Link>
  );
}
