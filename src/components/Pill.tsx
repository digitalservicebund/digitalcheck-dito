import { CloseOutlined } from "@digitalservicebund/icons";
import { twJoin } from "tailwind-merge";

type PillProps = Readonly<{
  label: string;
  value: string;
  selected: boolean;
  onClick: (value: string) => void;
}>;

export function Pill({ label, value, selected, onClick }: PillProps) {
  return (
    <button
      key={value}
      type="button"
      onClick={() => onClick(value)}
      aria-pressed={selected}
      className={twJoin(
        "flex flex-row items-center gap-8 rounded-full border py-6 text-sm font-medium transition-colors",
        selected
          ? "border-ds-blue-400 bg-ds-blue-400 hover:bg-ds-blue-500 pr-12 pl-16"
          : "border-ds-gray-400 hover:bg-ds-blue-100 bg-white px-16",
      )}
    >
      {label}
      {selected && <CloseOutlined className="size-16" />}
    </button>
  );
}
