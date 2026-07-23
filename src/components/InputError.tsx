import twMerge from "@/utils/tailwindMerge";
import { ErrorOutline } from "@digitalservicebund/icons";
import type { PropsWithChildren } from "react";

type InputErrorProps = PropsWithChildren<{
  id?: string;
  look?: "error" | "warning";
}>;

const InputError = ({ id, children, look = "error" }: InputErrorProps) => {
  return (
    <div>
      {look === "warning" && (
        <p className="kern-error" id={id}>
          <span
            className={twMerge(
              "kern-icon kern-icon--warning kern-icon--md",
              "!bg-ds-yellow-700",
            )}
            aria-hidden="true"
          ></span>
          <span className="kern-body">{children}</span>
        </p>
      )}
      {look === "error" && (
        <div className="shrink-0">
          <ErrorOutline className="fill-ds-error" />
        </div>
      )}
    </div>

    // <div
    //   aria-live="assertive"
    //   role="alert"
    //   id={id}
    //   data-testid={id}
    //   className={twMerge(
    //     "text-ds-error flex items-center gap-x-4",
    //     look === "warning" && "bg-ds-yellow-300 inline-flex px-4 text-black",
    //   )}
    // >
    // {look === "error" && (
    //   <div className="shrink-0">
    //     <ErrorOutline className="fill-ds-error" />
    //   </div>
    // )}
    //   <span className="sr-only">Fehler:</span> {children}
    // </div>
  );
};

export default InputError;
