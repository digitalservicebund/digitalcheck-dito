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
      label: `positive`,
      value: "positive",
    },
    {
      label: `neutrale`,
      value: "neutral",
    },
    {
      label: `negative oder riskante`,
      value: "risky",
    },
    {
      label: `(nicht anwendbare)`,
      value: "not-applicable",
    },
  ];

  const selectId = useId();

  return (
    <div className="space-y-8">
      <label htmlFor={selectId} className="ds-label-01-bold block">
        Bewerten Sie die Auswirkungen Ihres Vorhabens
      </label>
      <div>
        Das Vorhaben hat eine
        <select
          {...field.getInputProps({
            id: selectId,
            className: "bg-white outline-2 p-8 mx-8 outline-blue-800",
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
        </select>{" "}
        Auswirkung auf <strong>{levelDe}</strong> Interoperabilität
      </div>
    </div>
  );
}
