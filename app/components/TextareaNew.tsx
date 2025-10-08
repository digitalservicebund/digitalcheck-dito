import { FormScope, useField, ValueOfInputType } from "@rvf/react-router";
import { ComponentPropsWithRef, ReactNode, useId } from "react";
import InputError from "./InputError";

type BaseTextareaProps = ComponentPropsWithRef<"textarea">;

interface TextareaProps extends BaseTextareaProps {
  scope: FormScope<ValueOfInputType<"textarea"> | undefined>;
  size?: number;
  description?: ReactNode;
  error?: string | null;
}

function TextareaNew({
  children,
  scope,
  ref,
  description,
  error,
  ...rest
}: TextareaProps) {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();

  return (
    <div className="space-y-8">
      <label htmlFor={inputId} className="ds-body-01-bold">
        {children}
      </label>
      <textarea
        {...field.getInputProps({
          id: inputId,
          ref,
          "aria-describedby": errorId,
          "aria-invalid": !!field.error(),
          className: "ds-textarea placeholder-gray-600",
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

export default TextareaNew;
