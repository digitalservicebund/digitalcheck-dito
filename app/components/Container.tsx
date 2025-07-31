import type { PropsWithChildren } from "react";
import twMerge from "~/utils/tailwindMerge";

type ContainerProps = {
  overhangingBackground?: boolean;
  className?: string;
};

export default function Container({
  overhangingBackground,
  children,
  className,
}: PropsWithChildren<ContainerProps>) {
  const cssClasses = twMerge(
    "container pt-40 pb-48",
    overhangingBackground && "rounded-lg container-overhanging-background",
    className,
  );

  return <div className={cssClasses}>{children}</div>;
}
