import type { ReactNode } from "react";
import twMerge from "~/utils/tailwindMerge";

export type InlineInfoListItem =
  | { key?: string; label: string; value: ReactNode }
  | { key: string; label?: string; value: ReactNode };

export type InlineInfoListProps = {
  items: InlineInfoListItem[];
  className?: string;
};

export default function InlineInfoList({
  items,
  className,
}: Readonly<InlineInfoListProps>) {
  return (
    <div
      className={twMerge(
        "flex gap-8 py-16 max-md:flex-col md:gap-24",
        className,
      )}
    >
      {items.map(
        (item) =>
          item.value && (
            <p
              key={item.key ?? item.label}
              className="inline-flex flex-row items-center gap-4 md:flex-col md:items-start"
            >
              {item.label && (
                <span className="ds-label-03-reg text-gray-900">
                  {item.label}
                </span>
              )}
              <span className="ds-label-03-bold flex flex-col md:h-24 md:justify-center">
                {item.value}
              </span>
            </p>
          ),
      )}
    </div>
  );
}
