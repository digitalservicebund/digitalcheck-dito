import { FormScope, useField } from "@rvf/react";
import { useOutletContext } from "react-router";
import { z } from "zod";
import Badge from "~/components/Badge.tsx";
import DetailsSummary from "~/components/DetailsSummary.tsx";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import RadioGroup from "~/components/RadioGroup.tsx";
import Textarea from "~/components/Textarea.tsx";

import { dokumentation_zusammenfassung } from "@/config/routes.ts";
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
  scope: FormScope<z.infer<typeof interoperabilityAssessmentLevelSchema>>;
}>) {
  const field = useField(scope.scope("rating"));
  const radioValue = field.value();
  if (!radioValue || radioValue === "not-applicable") {
    return null;
  }
  return (
    <Textarea
      description={
        "Tragen Sie Ihre Erläuterung ein, z. B.: „Anträge müssen innerhalb von 3 Tagen an die zuständige Stelle weitergeleitet werden.“ und Benennung der Stelle."
      }
      scope={scope.scope("detail")}
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
      <MetaTitle prefix={"Dokumentation: Organisatorische Interoperabilität"} />
      <div className="space-y-40">
        <div className={"space-y-8"}>
          <Badge look="hint">Organisatorische Interoperabilität</Badge>
          <Heading tagName="h1" look="ds-heading-02-reg" className="mb-16">
            Organisatorische Strukturen für Interoperabilität
          </Heading>
          <p>
            Zuständigkeiten und Prozesse müssen so abgestimmt sein, dass die
            Zusammenarbeit reibungslos funktionieren kann, anstatt an
            Behördengrenzen zu stocken.
          </p>
          <DetailsSummary title={"Beispiel"}>
            Wenn ein Unternehmen seinen Standort von Deutschland nach Spanien
            verlegt, sind die beteiligten Behörden beider Länder (z. B. über das
            Single Digital Gateway) miteinander verknüpft, um die
            Gewerbeummeldung abzuwickeln. Auch Zuständigkeiten müssen dazu
            geklärt sein.
          </DetailsSummary>
        </div>
        <SkipNoticeWrapper>
          <h2 id="question-label" className="ds-heading-03-reg mb-16">
            Schafft das Regelungsvorhaben die <strong>organisatorischen</strong>{" "}
            Voraussetzungen für einen Datenaustausch innerhalb der EU?
          </h2>
          <RadioGroup
            aria-labelledby="question-label"
            scope={form.scope("organizational.rating")}
            options={interoperabilityRatingOptions2}
            warningInsteadOfError
          />
          <DetailFormElement scope={form.scope("organizational")} />
        </SkipNoticeWrapper>
        <DocumentationActions
          previousUrl={previousUrl}
          nextUrl={nextUrl ?? dokumentation_zusammenfassung.path}
          showDownloadDraftButton
          showSavingTip
        />
      </div>
    </>
  );
}
