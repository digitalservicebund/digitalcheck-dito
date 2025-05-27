import { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

export type PrincipleNumber = 1 | 2 | 3 | 4 | 5;

export type LabelProps = {
  className?: string;
  children: ReactNode;
  principleNumber?: PrincipleNumber;
  hint?: boolean;
};

function Badge({
  className,
  children,
  principleNumber,
  hint,
}: Readonly<LabelProps>) {
  const labelStyle = "ds-label-02-reg rounded-md p-4";
  const principleStyle = principleNumber
    ? `bg-principle-${principleNumber}`
    : "";
  const hintStyle = hint ? "bg-blue-300 text-blue-800" : "";

  return (
    <span className={twJoin(labelStyle, principleStyle, hintStyle, className)}>
      {children}
    </span>
  );
}

export default Badge;
