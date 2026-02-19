import {
  Bookmark,
  convertInchesToTwip,
  ExternalHyperlink,
  HeadingLevel,
  IParagraphOptions,
  IPatch,
  IRunOptions,
  Paragraph,
  patchDocument,
  PatchType,
  TextRun,
} from "docx";
import fileSaver from "file-saver";
import type { FederalState } from "~/contexts/FederalStateContext";
import { documentationDocument } from "~/resources/content/documentation-document";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import { contact } from "~/resources/content/shared/contact";
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
const { principlePages, brandenburg } = digitalDocumentation;

export const FILE_NAME_DOCUMENTATION_TEMPLATE =
  "VORLAGE_Dokumentation_der_Digitaltauglichkeit_V2.docx";

export const FILE_NAME_DOCUMENTATION_TEMPLATE_BRANDENBURG =
  "VORLAGE_Dokumentation_der_Digitaltauglichkeit_Brandenburg.docx";

export function getTemplateFileName(federalState: FederalState): string {
  if (federalState === "brandenburg") {
    return FILE_NAME_DOCUMENTATION_TEMPLATE_BRANDENBURG;
  }
  return FILE_NAME_DOCUMENTATION_TEMPLATE;
}

export default async function downloadDocumentation(
  prinzips: PrinzipWithAspekte[],
  federalState: FederalState = "bund",
) {
  try {
    const templateFileName = getTemplateFileName(federalState);
    const template = await fetch(`/documents/${templateFileName}`);
    const templateData = await template.arrayBuffer();
    const doc = await createDoc(
      templateData,
      getDocumentationData(),
      prinzips,
      federalState,
    );
    saveAs(doc, documentationDocument.filename);
  } catch (e) {
    console.error(e);
  }
}

export const createDoc = async (
  templateData: ArrayBuffer | Uint8Array,
  {
    policyTitle,
    participation,
    principles: principleAnswers,
    erforderlichkeit,
    zweckmaessigkeit,
    auswirkungen,
  }: DocumentationData,
  prinzips: PrinzipWithAspekte[],
  federalState: FederalState = "bund",
) => {
  const date = new Date().toLocaleDateString("de-DE");

  // Get federal state specific content
  const isBrandenburg = federalState === "brandenburg";
  const nextStepsContent = isBrandenburg
    ? documentationDocument.brandenburg.nextSteps
    : documentationDocument.nextSteps;

  // Build Brandenburg-specific patches
  const brandenburgPatches = isBrandenburg
    ? buildBrandenburgPatches({ erforderlichkeit, zweckmaessigkeit, auswirkungen })
    : {};

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
      // Federal state specific patches
      NEXT_STEPS_INSTRUCTIONS: toParagraphPatch(nextStepsContent.instructions),
      NEXT_STEPS_HEADING: toParagraphPatch(nextStepsContent.heading),
      OVERSIGHT_BODY_INFO_HEADING: toParagraphPatch(
        isBrandenburg
          ? nextStepsContent.zbrInfo.heading
          : documentationDocument.nextSteps.nkrInfo.heading,
      ),
      OVERSIGHT_BODY_INFO_CONTENT: toParagraphPatch(
        isBrandenburg
          ? nextStepsContent.zbrInfo.content
          : documentationDocument.nextSteps.nkrInfo.content,
      ),
      SUPPORT_HEADING: toParagraphPatch(nextStepsContent.support.heading),
      SUPPORT_CONTENT: toParagraphPatch(nextStepsContent.support.content),
      ...brandenburgPatches,
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
    const hasNegativePrincipleAnswer =
      answer?.answer?.includes("Nein") || answer?.answer?.includes("Nicht");

    // Build the aspects content from Strapi and user answers (if positive)
    const aspectsContent = prinzip.Aspekte.flatMap((aspekt) => {
      // Find the reasoning entry where the aspect matches
      const matchingReasoning = Array.isArray(answer?.reasoning)
        ? answer?.reasoning?.find(
            (reasoning) => reasoning.aspect === slugify(aspekt.Kurzbezeichnung),
          )
        : undefined;

      return buildAspectParagraphs(
        hasPositivePrincipleAnswer ? matchingReasoning : {},
        aspekt,
      );
    });

    // Add the own explanation content
    let ownExplanationContent: Paragraph[] = [];
    if (hasPositivePrincipleAnswer && Array.isArray(answer?.reasoning)) {
      // Can have multiple own explanations
      ownExplanationContent = answer.reasoning
        .filter((reasoning) => !reasoning.aspect)
        .flatMap((reasoning) => buildAspectParagraphs(reasoning));
      // This field would not need to be filled in case of a positive answer
    }
    // Should always have at least one empty for the user to fill
    if (ownExplanationContent.length === 0) {
      ownExplanationContent = buildAspectParagraphs({});
    }

    return {
      ...acc,
      [`PRINCIPLE_${prinzipIndex + 1}_TITLE`]: {
        type: PatchType.DOCUMENT,
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new Bookmark({
                id: slugify(prinzip.Name),
                children: [new TextRun(prinzip.Name)],
              }),
            ],
          }),
        ],
      },
      [`PRINCIPLE_${prinzipIndex + 1}_DESCRIPTION`]: {
        type: PatchType.DOCUMENT,
        children: strapiBlocksToDocx(prinzip.Beschreibung),
      },
      [`PRINCIPLE_${prinzipIndex + 1}_ANSWER`]: toParagraphPatch(
        answer?.answer ?? principlePages.radioOptions.join(" | "),
      ),
      // We always need to fill both patches to avoid the tags rendering
      // Depending on whether the answer is positive or negative, we either fill the reasoning or the aspects
      [`PRINCIPLE_${prinzipIndex + 1}_REASONING`]: toParagraphPatch(
        hasNegativePrincipleAnswer
          ? answerOrPlaceholderOptional(answer?.reasoning as string)
          : documentationDocument.placeholderOptional,
      ),
      [`PRINCIPLE_${prinzipIndex + 1}_ASPECTS`]: {
        type: PatchType.DOCUMENT,
        children: [...aspectsContent, ...ownExplanationContent],
      },
    };
  }, {});

