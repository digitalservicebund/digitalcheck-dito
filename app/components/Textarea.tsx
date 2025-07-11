import type { ChangeEvent, ReactNode } from "react";
import { twJoin } from "tailwind-merge";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import InputWarning from "./InputWarning";
import RichText from "./RichText";

type TextareaProps = Readonly<{
  name: string;
  description?: string;
  label?: ReactNode;
  placeholder?: string;
  formId?: string;
  error?: string | null;
  warning?: string | null;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}>;

const Textarea = ({
  name,
  description,
  label,
  error,
  warning,
  onChange,
  className,
  ...props
}: TextareaProps) => {
  const errorId = `${name}-error`;
  const warningId = `${name}-warning`;

  return (
    <div className={className}>
      {label && (
        <InputLabel
          classname={description ? "ds-heading-03-reg" : "text-gray-900"}
          id={name}
        >
          {label}
        </InputLabel>
      )}
      {description && (
        <RichText markdown={description} className="ds-body-01-reg" />
      )}
      <textarea
        name={name}
        id={name}
        className={twJoin(
          "ds-textarea placeholder-gray-600 forced-color-adjust-none",
          error && "has-error",
        )}
        aria-invalid={error !== undefined}
        aria-describedby={error ? errorId : undefined}
        aria-errormessage={error ? errorId : undefined}
        onChange={onChange}
        {...props}
      />
      {error && <InputError id={errorId}>{error}</InputError>}
      {warning && <InputWarning id={warningId}>{warning}</InputWarning>}
    </div>
  );
};

export default Textarea;
