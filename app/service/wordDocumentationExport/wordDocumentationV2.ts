import {
  convertInchesToTwip,
  ExternalHyperlink,
  IPatch,
  IRunOptions,
  Paragraph,
  patchDocument,
  PatchType,
  TextRun,
} from "docx";
import fileSaver from "file-saver";
import { useCallback } from "react";
import { documentationDocument } from "~/resources/content/documentation-document";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { contact } from "~/resources/content/shared/contact";
import { useDocumentationDataService } from "~/routes/dokumentation/DocumentationDataProvider";
import { type DocumentationData } from "~/routes/dokumentation/documentationDataSchema";
import {
  AssessmentFormValues,
  STORAGE_KEY,
} from "~/routes/dokumentation/interoperability/FormVariant2.tsx";
import {
  Question,
  sections,
} from "~/routes/dokumentation/interoperability/Sections.tsx";
import { assetPath } from "~/utils/assetPath.ts";
import { type PrinzipWithAspekte } from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import strapiBlocksToDocx from "./strapiBlocksToWord";
const { saveAs } = fileSaver;
const { principlePages } = digitalDocumentation;

export const FILE_NAME_DOCUMENTATION_TEMPLATE =
  "VORLAGE_Dokumentation_der_Digitaltauglichkeit_V2.docx";

export function useWordDocumentationV2() {
  const { documentationData } = useDocumentationDataService();

  const downloadDocumentation = useCallback(
    async (prinzips: PrinzipWithAspekte[]) => {
      try {
        const template = await fetch(
          assetPath(`/documents/${FILE_NAME_DOCUMENTATION_TEMPLATE}`),
        );
        const templateData = await template.arrayBuffer();
        const doc = await createDoc(
          templateData,
          documentationData as DocumentationData,
          prinzips,
        );
        saveAs(doc, documentationDocument.filename);
      } catch (e) {
        console.error(e);
      }
    },
    [documentationData],
  );

  return { downloadDocumentation };
}

export function getInteroperabilitylegaltext(): IPatch {
  const stringValue = localStorage.getItem(STORAGE_KEY);
  if (!stringValue) return toParagraphPatch(answerOrPlaceholder());
  const value = JSON.parse(stringValue) as AssessmentFormValues;

  const questions = sections.flatMap((section) =>
    section.groups.flatMap((group) => group.questions),
  );
  const questionMap = new Map<string, Question>();
  for (const question of questions) {
    questionMap.set(question.id, question);
  }

  const resultText = Object.entries(value).map(([questionKey, answer]) => {
    if (!answer.checked) return null;
    const question = questionMap.get(questionKey);
    if (!question) {
      console.error("Could not find question", questionKey);
      return null;
    }
    if (answer.ownStatement) return answer.ownStatement;
    if (answer.details)
      return String(question.label).replace(/\.$/, ": ") + answer.details; // TODO this might be a ReactNode
    return question.label;
  });

  const filtered = resultText.filter(Boolean);
  if (filtered.length === 1) return toParagraphPatch(filtered[0] as string);
  const list = filtered.map((item) => `- ${item}`).join("\n");
  return toParagraphPatch(list);
}

export const createDoc = async (
  templateData: ArrayBuffer | Uint8Array,
  {
    policyTitle,
    participation,
    principles: principleAnswers,
    bindingRequirements,
    euInteroperabilityOutcome,
  }: DocumentationData,
  prinzips: PrinzipWithAspekte[],
) => {
  const date = new Date().toLocaleDateString("de-DE");

  return patchDocument({
    data: templateData,
    outputType: "blob",
    patches: {
      TIMESTAMP: toParagraphPatch(date),
      NKR_CONTACT_EMAIL: toHyperlinkPatch(contact.nkrEmail),
      INTEROPS_EMAIL: toHyperlinkPatch(contact.interoperabilityEmail),
      DS_EMAIL: toHyperlinkPatch(contact.email),
      DS_PHONE: toParagraphPatch(contact.phoneDisplay),
      POLICY_TITLE: toParagraphPatch(answerOrPlaceholder(policyTitle?.title)),
      PARTICIPATION_FORMATS: toParagraphPatch(
        answerOrPlaceholder(participation?.formats),
      ),
      PARTICIPATION_RESULTS: toParagraphPatch(
        answerOrPlaceholder(participation?.results),
      ),
      ...buildPrinciplePatches(prinzips, principleAnswers),
      AFFECTED_SERVICES: toParagraphPatch(
        bindingRequirements?.tedpServices
          ?.flatMap((service) => service.value ?? "")
          .join(", ") ?? "",
      ),
      AFFECTED_AREAS: toParagraphPatch(
        Object.keys(bindingRequirements?.functions ?? {}).join(", "),
      ),
      BINDING_REQUIREMENTS: toParagraphPatch(
        answerOrPlaceholder(
          bindingRequirements?.requirements
            .map((entry) => `${entry.description} | ${entry.legalReference}`)
            .join(", "),
        ),
      ),
      AFFECTED_STAKEHOLDERS: toParagraphPatch("TODO"),
      INTEROPERABILITY_LEGAL_TEXT: getInteroperabilitylegaltext(),
      INTEROPERABILITY_LEGAL_EVALUATION: toParagraphPatch("positiv"),
    },
  });
};

