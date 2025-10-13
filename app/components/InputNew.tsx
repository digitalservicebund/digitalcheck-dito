import { FormScope, useField, ValueOfInputType } from "@rvf/react-router";
import { ComponentPropsWithRef, ReactNode, useId } from "react";
import InputError from "./InputError";

type BaseInputProps = ComponentPropsWithRef<"input">;

interface InputProps extends BaseInputProps {
  scope: FormScope<ValueOfInputType<"checkbox"> | undefined>;
  size?: number;
  description?: ReactNode;
  error?: string | null;
}

function InputNew({
  children,
  scope,
  ref,
  description,
  error,
  type,
  ...rest
}: InputProps) {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();
  const descriptionId = useId();

  return (
    <span className="space-y-2">
      <label htmlFor={inputId} className="ds-label-02-reg">
        {children}
      </label>
      <input
        {...field.getInputProps({
          id: inputId,
          type,
          ref,
          "aria-describedby": [
            error && errorId,
            description && descriptionId,
          ].join(" "),
          "aria-invalid": !!field.error(),
          className: "ds-input placeholder-gray-600",
          ...rest,
        })}
      />
      {description && (
        <p className="ds-label-03-reg inline-block" id={descriptionId}>
          {description}
        </p>
      )}
      {(error || field.error()) && (
        <InputError id={errorId}>{error || field.error()}</InputError>
      )}
    </span>
  );
}

export default InputNew;
