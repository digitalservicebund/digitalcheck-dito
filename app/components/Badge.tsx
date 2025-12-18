import { ReactNode } from "react";
import { PRINCIPLE_COLORS, PrincipleNumber } from "~/resources/constants";
import twMerge from "~/utils/tailwindMerge";

export type BadgeProps = {
  children?: ReactNode;
  text?: ReactNode;
  className?: string;
  principleNumber?: PrincipleNumber;
  look?: "hint" | "gray" | "default" | "white";
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
    ? PRINCIPLE_COLORS[principleNumber].background
    : "";

  return (
    <mark
      className={twMerge(
        badgeStyle,
        principleStyle,
        look === "hint" && "bg-blue-300 text-blue-800",
        look === "gray" && "bg-gray-300",
        look === "white" && "bg-white",
        className,
      )}
    >
      {Icon && <Icon className="size-16 fill-gray-800" />}
      {children || text}
    </mark>
  );
}

export default Badge;
