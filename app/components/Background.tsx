import { PropsWithChildren } from "react";
import twMerge from "~/utils/tailwindMerge";
import { BACKGROUND_COLORS, type BackgroundColor } from ".";

type Appearance = "highlight";

type BackgroundProps = {
  backgroundColor?: BackgroundColor;
  appearance?: Appearance;
  className?: string;
};

export default function Background({
  backgroundColor = "default",
  appearance,
  className,
  children,
}: PropsWithChildren<BackgroundProps>) {
  const cssClasses = twMerge(
    backgroundColor !== "default" && BACKGROUND_COLORS[backgroundColor],
    backgroundColor === "darkBlue" && "text-white",
    appearance === "highlight" &&
      `${BACKGROUND_COLORS.blue} rounded-lg px-16 py-40 sm:px-80`,
    className,
  );

  return <div className={cssClasses}>{children}</div>;
}
