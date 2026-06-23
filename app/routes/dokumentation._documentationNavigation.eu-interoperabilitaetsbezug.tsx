import { interoperabel } from "@/config/routes.ts";
import { useId } from "react";
import Heading from "~/components/Heading";
import HelpButton from "~/components/HelpButton.tsx";
import RadioGroup from "~/components/RadioGroup.tsx";
import RichText from "~/components/RichText.tsx";
import { useSyncedForm } from "~/routes/dokumentation/documentationDataHook.ts";
import { useDocumentationDataService } from "~/routes/dokumentation/DocumentationDataProvider.tsx";
import type { EuInteroperabilityOutcome } from "~/routes/dokumentation/documentationDataSchema.ts";
import {
  EU_INTEROPERABILITY_OUTCOME_IDS,
  euInteroperabilityOutcomeSchema,
} from "~/routes/dokumentation/documentationDataSchema.ts";
import { IEAContactBanner } from "~/routes/dokumentation/interoperability/IEAContactBanner.tsx";
import { markdownLinkIEA } from "~/routes/dokumentation/interoperability/markdownLinkIEA.tsx";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useDocumentationNavigation } from "./dokumentation/DocumentationNavigationContext";

const helpText = `
**Was bedeutet das?**

Sofern durch Ihre Regelung vorgesehen ist, dass Daten und Informationen zwischen
Verwaltungen von EU-Mitgliedsstaaten ausgetauscht werden, muss nach
${markdownLinkIEA({ article: 3, format: "long" })} in der Regel
eine Interoperabilitätsbewertung durchgeführt werden.`;

const secondaryHelpText = `
Sollte sich nach den Bestimmungen der Verordnung dennoch keine Verpflichtung zu einer Bewertung ergeben und Sie möchten auch keine frewillige Bewertung durchführen, wählen Sie die Option "Nein, es ist kein Bezug vorhanden".`;

const defaultValues: EuInteroperabilityOutcome = {
  outcomeId: undefined,
};

const options = [
  {
    value: "REQUIRED",
    label: "Ja, Bezug zu EU-Interoperabilität ist vorhanden.",
  },
  {
    value: "NOT_REQUIRED",
    label: "Nein, es ist kein Bezug vorhanden.",
  },
] as const satisfies {
  label: string;
  value: (typeof EU_INTEROPERABILITY_OUTCOME_IDS)[number];
}[];

export function DocumentationEuInteroperabilityRequirements() {
  const { previousUrl, nextUrl } = useDocumentationNavigation();
  const labelId = useId();
  const { documentationData, setEuInteroperabilityOutcome } =
    useDocumentationDataService();

  const form = useSyncedForm({
    schema: euInteroperabilityOutcomeSchema,
    defaultValues,
    storedData: documentationData.euInteroperabilityOutcome,
    setDataCallback: (data) => {
      setEuInteroperabilityOutcome(data ?? {});
    },
  });

  return (
    <div className="space-y-40">
      <Heading
        text="Bezug zu EU-Interoperabilität"
        tagName="h1"
        look="ds-heading-02-reg"
        className="mb-16"
      />
      <form {...form.getFormProps()} className="space-y-20">
        <div>
          <p className="inline" id={labelId}>
            Ergab die Vorprüfung Bezug zu EU-Interoperabilität?
          </p>
          <HelpButton
            sectionId="bezug-interoperabilität"
            title={"Bezug zu EU-Interoperabilität"}
          >
            <RichText markdown={helpText} />
            <a
              href={
                interoperabel.path +
                "?tab=hintergrund#verbindliche-anforderungen"
              }
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Wann ist eine Interoperabilitäts-Bewertung verpflichtend?
            </a>
            <RichText markdown={secondaryHelpText} className="mt-8" />
          </HelpButton>
        </div>

        <RadioGroup
          scope={form.scope("outcomeId")}
          options={options}
          aria-labelledby={labelId}
        />
      </form>

      <DocumentationActions
        previousUrl={previousUrl}
        nextUrl={nextUrl}
        showDownloadDraftButton
        showSavingTip
      />

      <IEAContactBanner />
    </div>
  );
}
