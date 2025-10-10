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
    <>
      <label htmlFor={inputId} className="ds-label-02-reg">
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
      {description && (
        <p className="ds-label-03-reg mt-2 inline-block">{description}</p>
      )}
      {(error || field.error()) && (
        <InputError id={errorId}>{error || field.error()}</InputError>
      )}
    </>
  );
}

export default InputNew;
