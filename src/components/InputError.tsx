import twMerge from "@/utils/tailwindMerge";
import { ErrorOutline } from "@digitalservicebund/icons";
import type { PropsWithChildren } from "react";

type InputErrorProps = PropsWithChildren<{
  id?: string;
  look?: "error" | "warning";
}>;

const InputError = ({ id, children, look = "error" }: InputErrorProps) => {
  return (
    <p className="kern-error" id={id}>
      {look === "warning" && (
        <span
          className={twMerge(
            "kern-icon kern-icon--warning kern-icon--md",
            "!bg-yellow-700",
          )}
          aria-hidden="true"
        ></span>
      )}
      {look === "error" && (
        <div className="shrink-0">
          <ErrorOutline className="fill-ds-error" />
        </div>
      )}
      <span className="kern-body">{children}</span>
    </p>
  );
};

export default InputError;