export const toParagraphPatch = (content: string): IPatch => ({
  type: PatchType.PARAGRAPH,
  children: stringToTextRuns(content),
});

export const toHyperlinkPatch = (content: string): IPatch => ({
  type: PatchType.PARAGRAPH,
  children: [
    new ExternalHyperlink({
      children: stringToTextRuns(content, { style: "Hyperlink" }),
      link: "mailto:" + content,
    }),
  ],
});

export const toListPatch = (items: string[]): IPatch => ({
  type: PatchType.DOCUMENT,
  children: items.map(
    (item) =>
      new Paragraph({
        text: item,
        bullet: {
          level: 1,
        },
      }),
  ),
});

const answerOrPlaceholder = (answer?: string) =>
  answer || documentationDocument.placeholder;

const answerOrPlaceholderOptional = (answer?: string) =>
  answer || documentationDocument.placeholderOptional;

export const stringToTextRuns = (content: string, options: IRunOptions = {}) =>
  content
    .split("\n")
    .map(
      (line, idx) =>
        new TextRun({ ...options, text: line, break: Number(idx > 0) }),
    );

// Builds all patches that are needed for the principles
// - Title
// - Description
// - Answer for the principle
// - Reasoning (in case of a negative answer)
// - Aspects and own explanation (partially filled in case of a positive answer)
export const buildPrinciplePatches = (
  prinzips: PrinzipWithAspekte[],
  answers: DocumentationData["principles"],
): Record<string, IPatch> =>
  prinzips.reduce((acc, prinzip, prinzipIndex) => {
    const answer = answers?.find((answer) => answer.id === prinzip.documentId);
    const hasPositivePrincipleAnswer = answer?.answer?.includes("Ja");

    // Build the aspects content from Strapi and user answers (if positive)
    const aspectsContent = prinzip.Aspekte.flatMap((aspekt) => {
      // Find the reasoning entry where the aspect matches
      const matchingReasoning = Array.isArray(answer?.aspects)
        ? answer?.aspects?.find(
            (aspect) => aspect === slugify(aspekt.Kurzbezeichnung),
          )
        : undefined;

      return hasPositivePrincipleAnswer && matchingReasoning
        ? aspekt.Kurzbezeichnung
        : undefined;
    }).filter(Boolean);

    return {
      ...acc,
      [`PRINCIPLE_${prinzipIndex + 1}_TITLE`]: toParagraphPatch(prinzip.Name),
      [`PRINCIPLE_${prinzipIndex + 1}_DESCRIPTION`]: {
        type: PatchType.DOCUMENT,
        children: strapiBlocksToDocx(prinzip.Hilfetext!),
      },
      [`PRINCIPLE_${prinzipIndex + 1}_ANSWER`]: toParagraphPatch(
        answer?.answer ?? principlePages.radioOptions.join(" | "),
      ),
      // We always need to fill both patches to avoid the tags rendering
      [`PRINCIPLE_${prinzipIndex + 1}_REASONING`]: toParagraphPatch(
        answerOrPlaceholderOptional(answer?.reasoning),
      ),
      [`PRINCIPLE_${prinzipIndex + 1}_ASPECTS`]: toParagraphPatch(
        hasPositivePrincipleAnswer
          ? aspectsContent.join(", ")
          : documentationDocument.placeholderOptional,
      ),
      [`PRINCIPLE_${prinzipIndex + 1}_ASPECTS_AVAILABLE`]: toParagraphPatch(
        prinzip.Aspekte.map((aspekt) => aspekt.Kurzbezeichnung).join(", "),
      ),
    };
  }, {});

export const indentOptions = {
  indent: {
    left: convertInchesToTwip(0.5),
  },
};
