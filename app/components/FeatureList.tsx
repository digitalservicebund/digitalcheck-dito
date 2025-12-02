import { ReactNode } from "react";
import twMerge from "~/utils/tailwindMerge";

export type FeatureListProps = {
  children: ReactNode;
  className?: string;
};

export const FeatureList = ({
  children,
  className,
}: Readonly<FeatureListProps>) => {
  return (
    <ul
      className={twMerge(
        "list-unstyled grid auto-cols-[1fr] gap-40 md:grid-flow-col",
        className,
      )}
    >
      {children}
    </ul>
  );
};

export type FeatureProps = {
  children: ReactNode;
};

export const Feature = ({ children }: Readonly<FeatureProps>) => {
  return <li className="flex flex-col gap-16">{children}</li>;
};
