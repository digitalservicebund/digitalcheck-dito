import {
  AlignmentType,
  BorderStyle,
  Header,
  HeadingLevel,
  ImageRun,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from "docx";
import { documentationDocument } from "~/resources/content/documentation-document";
import type {
  Principle,
  PrincipleReasoning,
} from "~/routes/dokumentation/documentationDataSchema";
import { slugify } from "~/utils/utilFunctions";
import type { PrinzipAspekt, PrinzipWithAspekte } from "../strapiData.server";
import strapiBlocksToDocx from "./strapiBlocksToDocx";

const NO_BORDER = {
  style: BorderStyle.NONE,
  color: "ffffff",
};
const NO_BORDERS = {
  top: NO_BORDER,
  bottom: NO_BORDER,
  left: NO_BORDER,
  right: NO_BORDER,
};

export const header = (date: string, logoData: ArrayBuffer) => ({
  default: new Header({
    children: [
      new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: NO_BORDERS,
                verticalAlign: VerticalAlign.TOP,
                children: [
                  new Paragraph({
                    text: date,
                    spacing: {
                      line: 0,
                      before: 0,
                      after: 0,
                    },
                  }),
                ],
              }),
              new TableCell({
                borders: NO_BORDERS,
                verticalAlign: VerticalAlign.TOP,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.END,
                    spacing: {
                      line: 0,
                      before: 0,
                      after: 0,
                    },
                    children: [
                      new ImageRun({
                        type: "png",
                        data: logoData,
                        transformation: {
                          width: 62,
                          height: 28,
                        },
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  }),
});

export const formLabel = (text: string) =>
  new Paragraph({
    children: [new TextRun({ text, bold: true })],
    keepNext: true,
  });

const BLACK_BORDER = {
  size: 1,
  color: "000000",
  style: BorderStyle.SINGLE,
};
const BLACK_BORDERS = {
  top: BLACK_BORDER,
  bottom: BLACK_BORDER,
  left: BLACK_BORDER,
  right: BLACK_BORDER,
};

export const answer = (text: string, keepNext: boolean = false) =>
  new Paragraph({
    text,
    border: BLACK_BORDERS,
    keepNext,
  });

export const heading = (
  text: string,
  level: "title" | 1 | 2 | 3,
  pageBreakBefore: boolean = false,
) => {
  const headingMap = {
    title: HeadingLevel.TITLE,
    1: HeadingLevel.HEADING_1,
    2: HeadingLevel.HEADING_2,
    3: HeadingLevel.HEADING_3,
  };
  return new Paragraph({
    text,
    heading: headingMap[level],
    pageBreakBefore,
    keepNext: true,
  });
};

export const aspectElement = (
  aspect: PrinzipAspekt,
  reasoning: PrincipleReasoning | undefined,
) => [
  heading(aspect.Titel, 2),
  ...strapiBlocksToDocx(aspect.Text, true),
  formLabel(documentationDocument.aspect.paragraphsLabel),
  answer(`§${reasoning?.paragraphs ?? ""}`, true),
  formLabel(documentationDocument.aspect.explanationLabel),
  answer(reasoning?.reason ?? ""),
];

export const principleElement = (
  principle: PrinzipWithAspekte,
  principleAnswer: Principle | undefined,
) => [
  heading(principle.Name, 1, true),
  ...strapiBlocksToDocx(principle.Beschreibung),
  formLabel(documentationDocument.principle.implementationQuestion),
  answer(principleAnswer?.answer ?? ""),
  ...principle.Aspekte.flatMap((aspect) =>
    aspectElement(
      aspect,
      principleAnswer?.reasoning?.find(
        (reasoning) => reasoning?.aspect === slugify(aspect.Kurzbezeichnung),
      ),
    ),
  ),
];
