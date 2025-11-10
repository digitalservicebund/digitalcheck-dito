import { useField, type FormScope } from "@rvf/react";
import { ComponentPropsWithRef, useId, type ReactNode } from "react";
import twMerge from "~/utils/tailwindMerge";
import InputError from "./InputError";

type Option<Value extends string | number> = {
  label: string;
  value: Value;
  subText?: string;
  id?: string;
};

type BaseInputProps = Omit<ComponentPropsWithRef<"input">, "type">;

interface RadioGroupProps<FormData, Value extends string | number = string>
  extends BaseInputProps {
  scope: FormScope<FormData>;
  options: Option<Value>[];
  label?: ReactNode;
  className?: string;
  error?: string | null;
  warningInsteadOfError?: boolean;
}

function RadioGroupNew<FormData, Value extends string | number = string>({
  scope,
  options,
  label,
  className,
  error,
  warningInsteadOfError,
  required = true,
  ...rest
}: Readonly<RadioGroupProps<FormData, Value>>) {
  const field = useField(scope);
  const errorId = useId();
  const hasError = !!(error || field.error()) && !warningInsteadOfError;
  const hasWarning = !!(error || field.error()) && warningInsteadOfError;

  return (
    <fieldset
      className={twMerge("space-y-16", className)}
      aria-labelledby={label ? `${field.name()}-label` : undefined}
      aria-errormessage={errorId}
      aria-invalid={!!field.error()}
    >
      {label ? (
        <legend id={`${field.name()}-label`} className="mb-24">
          {label}
        </legend>
      ) : null}

      {options.map((opt, idx) => {
        const id = opt.id ?? `${String(field.name())}-${idx}`;

        return (
          <p key={id}>
            <input
              {...field.getInputProps({
                type: "radio",
                id: id,
                "aria-describedby": errorId,
                "aria-invalid": hasError || hasWarning,
                "aria-required": required,
                className: twMerge(
                  "ds-radio self-start",
                  hasError && "has-error",
                  hasWarning && "has-warning",
                ),
                value: opt.value,
                ...rest,
              })}
            />
            <label htmlFor={id}>
              {opt.label}
              {opt.subText && (
                <span className="ds-body-02-reg text-gray-800">
                  {opt.subText}
                </span>
              )}
            </label>
          </p>
        );
      })}

      {(hasError || hasWarning) && (
        <InputError
          id={errorId}
          look={warningInsteadOfError ? "warning" : "error"}
        >
          {error || field.error()}
        </InputError>
      )}
    </fieldset>
  );
}

export default RadioGroupNew;
