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
import { documentationExport } from "~/resources/content/documentation-document";
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

export const answer = (text: string) =>
  new Paragraph({
    text,
    border: BLACK_BORDERS,
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
  });
};

export const aspectElement = (aspect: PrinzipAspekt) => [
  heading(aspect.Titel, 2),
  ...strapiBlocksToDocx(aspect.Text),
  formLabel(documentationExport.aspect.paragraphsLabel),
  answer("§"),
  formLabel(documentationExport.aspect.explanationLabel),
  answer("Beispielerklärung"),
];

export const principleElement = (principle: PrinzipWithAspekte) => [
  heading(principle.Name, 1, true),
  ...strapiBlocksToDocx(principle.Beschreibung),
  formLabel(documentationExport.principle.implementationQuestion),
  answer("Ja, gänzlich oder teilweise"),
  ...principle.Aspekte.flatMap(aspectElement),
];
