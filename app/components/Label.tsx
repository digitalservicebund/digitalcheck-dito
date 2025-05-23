import { ReactNode } from "react";
import { twJoin } from "tailwind-merge";

type LabelProps = {
  className?: string;
  children: ReactNode;
};

function Label({ className, children }: Readonly<LabelProps>) {
  const labelStyle =
    "ds-label-02-reg rounded-md bg-blue-300 px-4 py-2 text-blue-800 uppercase";

  return <span className={twJoin(labelStyle, className)}>{children}</span>;
}

export default Label;
