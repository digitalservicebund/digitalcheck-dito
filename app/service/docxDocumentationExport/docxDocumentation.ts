import {
  convertInchesToTwip,
  HeadingLevel,
  IParagraphOptions,
  IPatch,
  Paragraph,
  patchDocument,
  PatchType,
  TextRun,
} from "docx";
import fileSaver from "file-saver";
import { documentationDocument } from "~/resources/content/documentation-document";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  PrincipleReasoning,
  type DocumentationData,
} from "~/routes/dokumentation/documentationDataSchema";
import { getDocumentationData } from "~/routes/dokumentation/documentationDataService";
import { Node } from "~/utils/paragraphUtils";
import {
  PrinzipAspekt,
  type PrinzipWithAspekte,
} from "../../utils/strapiData.server";
import strapiBlocksToDocx from "./strapiBlocksToDocx";
const { saveAs } = fileSaver;
const { principlePages } = digitalDocumentation;

export default async function downloadDocumentation(
  principles: PrinzipWithAspekte[],
) {
  try {
    // Fetch the logo from the public directory
    const template = await fetch(
      "/documents/VORLAGE_Dokumentation_der_Digitaltauglichkeit_V2.docx",
    );
    const templateData = await template.arrayBuffer();
    const documentationData = getDocumentationData();

    const doc = await createDoc(templateData, principles, documentationData);
    saveAs(doc, documentationDocument.filename);
  } catch (e) {
    console.error(e);
  }
}

export const createDoc = (
  templateData: ArrayBuffer,
  principles: PrinzipWithAspekte[],
  documentationData: DocumentationData,
) => {
  const date = new Date().toLocaleDateString("de-DE");
  const {
    policyTitle,
    participation,
    principles: principleAnswers,
  } = documentationData;

  const patchedDocument = patchDocument({
    data: templateData,
    outputType: "blob",
    patches: {
      TIMESTAMP: toParagraphPatch(date),
      POLICY_TITLE: toParagraphPatch(policyTitle?.title),
      PARTICIPATION_FORMATS: toParagraphPatch(participation?.formats),
      PARTICIPATION_RESULTS: toParagraphPatch(participation?.results),
      ...buildPrinciplePatches(principles, principleAnswers),
    },
  });

  return patchedDocument;
};

const stringToTextRuns = (content: string) =>
  content
    .split("\n")
    .map((line, idx) => new TextRun({ text: line, break: Number(idx > 0) }));

const toParagraphPatch = (content?: string | Node[]): IPatch => {
  if (content && typeof content !== "string") {
    return {
      type: PatchType.DOCUMENT,
      children: strapiBlocksToDocx(content),
    };
  }
  return {
    type: PatchType.PARAGRAPH,
    children: stringToTextRuns(content ?? ""),
  };
};

// Builds all patches that are needed for the principles
// - Title
// - Description
// - Answer for the principle
// - Reasoning (in case of a negative answer)
// - Aspects and own explanation (partially filled in case of a positive answer)
const buildPrinciplePatches = (
  principles: PrinzipWithAspekte[],
  answers: DocumentationData["principles"],
): Record<string, IPatch> =>
  principles.reduce((acc, principle, index) => {
    const answer = answers?.find(
      (answer) => answer.id === principle.documentId,
    );
    const hasPositivePrincipleAnswer = answer?.answer.includes("Ja");
    const hasNegativePrincipleAnswer =
      answer?.answer.includes("Nein") || answer?.answer.includes("Nicht");
    const principleAnswerOptions = principlePages.radioOptions.join(" | ");

    const aspectsContent = principle.Aspekte.flatMap((aspect, idx) =>
      buildReasoningParagraphs(
        hasPositivePrincipleAnswer
          ? (answer?.reasoning?.[idx] as PrincipleReasoning)
          : {},
        aspect,
      ),
    );

    let ownExplanationContent: Paragraph[] = [];
    if (hasPositivePrincipleAnswer && Array.isArray(answer?.reasoning)) {
      // Can have multiple own explanations
      ownExplanationContent = answer.reasoning
        .filter((reasoning) => !reasoning.aspect)
        .flatMap((reasoning) => buildReasoningParagraphs(reasoning));
    }
    // Should always have at least one empty for the user to fill
    if (ownExplanationContent.length === 0) {
      ownExplanationContent = buildReasoningParagraphs({});
    }

    return {
      ...acc,
      [`PRINCIPLE_${index + 1}_TITLE`]: toParagraphPatch(principle.Name),
      [`PRINCIPLE_${index + 1}_DESCRIPTION`]: toParagraphPatch(
        principle.Beschreibung,
      ),
      [`PRINCIPLE_${index + 1}_ANSWER`]: toParagraphPatch(
        answer?.answer ?? principleAnswerOptions,
      ),
      // We always need to fill both patches to avoid the tags rendering
      // Depending on whether the answer is positive or negative, we either fill the reasoning or the aspects
      [`PRINCIPLE_${index + 1}_REASONING`]: toParagraphPatch(
        hasNegativePrincipleAnswer ? (answer?.reasoning as string) : "",
      ),
      [`PRINCIPLE_${index + 1}_ASPECTS`]: {
        type: PatchType.DOCUMENT,
        children: [...aspectsContent, ...ownExplanationContent],
      },
    };
  }, {});

const indentOptions = {
  indent: {
    left: convertInchesToTwip(0.5),
  },
};

// Renders strings with newlines as TextRuns with breaks
const stringToIndentParagraph = (options: IParagraphOptions) =>
  new Paragraph({
    ...options,
    ...indentOptions,
  });

// Builds the Paragraphs for the individual aspects, combining data from Strapi with the user data
export const buildReasoningParagraphs = (
  reasoning?: PrincipleReasoning,
  aspect?: PrinzipAspekt,
) => [
  stringToIndentParagraph({
    text: aspect?.Titel ?? principlePages.explanationFields.ownExplanationTitle,
    heading: HeadingLevel.HEADING_2,
  }),
  ...(aspect ? strapiBlocksToDocx(aspect.Text, indentOptions) : []),
  stringToIndentParagraph({
    text: documentationDocument.aspect.paragraphsLabel,
    style: "Textbox Label",
  }),
  stringToIndentParagraph({
    text: `§${reasoning?.paragraphs ?? ""}`,
    style: "Textbox",
  }),
  stringToIndentParagraph({
    text: documentationDocument.aspect.explanationLabel,
    style: "Textbox Label",
  }),
  stringToIndentParagraph({
    children: stringToTextRuns(reasoning?.reason ?? ""),
    style: "Textbox",
  }),
];
