import {
  dokumentation_zusammenfassung,
  interoperabel_loesungen_coreVocabularies,
} from "@/config/routes.ts";
import type { FormScope } from "@rvf/react";
import { useField } from "@rvf/react";
import { z } from "zod";
import Badge from "~/components/Badge.tsx";
import DetailsSummary from "~/components/DetailsSummary.tsx";
import Heading from "~/components/Heading";
import RadioGroup from "~/components/RadioGroup.tsx";
import Textarea from "~/components/Textarea.tsx";
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
        "Tragen Sie Ihre Erläuterung ein, z. B.: „Datenbegriffe werden gemäß dem Vokabular X einheitlich definiert.” oder „Es wird das Datenmodell Y verwendet.”"
      }
      scope={scope.scope("detail")}
      rows={5}
      warningInsteadOfError
    >
      Erklärung
    </Textarea>
  );
}

export function DocumentationInteroperabilityAssessmentSemantic() {
  const { previousUrl, nextUrl } = useDocumentationNavigation();

  const { documentationData, setInteroperabilityAssessmentData } =
    useDocumentationDataService();

  const form = useSyncedForm({
    schema: interoperabilityAssessmentLevelSchema,
    defaultValues: { detail: "", rating: "" },
    storedData: documentationData.interoperabilityAssessment?.semantic,
    setDataCallback: (data) =>
      setInteroperabilityAssessmentData({
        legal: documentationData.interoperabilityAssessment?.legal ?? {
          detail: "",
          rating: "",
        },
        organizational: documentationData.interoperabilityAssessment
          ?.organizational ?? { detail: "", rating: "" },
        semantic: data ?? { detail: "", rating: "" },
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
          <Badge look="hint">Semantische Interoperabilität</Badge>
          <Heading tagName="h1" look="ds-heading-02-reg" className="mb-16">
            Gemeinsame Bedeutung von Daten sicherstellen
          </Heading>
          <p>
            Semantische Klarheit sorgt dafür, dass „was gesendet wird, auch
            genau so verstanden wird“. Rechtsbegriffe müssen gleich definiert
            und Datenfelder kompatibel sein, damit IT-Systeme sie zweifelsfrei
            verarbeiten können.
          </p>
          <DetailsSummary title={"Beispiel"}>
            <p>
              Das Datenfeld für „Wohnsitz“ wird in ganz Europa nach demselben
              Standard (z. B. den{" "}
              <a
                href={interoperabel_loesungen_coreVocabularies.path}
                className="underline"
              >
                <i>Semantic Core Vocabularies</i>
              </a>
              ) definiert. So verstehen das spanische System und das deutsche
              System dasselbe.
            </p>
            <p>
              Dieser Standard wird im Gesetz / in der Verordnung referenziert
              oder im Vollzug genutzt.
            </p>
          </DetailsSummary>
        </div>
        <SkipNoticeWrapper>
          <h2 id="question-label" className="ds-heading-03-reg mb-16">
            Stellt das Regelungsvorhaben sicher, dass{" "}
            <strong>
              semantische Definitionen von Begriffen und Datenfeldern
            </strong>{" "}
            den Datenaustausch über EU-Grenzen ermöglichen?
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

export default function Route() {
  return <DocumentationInteroperabilityAssessmentSemantic />;
}

// Astro page export
import { DocumentationPageShell } from "@/components/DocumentationPageShell";

export function BewertungSemantischPage({
  prinzips,
  currentUrl,
}: Readonly<{
  prinzips: PrinzipWithAspekteAndExample[];
  currentUrl: string;
}>) {
  return (
    <DocumentationPageShell prinzips={prinzips} currentUrl={currentUrl}>
      <DocumentationInteroperabilityAssessmentSemantic />
    </DocumentationPageShell>
  );
}
