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

  return (
    <div className="space-y-8">
      <label htmlFor={inputId} className="ds-body-01-bold">
        {children}
      </label>
      <input
        {...field.getInputProps({
          id: inputId,
          type,
          ref,
          "aria-describedby": errorId,
          "aria-invalid": !!field.error(),
          className: "ds-input placeholder-gray-600",
          ...rest,
        })}
      />
      <p className="ds-body-01-reg inline-block">{description}</p>
      {(error || field.error()) && (
        <InputError id={errorId}>{error || field.error()}</InputError>
      )}
    </div>
  );
}

export default InputNew;
