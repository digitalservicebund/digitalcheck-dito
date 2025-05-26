import { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

export type LabelProps = {
  className?: string;
  children: ReactNode;
  color?: string;
};

function Label({ className, children, color }: Readonly<LabelProps>) {
  const labelStyle =
    "ds-label-02-reg rounded-md bg-blue-300 px-4 py-2 text-blue-800 uppercase";
  const colorStyle = color ? `bg-${color}-300` : "";

  return (
    <span className={twJoin(labelStyle, colorStyle, className)}>
      {children}
    </span>
  );
}

export default Label;
