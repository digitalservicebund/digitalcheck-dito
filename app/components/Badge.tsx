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
    "bg-transparent ds-label-02-reg rounded-md p-4 inline-flex flex-row gap-4";
  const principleStyle = principleNumber
    ? `bg-principle-${principleNumber}`
    : "";
  const hintStyle = look === "hint" ? "bg-blue-300 text-blue-800" : "";

  return (
    <mark
      className={twMerge(
        "items-center",
        badgeStyle,
        principleStyle,
        hintStyle,
        className,
      )}
    >
      {Icon && <Icon className="size-16" />}
      {children || text}
    </mark>
  );
}

export default Badge;
