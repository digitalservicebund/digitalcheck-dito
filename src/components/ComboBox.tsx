import InputError from "@/components/InputError";
import type { Option } from "@/utils/keyValue.ts";
import { Check, ChevronLeft } from "@digitalservicebund/icons";
import {
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Description,
  Field,
  Combobox as HeadlessCombobox,
  Label,
} from "@headlessui/react";
import type { FormScope } from "@rvf/react";
import { useField } from "@rvf/react";
import { type ReactNode, useId } from "react";

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
  const selectedSet = new Set(selectedValues);

  // fix for rvf's broken validation on controlled array elements (only show error when no options provided)
  const noneSelected = selectedValues.length === 0;
  const hasError =
    !!(error || field.error()) && !warningInsteadOfError && noneSelected;
  const hasWarning =
    !!(error || field.error()) && !!warningInsteadOfError && noneSelected;

  const displayValue = options
    .filter((option) => selectedSet.has(option.value))
    .map((option) => option.label)
    .join(", ");

  return (
    <Field className="space-y-8">
      {children && <Label className="ds-label-01-reg">{children}</Label>}
      {description && (
        <Description className="ds-body-02-reg block text-gray-900">
          {description}
        </Description>
      )}

      <HeadlessCombobox
        multiple
        immediate
        value={selectedValues}
        onChange={control.onChange}
      >
        <div className={"h-auto"}>
          <div className={"relative"}>
            <ComboboxInput
              data-multiple={selectedValues.length > 1 ? true : undefined}
              value={displayValue}
              className={"ds-textarea pr-32 data-multiple:text-sm"}
              aria-labelledby={children ? legendId : undefined}
              aria-describedby={description ? descriptionId : undefined}
            ></ComboboxInput>
            <ComboboxButton className="group absolute inset-y-0 right-0 px-8">
              <ChevronLeft className="size-24 rotate-270 fill-black/60 transition-transform group-data-hover:fill-black group-data-open:rotate-90" />
            </ComboboxButton>
          </div>
        </div>
        <ComboboxOptions
          anchor="bottom"
          className="w-(--input-width) space-y-8 border border-gray-400 bg-white shadow-lg empty:invisible"
        >
          {options.map((option) => {
            return (
              <ComboboxOption
                key={option.value}
                value={option.value}
                className="group flex p-8 data-focus:bg-blue-200"
              >
                <div className="grow">{option.label}</div>
                <Check className={"hidden group-data-selected:block"} />
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
    </Field>
  );
}
