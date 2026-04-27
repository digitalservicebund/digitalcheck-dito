import { FormScope, useField } from "@rvf/react";
import {
  ChangeEventHandler,
  ComponentPropsWithRef,
  ReactNode,
  useId,
} from "react";
import { twJoin } from "tailwind-merge";
import InputError from "./InputError";

type BaseInputProps = Omit<
  ComponentPropsWithRef<"input">,
  "type" | "defaultValue"
>;

export interface CheckboxProps extends BaseInputProps {
  scope: FormScope<"on" | true | undefined>;
  size?: number;
  description?: ReactNode;
  error?: string | null;
  defaultValue?: "on";
  warningInsteadOfError?: boolean;
  /**
   * Use this prop to make the component controlled.
   */
  checked?: boolean;
  /**
   * Change handler that overrides the RVF handler, to enable custom behavior.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function Checkbox({
  children,
  scope,
  description,
  error,
  disabled,
  warningInsteadOfError,
  checked,
  onChange,
  ...rest
}: Readonly<CheckboxProps>) {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();
  const hasError = !!(error || field.error()) && !warningInsteadOfError;
  const hasWarning = !!(error || field.error()) && warningInsteadOfError;

  const inputProps = field.getInputProps({
    type: "checkbox",
    id: inputId,
    "aria-describedby": errorId,
    "aria-invalid": hasError || hasWarning,
    className: twJoin(
      "ds-checkbox self-start bg-white",
      hasError && "has-error",
      hasWarning && "has-warning",
    ),
    ...rest,
  });

  if (onChange) {
    // override the RVF handler if another one is provided explicitly
    inputProps.onChange = onChange;
  }
  if (checked) {
    // prevent warning about conflicting values
    delete inputProps.defaultChecked;
  }

  return (
    <div className="max-w-a11y space-y-8">
      <div className="flex flex-row items-center gap-16">
        <input checked={checked} {...inputProps} />
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
