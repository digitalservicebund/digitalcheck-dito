import { ErrorOutline } from "@digitalservicebund/icons";
import type { PropsWithChildren } from "react";
import twMerge from "~/utils/tailwindMerge";

type InputErrorProps = PropsWithChildren<{
  id?: string;
  look?: "error" | "warning";
}>;

const InputError = ({ id, children, look = "error" }: InputErrorProps) => {
  return (
    <div
      aria-live="assertive"
      role="alert"
      id={id}
      data-testid={id}
      className={twMerge(
        "text-ds-error flex items-center gap-x-4",
        look === "warning" && "inline-flex bg-yellow-300 px-4 text-black",
      )}
    >
      {look === "error" && (
        <div className="shrink-0">
          <ErrorOutline className="fill-ds-error" />
        </div>
      )}
      <span className="sr-only">Fehler:</span> {children}
    </div>
  );
};

export default InputError;
