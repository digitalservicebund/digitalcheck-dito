import { FormScope, useField } from "@rvf/react-router";
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
}

function Checkbox({
  children,
  scope,
  description,
  error,
  includeDisabledInForm,
  disabled,
  ...rest
}: Readonly<CheckboxProps>) {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();

  const specialDisabledInput = disabled && includeDisabledInForm;

  return (
    <div className="max-w-a11y space-y-8">
      <div className="flex flex-row items-center gap-16">
        <input
          {...field.getInputProps({
            type: "checkbox",
            id: inputId,
            "aria-describedby": errorId,
            "aria-invalid": !!field.error(),
            className: twJoin(
              "ds-checkbox self-start",
              specialDisabledInput && "hidden",
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
        <div>
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
        </div>
      </div>
      {(error || field.error()) && (
        <InputError id={errorId}>{error || field.error()}</InputError>
      )}
    </div>
  );
}

export default Checkbox;
