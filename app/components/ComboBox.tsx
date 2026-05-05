import {
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Combobox as HeadlessCombobox,
} from "@headlessui/react";
import type { FormScope } from "@rvf/react";
import { useField } from "@rvf/react";
import { type ReactNode, useId, useMemo } from "react";
import InputError from "~/components/InputError";
import { Pill } from "./Pill";

export type Option = {
  value: string;
  label: string;
};

export type ComboboxProps = {
  options: Readonly<Option[]>;
  scope: FormScope<string[] | undefined>;
  children?: ReactNode;
  description?: ReactNode;
  error?: string | null;
  warningInsteadOfError?: boolean;
};

export default function Combobox({
  options,
  scope,
  children,
  description,
  error,
  warningInsteadOfError,
}: Readonly<ComboboxProps>) {
  const field = useField(scope);
  const legendId = useId();
  const errorId = useId();
  const descriptionId = useId();
  const control = field.getControlProps();
  const selectedValues = control.value ?? [];
  const optionsByValue = useMemo(
    () => new Map(options.map((option) => [option.value, option] as const)),
    [options],
  );

  // fix for rvf's broken validation on controlled array elements (only show error when no options provided)
  const noneSelected = selectedValues.length === 0;
  const hasError =
    !!(error || field.error()) && !warningInsteadOfError && noneSelected;
  const hasWarning =
    !!(error || field.error()) && !!warningInsteadOfError && noneSelected;

  return (
    <fieldset className="space-y-8">
      {children && (
        <legend className="ds-label-01-reg" id={legendId}>
          {children}
        </legend>
      )}
      {description && (
        <span className="ds-body-02-reg block text-gray-900" id={descriptionId}>
          {description}
        </span>
      )}

      <HeadlessCombobox
        multiple
        immediate
        value={selectedValues}
        onChange={control.onChange}
      >
        <div className={"ds-textarea h-auto"}>
          <div className={"flex flex-wrap gap-8"}>
            {selectedValues.map((value) => {
              const toggle = () =>
                control.onChange(
                  selectedValues.filter((thisValue) => thisValue !== value),
                );
              const option = optionsByValue.get(value);
              return (
                <Pill
                  key={value}
                  label={option?.label ?? value}
                  value={value}
                  selected={true}
                  onClick={toggle}
                />
              );
            })}
          </div>
          <ComboboxInput placeholder={"Mehr hinzufügen…"} className="w-full" />
        </div>
        <ComboboxOptions
          anchor="bottom"
          className="w-(--input-width) border border-gray-400 bg-white empty:invisible"
        >
          {options.map((option) => {
            if (selectedValues.includes(option.value)) return null;
            return (
              <ComboboxOption
                key={option.value}
                value={option.value}
                className="cursor-pointer px-12 py-8 data-focus:bg-blue-100 data-selected:font-bold"
              >
                {option.label}
              </ComboboxOption>
            );
          })}
        </ComboboxOptions>
      </HeadlessCombobox>

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
