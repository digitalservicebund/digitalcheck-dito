import type { IPatch } from "docx";
import { convertInchesToTwip, patchDocument, PatchType } from "docx";
import fileSaver from "file-saver";
import { useCallback } from "react";
import { documentationDocument } from "~/resources/content/documentation-document";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { contact } from "~/resources/content/shared/contact";
import { useDocumentationDataService } from "~/routes/dokumentation/DocumentationDataProvider";
import type { DocumentationData } from "~/routes/dokumentation/documentationDataSchema";
import { DATA_SCHEMA_VERSION_V2 } from "~/routes/dokumentation/documentationDataSchema";
import {
  toMailtoHyperlinkPatch,
  toParagraphPatch,
} from "~/service/wordDocumentationExport/docxUtils.ts";
import type { PrinzipWithAspekte } from "~/utils/strapiData.types";
import { slugify } from "~/utils/utilFunctions";
import strapiBlocksToDocx from "./strapiBlocksToWord";

const { saveAs } = fileSaver;
const { principlePages } = digitalDocumentation;

export const FILE_NAME_DOCUMENTATION_TEMPLATE =
  "VORLAGE_Dokumentation_der_Digitaltauglichkeit_V2.docx";

export function useWordDocumentationV2() {
  const { documentationData } = useDocumentationDataService();

  const downloadDocumentation = useCallback(
    async (
      prinzips: PrinzipWithAspekte[],
      { templateOnly = false }: { templateOnly?: boolean } = {},
    ) => {
      try {
        const template = await fetch(
          `/documents/${FILE_NAME_DOCUMENTATION_TEMPLATE}`,
        );
        const templateData = await template.arrayBuffer();
        const doc = await createDoc(
          templateData,
          templateOnly
            ? { version: DATA_SCHEMA_VERSION_V2 }
            : (documentationData as DocumentationData),
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

export const createDoc = async (
  templateData: ArrayBuffer | Uint8Array,
  {
    policyTitle,
    participation,
    principles: principleAnswers,
  }: DocumentationData,
  prinzips: PrinzipWithAspekte[],
) => {
  const date = new Date().toLocaleDateString("de-DE");

  return patchDocument({
    data: templateData,
    outputType: "blob",
    patches: {
      TIMESTAMP: toParagraphPatch(date),
      NKR_CONTACT_EMAIL: toMailtoHyperlinkPatch(contact.nkrEmail),
      INTEROPS_EMAIL: toMailtoHyperlinkPatch(contact.interoperabilityEmail),
      DS_EMAIL: toMailtoHyperlinkPatch(contact.email),
      DS_PHONE: toParagraphPatch(contact.phoneDisplay),
      POLICY_TITLE: toParagraphPatch(answerOrPlaceholder(policyTitle?.title)),
      PARTICIPATION_FORMATS: toParagraphPatch(
        answerOrPlaceholder(participation?.formats),
      ),
      PARTICIPATION_RESULTS: toParagraphPatch(
        answerOrPlaceholder(participation?.results),
      ),
      ...buildPrinciplePatches(prinzips, principleAnswers),
    },
  });
};

const answerOrPlaceholder = (answer?: string) =>
  answer || documentationDocument.placeholder;

const answerOrPlaceholderOptional = (answer?: string) =>
  answer || documentationDocument.placeholderOptional;

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
