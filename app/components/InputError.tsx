import ErrorOutline from "@digitalservicebund/icons/ErrorOutline";
import type { PropsWithChildren } from "react";

type InputErrorProps = PropsWithChildren<{
  id: string;
}>;

const InputError = ({ id, children }: InputErrorProps) => {
  return (
    <div
      aria-live="assertive"
      role="alert"
      id={id}
      data-testid={id}
      className="text-ds-error mt-16 flex items-center gap-x-4"
    >
      <div className="shrink-0">
        <ErrorOutline className="fill-ds-etext-ds-error" />
      </div>
      <span className="sr-only">Fehler:</span> {children}
    </div>
  );
};

export default InputError;
