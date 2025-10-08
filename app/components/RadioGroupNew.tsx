import { useField, type FormScope } from "@rvf/react";
import { ComponentPropsWithRef, useId, type ReactNode } from "react";
import customTwMerge from "~/utils/tailwindMerge";
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
}

function RadioGroupNew<FormData, Value extends string | number = string>({
  scope,
  options,
  label,
  className,
  ref,
  required = true,
  ...rest
}: RadioGroupProps<FormData, Value>) {
  const field = useField(scope);
  const errorId = useId();

  return (
    <fieldset
      className={customTwMerge("space-y-16", className)}
      aria-labelledby={label ? `${field.name()}-label` : undefined}
      aria-errormessage={errorId}
      aria-invalid={!!field.error()}
      aria-required={required}
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
                ref,
                "aria-describedby": errorId,
                "aria-invalid": !!field.error(),
                className: "ds-radio self-start",
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

      {field.error() && errorId && (
        <InputError id={errorId}>{field.error()}</InputError>
      )}
    </fieldset>
  );
}

export default RadioGroupNew;
