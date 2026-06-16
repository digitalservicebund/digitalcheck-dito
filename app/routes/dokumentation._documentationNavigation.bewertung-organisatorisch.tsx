import type { FormScope } from "@rvf/react";
import { useField } from "@rvf/react";
import { z } from "zod";
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
import { interoperabilityRatingOptions2 } from "~/routes/dokumentation/interoperability/values.ts";
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
        "Tragen Sie Ihre Erläuterung ein, z. B.: „Anträge müssen innerhalb von 3 Tagen an die zuständige Stelle weitergeleitet werden. Zuständig ist Behörde [X].“"
      }
      scope={scope.scope("detail")}
      rows={5}
      warningInsteadOfError
    >
      Erklärung
    </Textarea>
  );
}

export function DocumentationInteroperabilityAssessmentOrganizational() {
  const { previousUrl, nextUrl } = useDocumentationNavigation();

  const { documentationData, setInteroperabilityAssessmentData } =
    useDocumentationDataService();

  const form = useSyncedForm({
    schema: interoperabilityAssessmentLevelSchema,
    defaultValues: { detail: "", rating: "" },
    storedData: documentationData.interoperabilityAssessment?.organizational,
    setDataCallback: (data) =>
      setInteroperabilityAssessmentData({
        legal: documentationData.interoperabilityAssessment?.legal ?? {
          detail: "",
          rating: "",
        },
        organizational: data ?? { detail: "", rating: "" },
        semantic: documentationData.interoperabilityAssessment?.semantic ?? {
          detail: "",
          rating: "",
        },
        technical: documentationData.interoperabilityAssessment?.technical ?? {
          detail: "",
          rating: "",
        },
      }),
  });

  return (
    <>
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
            <b>Szenario: internationale Gewerbeummeldung</b>
            <p>
              Wenn ein Unternehmen seinen Standort von Deutschland nach Spanien
              verlegt, sollten die beteiligten Behörden beider Länder (z. B.
              über das Single Digital Gateway) so miteinander verknüpft sein,
              das die Gewerbeummeldung reibungslos abgewickelt werden kann. Auch
              Zuständigkeiten müssen dazu geklärt sein.
            </p>
          </DetailsSummary>
        </div>
        <SkipNoticeWrapper>
          <h2 id="question-label" className="ds-heading-03-reg mb-16">
            Schafft das Regelungsvorhaben die <strong>organisatorischen</strong>{" "}
            Voraussetzungen für einen Datenaustausch innerhalb der EU?
          </h2>
          <RadioGroup
            aria-labelledby="question-label"
            scope={form.scope("rating")}
            options={interoperabilityRatingOptions2}
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
    </>
  );
}

// Astro page export
import { DocumentationPageShell } from "@/components/DocumentationPageShell";

export function BewertungOrganisatorischPage({
  prinzips,
  currentUrl,
}: Readonly<{
  prinzips: PrinzipWithAspekteAndExample[];
  currentUrl: string;
}>) {
  return (
    <DocumentationPageShell prinzips={prinzips} currentUrl={currentUrl}>
      <DocumentationInteroperabilityAssessmentOrganizational />
    </DocumentationPageShell>
  );
}
