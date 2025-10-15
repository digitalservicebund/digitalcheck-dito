import { ExternalHyperlink, Paragraph, TextRun } from "docx";

/**
 * Parses a markdown line and returns an array of TextRun and ExternalHyperlink objects.
 * Supports:
 * - Bold text: **text** or __text__
 * - Links: [text](url)
 */
const parseMarkdownLine = (
  text: string,
): Array<TextRun | ExternalHyperlink> => {
  const children: Array<TextRun | ExternalHyperlink> = [];
  let currentIndex = 0;

  // Regular expressions for markdown patterns
  const boldPattern = /(\*\*)(.*?)\1/g;
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

  // Find all markdown patterns and their positions
  const patterns: Array<{
    start: number;
    end: number;
    type: string;
    content: string;
    url?: string;
  }> = [];

  let match;
  while ((match = boldPattern.exec(text)) !== null) {
    patterns.push({
      start: match.index,
      end: match.index + match[0].length,
      type: "bold",
      content: match[2],
    });
  }

  while ((match = linkPattern.exec(text)) !== null) {
    patterns.push({
      start: match.index,
      end: match.index + match[0].length,
      type: "link",
      content: match[1],
      url: match[2],
    });
  }

  // Sort patterns by start position
  patterns.sort((a, b) => a.start - b.start);

  // Process the text with the patterns
  for (const pattern of patterns) {
    // Add any text before this pattern
    if (currentIndex < pattern.start) {
      const plainText = text.substring(currentIndex, pattern.start);
      if (plainText) {
        children.push(new TextRun(plainText));
      }
    }

    // Add the formatted content
    if (pattern.type === "bold") {
      children.push(new TextRun({ text: pattern.content, bold: true }));
    } else if (pattern.type === "link" && pattern.url) {
      children.push(
        new ExternalHyperlink({
          children: [
            new TextRun({
              text: pattern.content,
              style: "Hyperlink",
            }),
          ],
          link: pattern.url,
        }),
      );
    }

    currentIndex = pattern.end;
  }

  // Add any remaining text
  if (currentIndex < text.length) {
    const remainingText = text.substring(currentIndex);
    if (remainingText) {
      children.push(new TextRun(remainingText));
    }
  }

  return children;
};

/**
 * Renders markdown text into an array of Paragraph objects.
 * Supports:
 * - Bullet lists (lines starting with "- " or "* ")
 * - Bold text (**text** or __text__)
 * - Links ([text](url))
 */
export default function markdown(markdown: string) {
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
