import { FormScope, useField } from "@rvf/react";
import { ComponentPropsWithRef, ReactNode, useId } from "react";
import { twJoin } from "tailwind-merge";
import InputError from "./InputError";

type BaseInputProps = Omit<
  ComponentPropsWithRef<"input">,
  "type" | "defaultValue"
>;

interface CheckboxProps extends BaseInputProps {
  scope: FormScope<"on" | true | undefined>;
  size?: number;
  description?: ReactNode;
  error?: string | null;
  includeDisabledInForm?: boolean;
  defaultValue?: "on";
  warningInsteadOfError?: boolean;
}

function Checkbox({
  children,
  scope,
  description,
  error,
  includeDisabledInForm,
  disabled,
  warningInsteadOfError,
  ...rest
}: Readonly<CheckboxProps>) {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();
  const specialDisabledInput = disabled && includeDisabledInForm;
  const hasError = !!(error || field.error()) && !warningInsteadOfError;
  const hasWarning = !!(error || field.error()) && warningInsteadOfError;

  return (
    <div className="max-w-a11y space-y-8">
      <div className="flex flex-row items-center gap-16">
        <input
          {...field.getInputProps({
            type: "checkbox",
            id: inputId,
            "aria-describedby": errorId,
            "aria-invalid": hasError || hasWarning,
            className: twJoin(
              "ds-checkbox self-start bg-white",
              specialDisabledInput && "hidden",
              hasError && "has-error",
              hasWarning && "has-warning",
            ),
            ...rest,
          })}
        />
        {specialDisabledInput && (
          <input
            type="checkbox"
            className="ds-checkbox self-start"
            value={field.value() ? "on" : undefined}
            checked={!!field.value()}
            disabled
          />
        )}
        <div className="space-y-8">
          <label
            htmlFor={inputId}
            className={twJoin(
              "ds-body-01-bold min-h-auto! space-x-8 p-0!", // overwrite styles from ds-checkbox with "!"
              disabled && "pointer-events-none",
            )}
          >
            {children}
          </label>
          <p className="ds-body-01-reg block">{description}</p>
          {(hasError || hasWarning) && (
            <InputError
              id={errorId}
              look={warningInsteadOfError ? "warning" : "error"}
            >
              {error || field.error()}
            </InputError>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkbox;
