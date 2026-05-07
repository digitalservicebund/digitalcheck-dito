import RadioGroup from "~/components/RadioGroup.tsx";
import { useSyncedForm } from "~/routes/dokumentation/documentationDataHook.ts";
import { useDocumentationDataService } from "~/routes/dokumentation/DocumentationDataProvider.tsx";
import {
  euInteroperabilityOutcomeSchema,
  type EuInteroperabilityOutcome,
} from "~/routes/dokumentation/documentationDataSchema.ts";

const defaultValues: EuInteroperabilityOutcome = {
  outcomeId: "NOT_REQUIRED_INDICATES_PRECHECK",
};

const options = [
  {
    value: "REQUIRED",
    label: "Ja, Bezug zu EU-Interoperabilität ist vorhanden.",
  },
  {
    value: "NOT_REQUIRED_INDICATES_PRECHECK",
    label: "Nein, es ist kein Bezug vorhanden.",
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
