import type { IPatch, IRunOptions } from "docx";
import { ExternalHyperlink, PatchType, TextRun } from "docx";

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
export const stringToTextRuns = (content: string, options: IRunOptions = {}) =>
  content
    .split("\n")
    .map(
      (line, idx) =>
        new TextRun({ ...options, text: line, break: Number(idx > 0) }),
    );
