import { FormScope } from "@rvf/react";
import { useOutletContext } from "react-router";
import { z } from "zod";
import Badge from "~/components/Badge.tsx";
import DetailsSummary from "~/components/DetailsSummary.tsx";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import RadioGroup from "~/components/RadioGroup.tsx";
import Textarea from "~/components/Textarea.tsx";
import {
  ROUTE_DOCUMENTATION_INTEROPERABILITY_LEGAL,
  ROUTE_DOCUMENTATION_SUMMARY,
} from "~/resources/staticRoutes";
import { useDocumentationDataService } from "~/routes/dokumentation/DocumentationDataProvider.tsx";
import { useSyncedForm } from "~/routes/dokumentation/documentationDataHook.ts";
import {
  interoperabilityAssessmentLevelSchema,
  interoperabilityAssessmentSchema,
} from "~/routes/dokumentation/documentationDataSchema.ts";
import SkipNoticeWrapper from "~/routes/dokumentation/interoperability/SkipNoticeWrapper.tsx";
import {
  defaultAssessmentValues,
  interoperabilityRatingOptions2,
} from "~/routes/dokumentation/interoperability/values.ts";
import { NavigationContext } from "./dokumentation._documentationNavigation";
import DocumentationActions from "./dokumentation/DocumentationActions";

function DetailFormElement({
  scope,
}: Readonly<{
  scope: FormScope<
    z.infer<typeof interoperabilityAssessmentLevelSchema>["detail"]
  >;
}>) {
  return (
    <Textarea
      description={`Tragen Sie Ihre Erläuterung ein, z. B.: „Die Datenübermittlung erfolgt
          ausschließlich nach dem Verfahren X.“ oder „Behörde A darf Daten von
          Behörde B abrufen.“`}
      scope={scope}
      rows={5}
      warningInsteadOfError
    >
      Erklärung
    </Textarea>
  );
}

export default function DocumentationInteroperabilityAssessment() {
  const { previousUrl, nextUrl } = useOutletContext<NavigationContext>();

  const { documentationData, setInteroperabilityAssessmentData } =
    useDocumentationDataService();

  const form = useSyncedForm({
    schema: interoperabilityAssessmentSchema,
    defaultValues: defaultAssessmentValues,
    storedData: documentationData.interoperabilityAssessment,
    setDataCallback: (data) =>
      setInteroperabilityAssessmentData(data ?? undefined),
  });

  return (
    <>
      <MetaTitle
        prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_INTEROPERABILITY_LEGAL.title}`}
      />
      <div className="space-y-40">
        <div className={"space-y-8"}>
          <Badge look="hint">Rechtliche Interoperabilität</Badge>
          <Heading tagName="h1" look="ds-heading-02-reg" className="mb-16">
            Rechtliche Grundlage für den Datenaustausch schaffen
          </Heading>
          <p>
            Eine Regelung sollte so gestaltet sein, dass Behörden Daten über
            Grenzen hinweg austauschen dürfen. Keine rechtlichen Barrieren
            dürfen einen digitalen Austausch blockieren.
          </p>
          <DetailsSummary title={"Beispiel"}>
            Eine Verordnung erlaubt es einer deutschen Behörde,
            Bildungsabschlüsse direkt digital bei einer Behörde in Frankreich zu
            verifizieren.
          </DetailsSummary>
        </div>
        <SkipNoticeWrapper>
          <h2 id="question-label" className="ds-heading-03-reg mb-16">
            Schafft das Regelungsvorhaben die <strong>rechtlichen</strong>{" "}
            Voraussetzungen für einen Datenaustausch innerhalb der EU?
          </h2>
          <RadioGroup
            aria-labelledby="question-label"
            scope={form.scope("legal.rating")}
            options={interoperabilityRatingOptions2}
            warningInsteadOfError
          />
          {form.value("legal.rating") === "positive" && (
            <DetailFormElement scope={form.scope("legal.detail")} />
          )}
        </SkipNoticeWrapper>
        <DocumentationActions
          previousUrl={previousUrl}
          nextUrl={nextUrl ?? ROUTE_DOCUMENTATION_SUMMARY.url}
          showDownloadDraftButton
          showSavingTip
        />
      </div>
    </>
  );
}
