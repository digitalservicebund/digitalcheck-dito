import twMerge from "@/utils/tailwindMerge";
import type { FormScope } from "@rvf/react";
import { useField } from "@rvf/react";
import type { ReactNode } from "react";
import { useId } from "react";
import InputError from "./InputError";

interface SelectProps {
  scope: FormScope<string | undefined>;
  options: string[];
  description?: ReactNode;
  error?: string | null;
  warningInsteadOfError?: boolean;
  children: ReactNode;
  className?: string;
}

function Select({
  children,
  scope,
  options,
  description,
  error,
  warningInsteadOfError,
  className,
}: Readonly<SelectProps>) {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();
  const descriptionId = useId();
  const hasError = !!(error || field.error()) && !warningInsteadOfError;
  const hasWarning = !!(error || field.error()) && warningInsteadOfError;

  return (
    <div className={twMerge("kern-form-input", className)}>
      <label htmlFor={inputId} className="kern-label">
        {children}
      </label>
      {description && (
        <p className="kern-hint" id={descriptionId}>
          {description}
        </p>
      )}
      <div
        className={twMerge(
          "kern-form-input__select-wrapper",
          hasWarning &&
            "border-yellow-700 focus-within:border-4 focus-within:border-yellow-700",
        )}
      >
        <select
          {...field.getInputProps({
            id: inputId,
            "aria-describedby": description ? descriptionId : undefined,
            "aria-invalid": hasError || hasWarning,
            "aria-errormessage": hasError || hasWarning ? errorId : undefined,
            className: twMerge(
              "kern-form-input__select bg-white",
              hasError && "kern-form-input__select--error",
            ),
          })}
        >
          <option value="">Bitte auswählen</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

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

export default Select;
