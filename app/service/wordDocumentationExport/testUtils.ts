import type { IRunOptions } from "docx";
import type { Node } from "~/utils/paragraphUtils";

export type TextRunOptions = {
  text: string;
  break?: number;
  options?: IRunOptions;
};
type TextRunLike = {
  type: "TextRun";
} & TextRunOptions;
export type ParagraphOptions = {
  text?: string;
  heading?: unknown;
  indent?: { left?: number };
  style?: string;
  children: unknown[];
};
type ParagraphLike = {
  type: "Paragraph";
} & ParagraphOptions;
export type BookmarkOptions = {
  id: string;
  children: unknown[];
};
type ExternalHyperlinkLike = {
  type: "ExternalHyperlink";
} & ExternalHyperlinkOptions;
export type ExternalHyperlinkOptions = {
  children: TextRunLike[];
  link: string;
};
// Helper function to access the paragraph mock objects without TS errors
export const asTextRunLike = (textRun: unknown): TextRunLike =>
  textRun as TextRunLike;
export const asParagraphLike = (paragraph: unknown): ParagraphLike =>
  paragraph as ParagraphLike;
export const asExternalHyperlinkLike = (
  hyperlink: unknown,
): ExternalHyperlinkLike => hyperlink as ExternalHyperlinkLike;
export const getTextFromTextRun = (textRun: unknown): string =>
  asTextRunLike(textRun).text;
export const getTextFromHyperlink = (hyperlink: unknown): string => {
  return getTextFromTextRun(
    asExternalHyperlinkLike(asParagraphLike(hyperlink).children[0]),
  );
};

export const makeNode = (text: string): Node => ({
  type: "paragraph",
  children: [{ type: "text", text }],
});
