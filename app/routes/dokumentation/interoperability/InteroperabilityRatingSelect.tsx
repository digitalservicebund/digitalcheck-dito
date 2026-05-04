import { FormScope, useField, ValueOfInputType } from "@rvf/react";
import { useId } from "react";

type RatingOption = {
  label: string;
  value: string;
};

export function InteroperabilityRatingSelect({
  scope,
  levelDe,
}: Readonly<{
  scope: FormScope<ValueOfInputType<"select"> | undefined>;
  levelDe: string;
}>) {
  const field = useField(scope);
  const options: RatingOption[] = [
    {
      label: "förderlich",
      value: "positive",
    },
    {
      label: "neutral",
      value: "neutral",
    },
    {
      label: "negativ oder nicht förderlich",
      value: "risky",
    },
    {
      label: "nicht anwendbar",
      value: "not-applicable",
    },
  ];

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
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
