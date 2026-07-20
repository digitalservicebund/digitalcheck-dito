import twMerge from "@/utils/tailwindMerge";
import type { FormScope, ValueOfInputType } from "@rvf/react";
import { useField } from "@rvf/react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { useId } from "react";
import InputError from "./InputError";

type BaseInputProps = ComponentPropsWithRef<"input">;

interface InputProps extends BaseInputProps {
  scope: FormScope<ValueOfInputType<"checkbox"> | undefined>;
  size?: number;
  description?: ReactNode;
  error?: string | null;
  warningInsteadOfError?: boolean;
}

function Input({
  children,
  scope,
  description,
  error,
  type,
  warningInsteadOfError,
  ...rest
}: Readonly<InputProps>) {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();
  const descriptionId = useId();
  const hasError = !!(error || field.error()) && !warningInsteadOfError;
  const hasWarning = !!(error || field.error()) && warningInsteadOfError;

  return (
    <div className="space-y-8">
      <label htmlFor={inputId} className="ds-label-01-reg block">
        {children}
      </label>
      {description && (
        <p className="ds-body-02-reg text-ds-gray-900 block" id={descriptionId}>
          {description}
        </p>
      )}
      <input
        {...field.getInputProps({
          id: inputId,
          type,
          "aria-describedby": description ? descriptionId : undefined,
          "aria-invalid": hasError || hasWarning,
          "aria-errormessage": hasError || hasWarning ? errorId : undefined,
          className: twMerge(
            "ds-input placeholder-ds-gray-800",
            hasError && "has-error",
            hasWarning && "has-warning",
          ),
          ...rest,
        })}
      />

      {(hasError || hasWarning) && (
        <InputError
          id={errorId}
          look={warningInsteadOfError ? "warning" : "error"}
        >
          {error || field.error()}
        </InputError>
      )}
    </div>
  );
}

export default Input;
