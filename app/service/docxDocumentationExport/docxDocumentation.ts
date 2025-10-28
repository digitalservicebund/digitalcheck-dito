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

// Renders strings with newlines as TextRuns with breaks
const stringToTextRuns = (answer: string) =>
  answer
    .split("\n")
    .map((line, idx) => new TextRun({ text: line, break: Number(idx > 0) }));

const indentOptions = {
  indent: {
    left: convertInchesToTwip(0.5),
  },
};

const stringToIndentParagraph = (
  content: string | undefined,
  options: Partial<IParagraphOptions>,
) =>
  new Paragraph({
    text: content ?? "",
    ...options,
    ...indentOptions,
  });

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

export const buildAspectParagraphs = (
  aspect: PrinzipAspekt,
  reasoning?: PrincipleReasoning,
) => [
  stringToIndentParagraph(aspect.Titel, { heading: HeadingLevel.HEADING_2 }),
  ...strapiBlocksToDocx(aspect.Text, indentOptions),
  stringToIndentParagraph(documentationDocument.aspect.paragraphsLabel, {
    style: "Textbox Label",
  }),
  stringToIndentParagraph(`§${reasoning?.paragraphs ?? ""}`, {
    style: "Textbox",
  }),
  stringToIndentParagraph(documentationDocument.aspect.explanationLabel, {
    style: "Textbox Label",
  }),
  stringToIndentParagraph(reasoning?.reason ?? "", { style: "Textbox" }),
];

const principleAnswerOptions =
  digitalDocumentation.principlePages.radioOptions.join(" | ");

const buildPrinciplePatches = (
  principles: PrinzipWithAspekte[],
  answers: DocumentationData["principles"],
): Record<string, IPatch> =>
  principles.reduce((acc, principle, index) => {
    const answer = answers?.find(
      (answer) => answer.id === principle.documentId,
    );
    const positivePrincipleAnswer = answer?.answer.includes("Ja");
    const negativePrincipleAnswer =
      answer?.answer.includes("Nein") || answer?.answer.includes("Nicht");
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
        negativePrincipleAnswer ? (answer?.reasoning as string) : "",
      ),
      [`PRINCIPLE_${index + 1}_ASPECTS`]: {
        type: PatchType.DOCUMENT,
        children: principle.Aspekte.flatMap((aspect, idx) =>
          buildAspectParagraphs(
            aspect,
            positivePrincipleAnswer
              ? (answer?.reasoning?.[idx] as PrincipleReasoning)
              : {},
          ),
        ),
      },
    };
  }, {});

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
