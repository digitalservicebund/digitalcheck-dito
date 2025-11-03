import {
  ExternalHyperlink,
  InternalHyperlink,
  IParagraphOptions,
  Paragraph,
  TextRun,
} from "docx";
import type { Node } from "~/utils/paragraphUtils";
import { isExternalUrl } from "~/utils/utilFunctions";

/**
 * Renders Strapi blocks content into an array of Paragraph objects for docx.
 * Supports:
 * - Paragraphs
 * - Unordered lists
 * - Links
 */
export default function strapiBlocksToDocx(
  blocks: Node[],
  options?: Partial<IParagraphOptions>,
): Paragraph[] {
  return blocks
    .flatMap((node) =>
      node.type === "list" && node.children
        ? node.children.map((listItem) => listItem)
        : node,
    )
    .map((node) => nodeToDocx(node, options))
    .filter((paragraph) => paragraph !== null);
}

const nodeToDocx = (node: Node, options?: Partial<IParagraphOptions>) => {
  if (!node.children) return null;
  const children = processChildren(node.children);

  switch (node.type) {
    case "paragraph":
      return new Paragraph({ children, ...options });
    case "list-item":
      return new Paragraph({
        children,
        numbering: { reference: "bullet-points", level: 0 },
        ...options,
      });
    default:
      return null; // unsupported nodes are skipped and not rendered
  }
};

const processChildren = (
  children: Node[],
): (TextRun | ExternalHyperlink | InternalHyperlink)[] =>
  children
    .flatMap((child) => {
      if (child.type === "text" && child.text) {
        return new TextRun(child.text);
      } else if (child.type === "link" && child.url && child.children) {
        const linkText = extractText(child.children);
        // Remove the leading "/" from internal links so they become "#anchor".
        const isExternal = isExternalUrl(child.url);
        const normalizedUrl = isExternal
          ? child.url
          : child.url.replace("/", "");

        if (!isExternal && normalizedUrl.startsWith("#")) {
          // Internal hyperlink targeting a bookmark in the same document
          return new InternalHyperlink({
            children: [new TextRun({ text: linkText, style: "Hyperlink" })],
            anchor: normalizedUrl.slice(1),
          });
        }

        return new ExternalHyperlink({
          children: [new TextRun({ text: linkText, style: "Hyperlink" })],
          link: normalizedUrl,
        });
      } else if (child.children) {
        // Recursively process children
        return processChildren(child.children);
      }
      return null; // unsupported nodes are skipped and not rendered
    })
    .filter((child) => child !== null);

const extractText = (children: Node[]): string =>
  children.reduce((acc, child) => {
    if (child.text) return acc + child.text;
    if (child.children) return acc + extractText(child.children);
    return acc;
  }, "");
