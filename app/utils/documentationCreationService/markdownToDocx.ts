import { ExternalHyperlink, Paragraph, TextRun } from "docx";

/**
 * Renders Markdown text into an array of Paragraph objects.
 * Supports:
 * - Unordered lists (lines starting with "- " or "* ")
 * - Bold text (**text**)
 * - Links ([text](url))
 */
export default function markdown(markdown: string): Paragraph[] {
  const lines = markdown.split("\n");

  return lines
    .map((line) => {
      const trimmedLine = line.trim();

      // Skip empty lines
      if (!trimmedLine) {
        return null;
      }

      // Check if it's a bullet point
      const isBullet =
        trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ");
      const content = isBullet ? trimmedLine.substring(2) : trimmedLine;

      const children = parseMarkdownLine(content);

      return new Paragraph({
        children,
        ...(isBullet && {
          numbering: {
            reference: "bullet-points",
            level: 0,
          },
        }),
      });
    })
    .filter((paragraph) => paragraph !== null);
}

type PatternRenderer = {
  regex: RegExp;
  render: (match: RegExpExecArray) => TextRun | ExternalHyperlink;
};

// Regular expressions for markdown patterns
// Limit capture groups to improve performance
const boldTextPattern = {
  // example: **text**
  regex: /(\*\*)(.{1,1000}?)\1/g,
  render: (match: RegExpExecArray) =>
    new TextRun({ text: match[2], bold: true }),
};

const linkTextPattern = {
  // example: [text](url)
  regex: /\[([^\]]{1,1000})]\(([^)]{1,1000})\)/g,
  render: (match: RegExpExecArray) =>
    new ExternalHyperlink({
      children: [new TextRun({ text: match[1], style: "Hyperlink" })],
      link: match[2],
    }),
};

const supportedPatternRenderers: PatternRenderer[] = [
  boldTextPattern,
  linkTextPattern,
];

const parseMarkdownLine = (text: string): (TextRun | ExternalHyperlink)[] => {
  const matches = supportedPatternRenderers
    .flatMap((pattern) =>
      Array.from(text.matchAll(pattern.regex), (match) => ({
        start: match.index,
        end: match.index + match[0].length,
        renderedContent: pattern.render(match),
      })),
    )
    .sort((a, b) => a.start - b.start);

  const children: Array<TextRun | ExternalHyperlink> = [];
  let currentIndex = 0;

  const addPlainText = (start: number, end: number) => {
    if (start < end) {
      const plainText = text.substring(start, end);
      if (plainText) {
        children.push(new TextRun(plainText));
      }
    }
  };

  for (const match of matches) {
    addPlainText(currentIndex, match.start); // Add any text before this pattern
    children.push(match.renderedContent);
    currentIndex = match.end;
  }
  addPlainText(currentIndex, text.length); // Add any remaining text

  return children;
};
