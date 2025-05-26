import { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

export type LabelProps = {
  className?: string;
  children: ReactNode;
  color?: string;
  textColor?: string;
};

function Badge({
  className,
  children,
  color,
  textColor,
}: Readonly<LabelProps>) {
  const labelStyle = "ds-label-02-reg rounded-md p-4";
  const colorStyle = color ? `bg-${color}-300` : "";
  const textColorStyle = color ? `text-${textColor}-800` : "";

  return (
    <span className={twJoin(labelStyle, colorStyle, textColorStyle, className)}>
      {children}
    </span>
  );
}

export default Badge;
