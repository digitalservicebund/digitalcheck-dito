import type { FormScope } from "@rvf/react";
import { useField } from "@rvf/react";
import { type ReactNode, useCallback, useId } from "react";
import InputError from "~/components/InputError";
import { Pill } from "./Pill";

export type Option = {
  value: string;
  label: string;
};
export type PillsProps = {
  options: Readonly<Option[]>;
  scope: FormScope<string[] | undefined>;
  children?: ReactNode;
  description?: ReactNode;
  error?: string | null;
  warningInsteadOfError?: boolean;
};

export default function Pills({
  options,
  scope,
  children,
  description,
  error,
  warningInsteadOfError,
}: Readonly<PillsProps>) {
  const field = useField(scope);

  const errorId = useId();
  const descriptionId = useId();
  const control = field.getControlProps();
  const selectedOptions = control.value;

  // fix for rvfs broken validation on controlled array elements (only show error when no aspects)
  const noneSelected = !selectedOptions?.length;
  const hasError =
    !!(error || field.error()) && !warningInsteadOfError && noneSelected;
  const hasWarning =
    !!(error || field.error()) && !!warningInsteadOfError && noneSelected;

  const toggle = useCallback(
    (value: string) => {
      const next = selectedOptions?.includes(value)
        ? selectedOptions.filter((v) => v !== value)
        : [...(selectedOptions ?? []), value];
      control.onChange(next);
    },
    [selectedOptions, control],
  );

  return (
    <fieldset
      className="space-y-8"
      aria-describedby={description ? descriptionId : undefined}
      aria-invalid={!hasError || hasWarning}
      aria-errormessage={hasError || hasWarning ? errorId : undefined}
    >
      <legend className="ds-label-01-reg">{children}</legend>
      {description && (
        <span className="ds-body-02-reg block text-gray-900" id={descriptionId}>
          {description}
        </span>
      )}
      <div className="flex flex-wrap gap-16">
        {options.map((option) => {
          const { label, value } = option;
          const selected = !!selectedOptions?.includes(value);
          return (
            <Pill
              key={value}
              label={label}
              value={value}
              selected={selected}
              onClick={toggle}
            />
          );
        })}
      </div>
      {(hasError || hasWarning) && (
        <InputError
          id={errorId}
          look={warningInsteadOfError ? "warning" : "error"}
        >
          {error || field.error()}
        </InputError>
      )}
    </fieldset>
  );
}
