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
  description,
  error,
  ...rest
}: Readonly<TextareaProps>) {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();
  const descriptionId = useId();

  return (
    <span className="space-y-2">
      <label htmlFor={inputId} className="ds-body-01-bold">
        {children}
      </label>
      <textarea
        {...field.getInputProps({
          id: inputId,
          "aria-describedby": [
            error && errorId,
            description && descriptionId,
          ].join(" "),
          "aria-invalid": !!field.error(),
          className: "ds-textarea placeholder-gray-600",
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

export default TextareaNew;