export const indentOptions = {
  indent: {
    left: convertInchesToTwip(0.5),
  },
};

// Builds the docx Paragraphs for the individual aspects and own reasoning, combining data from Strapi with the user data
export const buildAspectParagraphs = (
  reasoning?: PrincipleReasoning,
  aspekt?: PrinzipAspekt,
) => [
  stringToIndentParagraph({
    heading: HeadingLevel.HEADING_2,
    children: [
      aspekt?.Titel
        ? new Bookmark({
            id: slugify(aspekt.Titel),
            children: [new TextRun(aspekt.Titel)],
          })
        : new TextRun(principlePages.explanationFields.ownExplanationTitle),
    ],
  }),
  ...(aspekt && aspekt.Text
    ? strapiBlocksToDocx(aspekt.Text, indentOptions)
    : []),
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

// Builds patches for Brandenburg-specific pages (Erforderlichkeit, Zweckmäßigkeit, Auswirkungen)
export const buildBrandenburgPatches = ({
  erforderlichkeit,
  zweckmaessigkeit,
  auswirkungen,
}: Pick<
  DocumentationData,
  "erforderlichkeit" | "zweckmaessigkeit" | "auswirkungen"
>): Record<string, IPatch> => ({
  // Erforderlichkeit
  BRANDENBURG_ERFORDERLICHKEIT_TITLE: {
    type: PatchType.DOCUMENT,
    children: [
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [
          new Bookmark({
            id: "erforderlichkeit",
            children: [new TextRun(brandenburg.erforderlichkeit.headline)],
          }),
        ],
      }),
    ],
  },
  BRANDENBURG_ERFORDERLICHKEIT_QUESTIONS: toParagraphPatch(
    brandenburg.erforderlichkeit.textIntro,
  ),
  BRANDENBURG_ERFORDERLICHKEIT_ANSWER: toParagraphPatch(
    answerOrPlaceholder(erforderlichkeit?.content),
  ),
  // Zweckmäßigkeit
  BRANDENBURG_ZWECKMAESSIGKEIT_TITLE: {
    type: PatchType.DOCUMENT,
    children: [
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [
          new Bookmark({
            id: "zweckmaessigkeit",
            children: [new TextRun(brandenburg.zweckmaessigkeit.headline)],
          }),
        ],
      }),
    ],
  },
  BRANDENBURG_ZWECKMAESSIGKEIT_QUESTIONS: toParagraphPatch(
    brandenburg.zweckmaessigkeit.textIntro,
  ),
  BRANDENBURG_ZWECKMAESSIGKEIT_ANSWER: toParagraphPatch(
    answerOrPlaceholder(zweckmaessigkeit?.content),
  ),
  // Auswirkungen
  BRANDENBURG_AUSWIRKUNGEN_TITLE: {
    type: PatchType.DOCUMENT,
    children: [
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [
          new Bookmark({
            id: "auswirkungen",
            children: [new TextRun(brandenburg.auswirkungen.headline)],
          }),
        ],
      }),
    ],
  },
  BRANDENBURG_AUSWIRKUNGEN_QUESTIONS: toParagraphPatch(
    brandenburg.auswirkungen.textIntro,
  ),
  BRANDENBURG_AUSWIRKUNGEN_ANSWER: toParagraphPatch(
    answerOrPlaceholder(auswirkungen?.content),
  ),
});
