import {
  ExternalHyperlink,
  IPatch,
  IRunOptions,
  Paragraph,
  PatchType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";

export function metadataTable(rows: string[][]) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [30, 70], // for display in LibreOffice
    rows: rows.map(
      (row) =>
        new TableRow({
          children: row.map(
            (cell, cellIndex) =>
              new TableCell({
                children: [new Paragraph(cell)],
                width: {
                  size: cellIndex === 0 ? "30%" : "70%", // for display in Microsoft Word
                  type: WidthType.PERCENTAGE,
                },
              }),
          ),
        }),
    ),
  });
}
export const toParagraphPatch = (content: string): IPatch => ({
  type: PatchType.PARAGRAPH,
  children: stringToTextRuns(content),
});
export const toMailtoHyperlinkPatch = (content: string): IPatch => ({
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

export function stringsToTextRuns(
  split: string[],
  options: IRunOptions = {},
): TextRun[] {
  return split.map(
    (line, idx) =>
      new TextRun({ ...options, text: line, break: Number(idx > 0) }),
  );
}

export const stringToTextRuns = (
  content: string,
  options: IRunOptions = {},
) => {
  const split = content.split("\n");
  return stringsToTextRuns(split, options);
};
