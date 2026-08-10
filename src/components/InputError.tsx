import twMerge from "@/utils/tailwindMerge";
import type { PropsWithChildren } from "react";

type InputErrorProps = PropsWithChildren<{
  id?: string;
  look?: "error" | "warning";
}>;

const InputError = ({ id, children, look = "error" }: InputErrorProps) => {
  return (
    <p className="kern-error" id={id}>
      {
        <span
          className={twMerge(
            "kern-icon kern-icon--warning kern-icon--md",
            "!bg-yellow-700",
          )}
          aria-hidden="true"
        ></span>
      }
      <span className="kern-body">{children}</span>
    </p>
  );
};

export default InputError;
