import { ReactNode } from "react";
import twMerge from "~/utils/tailwindMerge";

export type PrincipleNumber = 1 | 2 | 3 | 4 | 5;

export type BadgeProps = {
  text?: string;
  children?: ReactNode;
  className?: string;
  principleNumber?: PrincipleNumber;
  look?: "hint" | "default";
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

function Badge({
  className,
  children,
  text,
  Icon,
  principleNumber,
  look = "default",
}: Readonly<BadgeProps>) {
  const badgeStyle =
    "ds-label-02-reg inline-flex flex-row items-center gap-4 self-start rounded-md bg-transparent p-4";
  const principleStyle = principleNumber
    ? `bg-principle-${principleNumber}`
    : "";
  const hintStyle = look === "hint" ? "bg-blue-300 text-blue-800" : "";

  return (
    <mark className={twMerge(badgeStyle, principleStyle, hintStyle, className)}>
      {Icon && <Icon className="size-16 fill-gray-800" />}
      {children || text}
    </mark>
  );
}

export default Badge;
