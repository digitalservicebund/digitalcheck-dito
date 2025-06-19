import { Children, ReactNode } from "react";
import twMerge from "~/utils/tailwindMerge";

type DetailsSummaryListProps = {
  children: ReactNode;
  className?: string;
};

function DetailsSummaryList({ children, className }: DetailsSummaryListProps) {
  return (
    <ul className={twMerge("ds-stack ds-stack-8 list-none p-0", className)}>
      {Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
}

export default DetailsSummaryList;
