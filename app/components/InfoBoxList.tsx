import React, { type ReactNode } from "react";
import { twJoin } from "tailwind-merge";
import twMerge from "~/utils/tailwindMerge";
import Heading, { HeadingProps } from "./Heading";

type InfoBoxListProps = {
  heading?: HeadingProps;
  separator?: boolean;
  className?: string;
  children?: ReactNode;
};

export default function InfoBoxList({
  separator,
  heading,
  className,
  children,
}: Readonly<InfoBoxListProps>) {
  return (
    <section className="ds-stack ds-stack-8">
      {heading && <Heading tagName="h2" {...heading} />}
      <ul
        className={twMerge(
          "list-unstyled info-box ds-stack mt-32",
          separator ? "ds-stack-32" : "ds-stack-48",
          className,
        )}
      >
        {React.Children.map(children, (child) => (
          <li
            className={twJoin(
              separator &&
                "border-0 border-b-2 border-solid border-gray-400 pb-40 last:border-none last:pb-0",
            )}
          >
            {child}
          </li>
        ))}
      </ul>
    </section>
  );
}
