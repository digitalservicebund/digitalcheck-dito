import RadioGroup from "~/components/RadioGroup.tsx";
import { useSyncedForm } from "~/routes/dokumentation/documentationDataHook.ts";
import { useDocumentationDataService } from "~/routes/dokumentation/DocumentationDataProvider.tsx";
import {
  euInteroperabilityOutcomeSchema,
  type EuInteroperabilityOutcome,
} from "~/routes/dokumentation/documentationDataSchema.ts";

const defaultValues: EuInteroperabilityOutcome = {
  outcomeId: "NOT_REQUIRED_NO_REASON",
};

const options = [
  { value: "REQUIRED", label: "Ja, eine Bewertung ist erforderlich." },
  {
    value: "NOT_REQUIRED_NO_REASON",
    label: "Nein, eine Bewertung ist nicht erforderlich.",
  },
] as const;

export default function EuInteroperabilityOutcomeForm() {
  const { documentationData, setEuInteroperabilityOutcome } =
    useDocumentationDataService();

  const form = useSyncedForm({
    schema: euInteroperabilityOutcomeSchema,
    defaultValues,
    storedData: documentationData.euInteroperabilityOutcome,
    setDataCallback: (data) => setEuInteroperabilityOutcome(data ?? undefined),
  });

  return (
    <form {...form.getFormProps()}>
      <RadioGroup
        scope={form.scope("outcomeId")}
        options={options}
        aria-labelledby="outcome-label"
      />
    </form>
  );
}
