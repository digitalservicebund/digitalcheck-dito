import { ChevronLeft } from "@digitalservicebund/icons";
import {
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Combobox as HeadlessCombobox,
} from "@headlessui/react";
import type { FormScope } from "@rvf/react";
import { useField } from "@rvf/react";
import { type ReactNode, useId, useMemo } from "react";
import InputError from "~/components/InputError";

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

  const displayValue = selectedValues
    .map((value) => {
      const option = optionsByValue.get(value);
      return option?.label ?? value;
    })
    .join(", ");

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
        <div className={"h-auto"}>
          <div className={"relative flex flex-wrap gap-8"}>
            <ComboboxInput
              className={"ds-textarea grow pr-32 data-multiple:text-sm"}
              placeholder={"Auswählen…"}
              displayValue={() => displayValue}
              data-multiple={selectedValues.length > 1 ? true : undefined}
            />
            <ComboboxButton className="group absolute inset-y-0 right-0 px-8">
              <ChevronLeft className="size-24 rotate-270 fill-black/60 group-data-hover:fill-black" />
            </ComboboxButton>
          </div>
        </div>
        <ComboboxOptions
          anchor="bottom"
          className="w-(--input-width) space-y-8 border border-gray-400 bg-white p-8 shadow-lg empty:invisible"
        >
          {options.map((option) => {
            return (
              <ComboboxOption
                key={option.value}
                value={option.value}
                className={"flex"}
              >
                {({ selected }) => (
                  <>
                    <input
                      id={legendId + option.value}
                      type="checkbox"
                      checked={selected}
                      onChange={() => undefined}
                      className="ds-checkbox ds-checkbox-small"
                    />
                    <label htmlFor={legendId + option.value}>
                      {option.label}
                    </label>
                  </>
                )}
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
