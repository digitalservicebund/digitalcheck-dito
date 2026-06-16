import type { FormScope, ValueOfInputType } from "@rvf/react";
import { useField } from "@rvf/react";
import { useId } from "react";
import { interoperabilityRatingOptions } from "~/routes/dokumentation/interoperability/values.ts";

export function InteroperabilityRatingSelect({
  scope,
  levelDe,
}: Readonly<{
  scope: FormScope<ValueOfInputType<"select"> | undefined>;
  levelDe: string;
}>) {
  const field = useField(scope);

  const selectId = useId();

  return (
    <div className="space-y-8">
      <p></p>
      <label htmlFor={selectId} className="block">
        Auswirkung auf <strong>{levelDe}</strong> Interoperabilität
      </label>

      <select
        {...field.getInputProps({
          id: selectId,
          className: "bg-white outline-2 p-8 outline-blue-800",
        })}
      >
        <option disabled={true} value="">
          bitte auswählen
        </option>
        {interoperabilityRatingOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
