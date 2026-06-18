import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import type { FormScope } from "@rvf/react";
import { useField } from "@rvf/react";
import type { ReactNode } from "react";
import { useId } from "react";
import twMerge from "~/utils/tailwindMerge";
import InputError from "./InputError";

interface SelectProps {
  scope: FormScope<string | undefined>;
  options: string[];
  description?: ReactNode;
  error?: string | null;
  warningInsteadOfError?: boolean;
  children: ReactNode;
  className?: string;
}

function Select({
  children,
  scope,
  options,
  description,
  error,
  warningInsteadOfError,
  className,
}: Readonly<SelectProps>) {
  const field = useField(scope);
  const {
    ref: fieldRef,
    value: fieldValue,
    onChange: fieldOnChange,
    onBlur: fieldOnBlur,
    name: fieldName,
  } = field.getControlProps();
  const labelId = useId();
  const errorId = useId();
  const descriptionId = useId();
  const hasError = !!(error || field.error()) && !warningInsteadOfError;
  const hasWarning = !!(error || field.error()) && warningInsteadOfError;

  return (
    <div className={twMerge("space-y-8", className)}>
      <label id={labelId} className="ds-label-01-reg block">
        {children}
      </label>
      {description && (
        <p className="ds-body-02-reg block text-gray-900" id={descriptionId}>
          {description}
        </p>
      )}
      <Listbox
        value={fieldValue ?? ""}
        onChange={fieldOnChange}
        name={fieldName}
      >
        <ListboxButton
          ref={fieldRef}
          aria-labelledby={labelId}
          aria-describedby={description ? descriptionId : undefined}
          aria-invalid={hasError || hasWarning}
          aria-errormessage={hasError || hasWarning ? errorId : undefined}
          className={twMerge(
            "ds-select w-full text-left",
            hasError && "has-error",
            hasWarning && "has-warning",
          )}
          onBlur={fieldOnBlur}
        >
          {fieldValue ?? ""}
        </ListboxButton>
        <ListboxOptions
          anchor="bottom start"
          className="z-10 w-(--button-width) border border-gray-300 bg-white shadow-md focus:outline-none"
        >
          {options.map((option) => (
            <ListboxOption
              key={option}
              value={option}
              className="data-active:border-ds-blue-800 cursor-default border-l-4 border-transparent px-16 py-8 data-active:bg-blue-100 data-selected:font-bold"
            >
              {option}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>

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

export default Select;
