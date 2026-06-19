import type { FormScope } from "@rvf/react";
import { useField } from "@rvf/react";
import type { z } from "zod";
import Badge from "~/components/Badge.tsx";
import DetailsSummary from "~/components/DetailsSummary.tsx";
import Heading from "~/components/Heading";
import RadioGroup from "~/components/RadioGroup.tsx";
import Textarea from "~/components/Textarea.tsx";

import { dokumentation_zusammenfassung } from "@/config/routes.ts";
import { useDocumentationDataService } from "~/routes/dokumentation/DocumentationDataProvider.tsx";
import { useSyncedForm } from "~/routes/dokumentation/documentationDataHook.ts";
import { interoperabilityAssessmentLevelSchema } from "~/routes/dokumentation/documentationDataSchema.ts";
import { IEAContactBanner } from "~/routes/dokumentation/interoperability/IEAContactBanner.tsx";
import SkipNoticeWrapper from "~/routes/dokumentation/interoperability/SkipNoticeWrapper.tsx";
import { interoperabilityRatingOptions } from "~/routes/dokumentation/interoperability/values.ts";
import type { PrinzipWithAspekteAndExample } from "~/utils/strapiData.types";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useDocumentationNavigation } from "./dokumentation/DocumentationNavigationContext";

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
        "Tragen Sie Ihre Erläuterung ein, z. B.: „Behörde A darf Daten von Behörde B abrufen.“"
      }
      scope={scope.scope("detail")}
      rows={5}
      warningInsteadOfError
    >
      Erklärung
    </Textarea>
  );
}

export function DocumentationInteroperabilityAssessmentLegal() {
  const { previousUrl, nextUrl } = useDocumentationNavigation();

  const { documentationData, setInteroperabilityAssessmentData } =
    useDocumentationDataService();

  const form = useSyncedForm({
    schema: interoperabilityAssessmentLevelSchema,
    defaultValues: { detail: "", rating: "" },
    storedData: documentationData.interoperabilityAssessment?.legal,
    setDataCallback: (data) => setInteroperabilityAssessmentData("legal", data),
  });

  return (
    <div className="space-y-40">
      <div className={"space-y-8"}>
        <Badge look="hint">Rechtliche Interoperabilität</Badge>
        <Heading tagName="h1" look="ds-heading-02-reg" className="mb-16">
          Rechtliche Grundlage für den Datenaustausch schaffen
        </Heading>
        <p>
          Eine Regelung sollte so gestaltet sein, dass Behörden Daten über
          Grenzen hinweg austauschen dürfen. Keine rechtlichen Barrieren dürfen
          einen digitalen Austausch blockieren.
        </p>
        <DetailsSummary title={"Beispiel"}>
          Der Gesetzesentwurf ermächtigt die zuständige deutsche Behörde [X],
          Nachweise zu Bildungsabschlüssen direkt bei den zuständigen Stellen
          anderer EU-Mitgliedstaaten zu überprüfen. Den ausländischen Behörden
          wird spiegelbildlich das Recht eingeräumt, entsprechende
          Überprüfungsanfragen an die deutsche Behörde zu richten.
        </DetailsSummary>
      </div>
      <SkipNoticeWrapper>
        <h2 id="question-label" className="ds-heading-03-reg mb-16">
          Schafft das Regelungsvorhaben die <strong>rechtlichen</strong>{" "}
          Voraussetzungen für einen Datenaustausch innerhalb der EU?
        </h2>
        <RadioGroup
          aria-labelledby="question-label"
          scope={form.scope("rating")}
          options={interoperabilityRatingOptions}
          warningInsteadOfError
        />

        <DetailFormElement scope={form.scope()} />
      </SkipNoticeWrapper>
      <DocumentationActions
        previousUrl={previousUrl}
        nextUrl={nextUrl ?? dokumentation_zusammenfassung.path}
        showDownloadDraftButton
        showSavingTip
      />
      <IEAContactBanner />
    </div>
  );
}

export default function Route() {
  return <DocumentationInteroperabilityAssessmentLegal />;
}

// Astro page export
import { DocumentationPageShell } from "@/components/DocumentationPageShell";

export function BewertungRechtlichPage({
  prinzips,
  currentUrl,
}: Readonly<{
  prinzips: PrinzipWithAspekteAndExample[];
  currentUrl: string;
}>) {
  return (
    <DocumentationPageShell prinzips={prinzips} currentUrl={currentUrl}>
      <DocumentationInteroperabilityAssessmentLegal />
    </DocumentationPageShell>
  );
}
