import React, { ReactElement } from "react";
import twMerge from "~/utils/tailwindMerge.ts";

/*
 * NumberedList renders long-form content as a series of steps, placing a counter
 * to the left (or top) of the main content.
 * Optionally, trailing fullwidthContent may be added.
 *
 * ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
 * ▏(1) Content       ▕
 * ▏    Content       ▕
 * ▏    Content       ▕
 * ▏                  ▕
 * ▏ after 1 content  ▕
 * ▏                  ▕
 * ▏------------------▕
 * ▏                  ▕
 * ▏(2) Content       ▕
 * ▏    Content       ▕
 * ▏    Content       ▕
 * ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
 */

export type ListItemProps = {
  readonly children?: React.ReactNode;
  readonly after?: React.ReactNode;
  className?: string;
};

function ListItem({ children, after, className }: Readonly<ListItemProps>) {
  return (
    <li className="mt-80 scroll-my-40 space-y-40 border-b-2 border-blue-300 pb-80 first:mt-0 last:border-none last:pb-0">
      <div className="flex flex-col items-start gap-16 before:flex before:size-40 before:shrink-0 before:items-center before:justify-center before:rounded-full before:border-2 before:border-solid before:border-gray-400 before:content-[counter(list-item)] sm:flex-row">
        <div className={className}>{children}</div>
      </div>
      {after}
    </li>
  );
}

type NumberedListProps = React.OlHTMLAttributes<HTMLOListElement> & {
  children: ReactElement<ListItemProps, typeof ListItem>[];
  className?: string;
};

function NumberedList({ children, className, ...props }: NumberedListProps) {
  return (
    <ol {...props} className={twMerge("list-unstyled scroll-my-40", className)}>
      {children}
    </ol>
  );
}

NumberedList.Item = ListItem;
export default NumberedList;
