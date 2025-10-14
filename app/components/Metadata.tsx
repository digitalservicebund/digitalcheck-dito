import type { ReactNode } from "react";
import twMerge from "~/utils/tailwindMerge";

export type MetadataItem = { key?: string; label: string; value: ReactNode };

function MetadataItem({ key, label, value }: Readonly<MetadataItem>) {
  return (
    <div
      key={key ?? label}
      className="inline-flex flex-row items-center gap-4 md:flex-col md:items-start"
    >
      <dt className="ds-label-03-reg text-gray-900">{label}</dt>
      <dd className="ds-label-03-bold flex flex-col md:h-24 md:justify-center">
        {value}
      </dd>
    </div>
  );
}

export type MetadataProps = {
  children: ReactNode;
  className?: string;
};

function Metadata({ className, children }: Readonly<MetadataProps>) {
  return (
    <dl
      className={twMerge(
        "flex gap-8 py-16 max-md:flex-col md:gap-24",
        className,
      )}
    >
      {children}
    </dl>
  );
}

Metadata.Item = MetadataItem;
export default Metadata;
