import { useField, type FormScope } from "@rvf/react";
import { ComponentPropsWithRef, useId } from "react";
import twMerge from "~/utils/tailwindMerge";
import InputError from "./InputError";

type Option<Value extends string | number> = {
  label: string;
  value: Value;
  subText?: string;
  id?: string;
};

type BaseInputProps = Omit<ComponentPropsWithRef<"input">, "type">;

interface RadioGroupProps<
  FormData,
  Value extends string | number = string,
> extends BaseInputProps {
  scope: FormScope<FormData>;
  options: Option<Value>[];
  className?: string;
  error?: string | null;
  warningInsteadOfError?: boolean;
}

function RadioGroup<FormData, Value extends string | number = string>({
  scope,
  options,
  "aria-labelledby": ariaLabelledby,
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

  /*
   Use div[role="radiogroup"] instead of a fieldset with legend since our forms
   use headings to indicate these form sections.
   The alternative, putting the heading inside the label, is generally
   discouraged because it creates extra noise.
  */
  return (
    <div
      role="radiogroup"
      className={twMerge("space-y-16", className)}
      aria-labelledby={ariaLabelledby}
      aria-errormessage={hasError ? errorId : undefined}
      aria-invalid={field.error() ? "true" : undefined}
    >
      {options.map((opt, idx) => {
        const id = opt.id ?? `${String(field.name())}-${idx}`;

        return (
          <p key={id}>
            <input
              {...field.getInputProps({
                type: "radio",
                id: id,
                "aria-errormessage": hasError ? errorId : undefined,
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
    </div>
  );
}

export default RadioGroup;
