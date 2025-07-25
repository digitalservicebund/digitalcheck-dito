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
  let cssClasses = twMerge("container pt-40 pb-48", className);

  if (overhangingBackground) {
    cssClasses = twMerge(
      "rounded-lg container-overhanging-background",
      cssClasses,
    );
  }

  return <div className={cssClasses}>{children}</div>;
}
