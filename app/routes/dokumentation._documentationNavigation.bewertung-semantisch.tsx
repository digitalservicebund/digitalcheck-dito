import { FormScope } from "@rvf/react";
import { useOutletContext } from "react-router";
import { z } from "zod";
import Badge from "~/components/Badge.tsx";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import RadioGroup from "~/components/RadioGroup.tsx";
import Textarea from "~/components/Textarea.tsx";
import {
  ROUTE_DOCUMENTATION_INTEROPERABILITY_SEMANTIC,
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
      description={`Tragen Sie Ihre Erläuterung ein, z. B.: „Datenbegriffe werden gemäß dem Vokabular X einheitlich definiert." oder „Es wird das Datenmodell Y verwendet."`}
      scope={scope}
      rows={5}
      warningInsteadOfError
    >
      Erklärung
    </Textarea>
  );
}

export default function DocumentationInteroperabilityAssessmentSemantic() {
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
        prefix={`Dokumentation: ${ROUTE_DOCUMENTATION_INTEROPERABILITY_SEMANTIC.title}`}
      />
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
          <p>
            <strong>Beispiel:</strong> Das Datenfeld für „Wohnsitz“ wird in ganz
            Europa nach demselben Standard (z. B. den{" "}
            <i>Semantic Core Vocabularies</i>) definiert. So verstehen das
            spanische System und das deutsche System dasselbe.
          </p>
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
            scope={form.scope("semantic.rating")}
            options={interoperabilityRatingOptions2}
            warningInsteadOfError
          />
          {form.value("semantic.rating") === "positive" && (
            <DetailFormElement scope={form.scope("semantic.detail")} />
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
