import { Children, ReactNode } from "react";
import twMerge from "~/utils/tailwindMerge";
import Heading, { HeadingProps } from "./Heading";

type InfoBoxListProps = {
  children: ReactNode;
  heading?: HeadingProps;
  separator?: boolean;
};

function InfoBoxList({
  children,
  separator,
  heading,
}: Readonly<InfoBoxListProps>) {
  return (
    <section className="ds-stack ds-stack-8">
      {heading && <Heading tagName="h2" {...heading} />}
      <ul
        className={twMerge(
          "list-unstyled info-box ds-stack mt-32",
          separator ? "ds-stack-32" : "ds-stack-48",
        )}
      >
        {Children.map(children, (child) => (
          <li
            className={
              separator
                ? "border-0 border-b-2 border-solid border-gray-400 pb-40 last:border-none last:pb-0"
                : ""
            }
          >
            {child}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default InfoBoxList;
