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
        "flex gap-24 py-16 max-md:flex-col md:gap-24",
        className,
      )}
    >
      {items.map(
        (item) =>
          item.value && (
            <p
              key={item.key ?? item.label}
              className="inline-flex flex-col gap-4"
            >
              {item.label && (
                <span className="ds-label-03-reg text-ds-dark-gray">
                  {item.label}
                </span>
              )}
              <span className="ds-label-03-bold">{item.value}</span>
            </p>
          ),
      )}
    </div>
  );
}
