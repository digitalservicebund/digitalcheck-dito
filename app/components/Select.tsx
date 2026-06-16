import type { FormScope } from "@rvf/react";
import { useField } from "@rvf/react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { useId } from "react";
import twMerge from "~/utils/tailwindMerge";
import InputError from "./InputError";

type BaseSelectProps = ComponentPropsWithRef<"select">;

interface SelectProps extends BaseSelectProps {
  scope: FormScope<string | undefined>;
  options: string[];
  description?: ReactNode;
  error?: string | null;
  warningInsteadOfError?: boolean;
}

function Select({
  children,
  scope,
  options,
  description,
  error,
  warningInsteadOfError,
  ...rest
}: Readonly<SelectProps>) {
  const field = useField(scope);
  const selectId = useId();
  const errorId = useId();
  const descriptionId = useId();
  const hasError = !!(error || field.error()) && !warningInsteadOfError;
  const hasWarning = !!(error || field.error()) && warningInsteadOfError;

  return (
    <div className="space-y-8">
      <label htmlFor={selectId} className="ds-label-01-reg block">
        {children}
      </label>
      {description && (
        <p className="ds-body-02-reg block text-gray-900" id={descriptionId}>
          {description}
        </p>
      )}
      <select
        {...field.getInputProps({
          id: selectId,
          "aria-describedby": description ? descriptionId : undefined,
          "aria-invalid": hasError || hasWarning,
          "aria-errormessage": hasError || hasWarning ? errorId : undefined,
          className: twMerge(
            "ds-select",
            hasError && "has-error",
            hasWarning && "has-warning",
          ),
          ...rest,
        })}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

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
