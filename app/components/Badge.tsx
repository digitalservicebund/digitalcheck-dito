import { ReactNode } from "react";
import twMerge from "~/utils/tailwindMerge";

export type PrincipleNumber = 1 | 2 | 3 | 4 | 5;

export type BadgeProps = {
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
}: Readonly<BadgeProps>) {
  const labelStyle = "ds-label-02-reg rounded-md p-4 self-start";
  const principleStyle = principleNumber
    ? `bg-principle-${principleNumber}`
    : "";
  const hintStyle = hint ? "bg-blue-300 text-blue-800" : "";

  return (
    <span
      role="mark"
      className={twMerge(labelStyle, principleStyle, hintStyle, className)}
    >
      {children}
    </span>
  );
}

export default Badge;
