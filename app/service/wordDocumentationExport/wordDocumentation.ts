import {
  Bookmark,
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
  type DocumentationData,
  PrincipleReasoning,
} from "~/routes/dokumentation/documentationDataSchema";
import { getDocumentationData } from "~/routes/dokumentation/documentationDataService";
import {
  PrinzipAspekt,
  type PrinzipWithAspekte,
} from "~/utils/strapiData.server";
import { slugify } from "~/utils/utilFunctions";
import strapiBlocksToDocx from "./strapiBlocksToWord";

const { saveAs } = fileSaver;
const { principlePages } = digitalDocumentation;

export const FILE_NAME_DOCUMENTATION_TEMPLATE =
  "VORLAGE_Dokumentation_der_Digitaltauglichkeit_V2.docx";

export default async function downloadDocumentation(
  principles: PrinzipWithAspekte[],
) {
  try {
    const template = await fetch(
      `/documents/${FILE_NAME_DOCUMENTATION_TEMPLATE}`,
    );
    const templateData = await template.arrayBuffer();
    const doc = await createDoc(templateData, principles, false);
    saveAs(doc, documentationDocument.filename);
  } catch (e) {
    console.error(e);
  }
}

export const createDoc = async (
  templateData: ArrayBuffer | Uint8Array,
  principles: PrinzipWithAspekte[],
  templateOnly: boolean,
) => {
  const date = new Date().toLocaleDateString("de-DE");
  const {
    policyTitle,
    participation,
    principles: principleAnswers,
  } = templateOnly ? {} : getDocumentationData();

  return patchDocument({
    data: templateData,
    outputType: "blob",
    patches: {
      TIMESTAMP: toParagraphPatch(date),
      POLICY_TITLE: toParagraphPatch(answerOrPlaceholder(policyTitle?.title)),
      PARTICIPATION_FORMATS: toParagraphPatch(
        answerOrPlaceholder(participation?.formats),
      ),
      PARTICIPATION_RESULTS: toParagraphPatch(
        answerOrPlaceholder(participation?.results),
      ),
      ...buildPrinciplePatches(principles, principleAnswers),
    },
  });
};

const toParagraphPatch = (content: string): IPatch => ({
  type: PatchType.PARAGRAPH,
  children: stringToTextRuns(content),
});

const answerOrPlaceholder = (answer?: string) =>
  answer || documentationDocument.placeholder;

const answerOrPlaceholderOptional = (answer?: string) =>
  answer || documentationDocument.placeholderOptional;

const stringToTextRuns = (content: string) =>
  content
    .split("\n")
    .map((line, idx) => new TextRun({ text: line, break: Number(idx > 0) }));

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
  principles.reduce((acc, principle, principleIndex) => {
    const answer = answers?.find(
      (answer) => answer.id === principle.documentId,
    );
    const hasPositivePrincipleAnswer = answer?.answer.includes("Ja");
    const hasNegativePrincipleAnswer =
      answer?.answer.includes("Nein") || answer?.answer.includes("Nicht");

    // Build the aspects content from Strapi and user answers (if positive)
    const aspectsContent = principle.Aspekte.flatMap((aspect, aspectIndex) =>
      buildReasoningParagraphs(
        hasPositivePrincipleAnswer
          ? (answer?.reasoning?.[aspectIndex] as PrincipleReasoning)
          : {},
        aspect,
      ),
    );

    // Add the own explanation content
    let ownExplanationContent: Paragraph[] = [];
    if (hasPositivePrincipleAnswer && Array.isArray(answer?.reasoning)) {
      // Can have multiple own explanations
      ownExplanationContent = answer.reasoning
        .filter((reasoning) => !reasoning.aspect)
        .flatMap((reasoning) => buildReasoningParagraphs(reasoning));
      // This field would not need to be filled in case of a positive answer
    }
    // Should always have at least one empty for the user to fill
    if (ownExplanationContent.length === 0) {
      ownExplanationContent = buildReasoningParagraphs({});
    }

    return {
      ...acc,
      [`PRINCIPLE_${principleIndex + 1}_TITLE`]: {
        type: PatchType.DOCUMENT,
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new Bookmark({
                id: slugify(principle.Name),
                children: [new TextRun(principle.Name)],
              }),
            ],
          }),
        ],
      },
      [`PRINCIPLE_${principleIndex + 1}_DESCRIPTION`]: {
        type: PatchType.DOCUMENT,
        children: strapiBlocksToDocx(principle.Beschreibung),
      },
      [`PRINCIPLE_${principleIndex + 1}_ANSWER`]: toParagraphPatch(
        answer?.answer ?? principlePages.radioOptions.join(" | "),
      ),
      // We always need to fill both patches to avoid the tags rendering
      // Depending on whether the answer is positive or negative, we either fill the reasoning or the aspects
      [`PRINCIPLE_${principleIndex + 1}_REASONING`]: toParagraphPatch(
        hasNegativePrincipleAnswer
          ? answerOrPlaceholderOptional(answer?.reasoning as string)
          : documentationDocument.placeholder,
      ),
      [`PRINCIPLE_${principleIndex + 1}_ASPECTS`]: {
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

// Builds the docx Paragraphs for the individual aspects, combining data from Strapi with the user data
const buildReasoningParagraphs = (
  reasoning?: PrincipleReasoning,
  aspect?: PrinzipAspekt,
) => [
  stringToIndentParagraph({
    heading: HeadingLevel.HEADING_2,
    children: [
      aspect?.Titel
        ? new Bookmark({
            id: slugify(aspect.Titel),
            children: [new TextRun(aspect.Titel)],
          })
        : new TextRun(principlePages.explanationFields.ownExplanationTitle),
    ],
  }),
  ...(aspect ? strapiBlocksToDocx(aspect.Text, indentOptions) : []),
  stringToIndentParagraph({
    text: documentationDocument.aspect.paragraphsLabel,
    style: "Textbox Label",
  }),
  stringToIndentParagraph({
    text: answerOrPlaceholderOptional(reasoning?.paragraphs),
    style: "Textbox",
  }),
  stringToIndentParagraph({
    text: documentationDocument.aspect.explanationLabel,
    style: "Textbox Label",
  }),
  stringToIndentParagraph({
    children: stringToTextRuns(answerOrPlaceholderOptional(reasoning?.reason)),
    style: "Textbox",
  }),
];

// Renders strings with newlines as TextRuns with breaks
const stringToIndentParagraph = (options: IParagraphOptions) =>
  new Paragraph({
    ...options,
    ...indentOptions,
  });
