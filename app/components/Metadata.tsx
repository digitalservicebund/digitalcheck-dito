import type { ReactNode } from "react";
import twMerge from "~/utils/tailwindMerge";

export type MetadataItem =
  | { key?: string; label: string; value: ReactNode }
  | { key: string; label?: string; value: ReactNode };

function MetadataItem({ key, label, value }: Readonly<MetadataItem>) {
  return (
    <p
      key={key ?? label}
      className="inline-flex flex-row items-center gap-4 md:flex-col md:items-start"
    >
      {label && <span className="ds-label-03-reg text-gray-900">{label}</span>}
      <span className="ds-label-03-bold flex flex-col md:h-24 md:justify-center">
        {value}
      </span>
    </p>
  );
}

export type MetadataProps = {
  children: ReactNode;
  className?: string;
};

function Metadata({ className, children }: Readonly<MetadataProps>) {
  return (
    <div
      className={twMerge(
        "flex gap-8 py-16 max-md:flex-col md:gap-24",
        className,
      )}
    >
      {children}
    </div>
  );
}

Metadata.Item = MetadataItem;
export default Metadata;
