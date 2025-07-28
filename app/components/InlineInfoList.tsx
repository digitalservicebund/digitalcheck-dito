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
        "bg-ds-mid-light-blue flex gap-8 py-16 max-md:flex-col md:gap-16",
        className,
      )}
    >
      {items.map(
        (item) =>
          item.value && (
            <p
              key={item.key ?? item.label}
              className="inline-flex items-center space-x-8"
            >
              {item.label && <span>{item.label}:</span>}
              <span className="ds-label-01-bold">{item.value}</span>
            </p>
          ),
      )}
    </div>
  );
}
