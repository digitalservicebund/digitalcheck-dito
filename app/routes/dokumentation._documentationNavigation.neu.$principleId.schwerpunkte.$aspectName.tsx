import { useForm } from "@rvf/react";
import { useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import Heading from "~/components/Heading";
import InfoBox from "~/components/InfoBox";
import Input from "~/components/Input";
import MetaTitle from "~/components/Meta";
import Textarea from "~/components/Textarea";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { slugify } from "~/utils/utilFunctions";
import { NavigationContextWithPrinciple } from "./dokumentation._documentationNavigation.neu.$principleId";
import DocumentationActions from "./dokumentation/DocumentationActions";
import { useDocumentationData } from "./dokumentation/documentationDataHook";
import {
  Principle,
  principlePositiveAnswerSchemaNew,
  PrincipleReasoning,
} from "./dokumentation/documentationDataSchema";
import { addOrUpdatePrinciple } from "./dokumentation/documentationDataService";

const { principlePages } = digitalDocumentation;

export default function NewDocumentationPrincipleAspects() {
  const { aspectName, principleId } = useParams();
  const navigate = useNavigate();
  const { prinzip } = useOutletContext<NavigationContextWithPrinciple>();
  const { documentationData } = useDocumentationData();
  const nextUrl = `/dokumentation/neu/${principleId}/schwerpunkte`;

  const basePrincipleData: Principle = {
    id: prinzip.documentId,
    answer: principlePages.radioOptions[0],
    reasoning: [],
  };

  const baseCurrentReasoning: PrincipleReasoning = {
    aspect: aspectName,
    checkbox: "on",
    paragraphs: "",
    reason: "",
  };

  const principleData =
    documentationData?.principles?.find(
      (principle) => principle.id === prinzip.documentId,
    ) ?? basePrincipleData;

  const currentReasoning: PrincipleReasoning = Array.isArray(
    principleData?.reasoning,
  )
    ? (principleData.reasoning.find(({ aspect }) => aspect === aspectName) ??
      baseCurrentReasoning)
    : baseCurrentReasoning;

  const otherReasonings: PrincipleReasoning[] = Array.isArray(
    principleData?.reasoning,
  )
    ? principleData.reasoning.filter(({ aspect }) => aspect !== aspectName)
    : [];

  const form = useForm({
    schema: principlePositiveAnswerSchemaNew,
    defaultValues: {
      paragraphs: "",
      reason: "",
    },
    async handleSubmit({ paragraphs, reason }) {
      addOrUpdatePrinciple({
        ...principleData,
        answer: principlePages.radioOptions[0],
        reasoning: [
          ...otherReasonings,
          { ...currentReasoning, paragraphs, reason },
        ],
      });

      await navigate(nextUrl);
    },
  });

  useEffect(() => {
    if (!currentReasoning) return;

    if (currentReasoning.reason)
      form.setValue("reason", currentReasoning.reason);
    if (currentReasoning.paragraphs)
      form.setValue("paragraphs", currentReasoning.paragraphs);
  }, [currentReasoning, form]);

  const paragraphsScope = form.scope("paragraphs");
  const reasonScope = form.scope("reason");

  const aspekt = prinzip.Aspekte.find(
    ({ Kurzbezeichnung }) => slugify(Kurzbezeichnung) === aspectName,
  );

  const label = aspekt?.Titel
    ? aspekt.Kurzbezeichnung
    : principlePages.explanationFields.ownExplanationTitle;

  const detailDescription = aspekt
    ? aspekt.Beschreibung
    : principlePages.explanationFields.ownExplanationDescription;

  return (
    <>
      <MetaTitle prefix={aspectName} />

      <InfoBox
        heading={{ tagName: "h2", text: label }}
        badge={{ text: "Erläuterung", look: "hint" }}
      >
        {detailDescription}
      </InfoBox>

      <Heading tagName="h3">
        Wie spiegelt sich der Schwerpunkt in Ihrer Regelung wieder?
      </Heading>

      <form {...form.getFormProps()} className="space-y-40">
        <Input
          scope={paragraphsScope}
          description={
            principlePages.explanationFields.paragraphInput.description
          }
          warningInsteadOfError
        >
          {principlePages.explanationFields.paragraphInput.label}
        </Input>

        <Textarea
          scope={reasonScope}
          placeholder={
            principlePages.explanationFields.reasoningInput.placeholder
          }
          rows={5}
          warningInsteadOfError
        >
          {principlePages.explanationFields.reasoningInput.label}
        </Textarea>

        <DocumentationActions
          previousUrl={nextUrl}
          submit
          showDownloadDraftButton
        />
      </form>
    </>
  );
}
