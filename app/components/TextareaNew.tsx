import { FormScope, useField, ValueOfInputType } from "@rvf/react";
import { ComponentPropsWithRef, ReactNode, useId } from "react";
import twMerge from "~/utils/tailwindMerge";
import InputError from "./InputError";

type BaseTextareaProps = ComponentPropsWithRef<"textarea">;

interface TextareaProps extends BaseTextareaProps {
  scope: FormScope<ValueOfInputType<"textarea"> | undefined>;
  size?: number;
  description?: ReactNode;
  error?: string | null;
  warningInsteadOfError?: boolean;
}

function TextareaNew({
  children,
  scope,
  description,
  error,
  warningInsteadOfError,
  ...rest
}: Readonly<TextareaProps>) {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();
  const descriptionId = useId();
  const hasError = !!(error || field.error()) && !warningInsteadOfError;
  const hasWarning = !!(error || field.error()) && warningInsteadOfError;

  return (
    <div className="space-y-8">
      <label htmlFor={inputId} className="ds-body-01-reg block">
        {children}
        {description && (
          <span
            className="ds-body-02-reg block text-gray-900"
            id={descriptionId}
          >
            {description}
          </span>
        )}
      </label>
      <textarea
        {...field.getInputProps({
          id: inputId,
          "aria-describedby": [
            hasError && errorId,
            description && descriptionId,
          ].join(" "),
          "aria-invalid": hasError || hasWarning,
          className: twMerge(
            "ds-textarea placeholder-gray-800",
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

export default TextareaNew;
