import { CloseOutlined } from "@digitalservicebund/icons";
import { twJoin } from "tailwind-merge";

type PillProps = {
  value: string;
  selected: boolean;
  onClick: (value: string) => void;
};

export function Pill({ value, selected, onClick }: PillProps) {
  return (
    <button
      key={value}
      type="button"
      onClick={() => onClick(value)}
      aria-pressed={selected}
      className={twJoin(
        "flex flex-row items-center gap-8 rounded-full border py-6 text-sm font-medium transition-colors",
        selected
          ? "border-blue-400 bg-blue-400 pr-12 pl-16 hover:bg-red-200"
          : "border-gray-400 bg-white px-16 hover:bg-blue-100",
      )}
    >
      {value}
      {selected && <CloseOutlined className="size-16" />}
    </button>
  );
}
