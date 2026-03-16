import type { FormScope } from "@rvf/react";
import { useField } from "@rvf/react";
import { type ReactNode, useId } from "react";
import InputError from "~/components/InputError";
import type { PrinzipAspekt } from "~/utils/strapiData.server";
import { Pill } from "./Pill";

type AspectPillsProps = {
  aspekte: PrinzipAspekt[];
  scope: FormScope<string[]>;
  children: ReactNode;
  description?: ReactNode;
  error?: string | null;
};

export default function AspectPills({
  aspekte,
  scope,
  children,
  description,
  error,
}: Readonly<AspectPillsProps>) {
  const field = useField(scope);
  const selectedAspects: string[] = field.value() ?? [];
  const errorId = useId();
  const descriptionId = useId();
  const fieldError = error || field.error() || null;

  function toggle(value: string) {
    const next = selectedAspects.includes(value)
      ? selectedAspects.filter((v) => v !== value)
      : [...selectedAspects, value];
    field.setValue(next);
  }

  return (
    <fieldset
      className="space-y-8"
      aria-describedby={description ? descriptionId : undefined}
      aria-errormessage={fieldError ? errorId : undefined}
      aria-invalid={!!fieldError || undefined}
    >
      <legend className="ds-label-01-reg">{children}</legend>
      {description && (
        <span className="ds-body-02-reg block text-gray-900" id={descriptionId}>
          {description}
        </span>
      )}
      <div className="flex flex-wrap gap-16">
        {aspekte.map((aspekt) => {
          const value = aspekt.Kurzbezeichnung;
          const selected = selectedAspects.includes(value);
          return (
            <Pill
              key={value}
              value={value}
              selected={selected}
              onClick={toggle}
            />
          );
        })}
      </div>
      {fieldError && <InputError id={errorId}>{fieldError}</InputError>}
    </fieldset>
  );
}
