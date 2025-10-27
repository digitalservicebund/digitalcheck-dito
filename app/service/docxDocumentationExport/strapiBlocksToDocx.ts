import { ExternalHyperlink, Paragraph, TextRun } from "docx";
import type { Node } from "../../utils/paragraphUtils";

/**
 * Renders Strapi blocks content into an array of Paragraph objects for docx.
 * Supports:
 * - Paragraphs
 * - Unordered lists
 * - Links
 */
export default function strapiBlocksToDocx(
  blocks: Node[],
  keepAllNext: boolean = false,
): Paragraph[] {
  return blocks
    .flatMap((node) =>
      node.type === "list" && node.children
        ? node.children.map((listItem) => listItem)
        : node,
    )
    .map((node) => nodeToDocx(node, keepAllNext))
    .filter((paragraph) => paragraph !== null);
}

const nodeToDocx = (node: Node, keepAllNext: boolean = false) => {
  if (!node.children) return null;
  const children = processChildren(node.children);

  switch (node.type) {
    case "paragraph":
      return new Paragraph({ children, keepNext: keepAllNext });
    case "list-item":
      return new Paragraph({
        children,
        keepNext: keepAllNext,
        numbering: { reference: "bullet-points", level: 0 },
      });
    default:
      return null;
  }
};

const processChildren = (children: Node[]): (TextRun | ExternalHyperlink)[] =>
  children
    .flatMap((child) => {
      if (child.type === "text" && child.text) {
        return new TextRun(child.text);
      } else if (child.type === "link" && child.url && child.children) {
        const linkText = extractText(child.children);
        return new ExternalHyperlink({
          children: [new TextRun({ text: linkText, style: "Hyperlink" })],
          link: child.url,
        });
      } else if (child.children) {
        // Recursively process children
        return processChildren(child.children);
      }
    })
    .filter((child) => child !== undefined);

const extractText = (children: Node[]): string =>
  children.reduce((acc, child) => {
    if (child.text) return acc + child.text;
    if (child.children) return acc + extractText(child.children);
    return acc;
  }, "");
