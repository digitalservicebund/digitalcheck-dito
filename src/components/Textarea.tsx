import twMerge from "@/utils/tailwindMerge";
import type { FormScope, ValueOfInputType } from "@rvf/react";
import { useField } from "@rvf/react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { useId } from "react";

type BaseTextareaProps = ComponentPropsWithRef<"textarea">;

interface TextareaProps extends BaseTextareaProps {
  scope: FormScope<ValueOfInputType<"textarea"> | undefined>;
  size?: number;
  description?: ReactNode;
  error?: string | null;
  warningInsteadOfError?: boolean;
}

function Textarea({
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
    <div className="kern-form-input space-y-8">
      <label htmlFor={inputId} className="kern-label">
        {children}
      </label>
      {description && (
        <div
          className="ds-body-02-reg text-ds-gray-900 block"
          id={descriptionId}
        >
          {description}
        </div>
      )}
      <textarea
        {...field.getInputProps({
          id: inputId,
          "aria-describedby": description ? descriptionId : undefined,
          "aria-invalid": hasError || hasWarning,
          "aria-errormessage": hasError || hasWarning ? errorId : undefined,
          className: twMerge(
            "kern-form-input__input",
            hasError && "kern-form-input__input--error",
            hasWarning &&
              "bg-white border-ds-yellow-700 text-black focus:border-4 focus:border-ds-yellow-700 focus:outline-none",
          ),
          ...rest,
        })}
      />

      {(hasError || hasWarning) && (
        <p className="kern-error" id={errorId}>
          <span
            className={twMerge(
              "kern-icon kern-icon--warning kern-icon--md",
              (hasWarning || hasError) && "!bg-ds-yellow-700",
            )}
            aria-hidden="true"
          ></span>
          <span className="kern-body">{error || field.error()}</span>
        </p>
      )}
    </div>
  );
}

export default Textarea;
