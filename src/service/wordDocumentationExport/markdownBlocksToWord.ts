import { linkColor } from "@/service/wordDocumentationExport/styles.ts";
import { isExternalUrl } from "@/utils/utilFunctions";
import type { IParagraphOptions } from "docx";
import {
  convertInchesToTwip,
  ExternalHyperlink,
  InternalHyperlink,
  Paragraph,
  TextRun,
} from "docx";
import { marked } from "marked";
import type { Token, Tokens } from "marked";

/**
 * Renders Markdown content into an array of Paragraph objects for docx.
 * Mirrors strapiBlocksToWord.ts's scope (paragraphs, lists, links; inline
 * formatting like bold/italic is dropped, same as the Strapi blocks version).
 */
export default function markdownBlocksToDocx(
  markdown: string,
  options?: Partial<IParagraphOptions>,
): Paragraph[] {
  return marked
    .lexer(markdown)
    .flatMap((token) => blockToDocx(token, options));
}

const blockToDocx = (
  token: Token,
  options?: Partial<IParagraphOptions>,
): Paragraph[] => {
  switch (token.type) {
    case "paragraph":
      return [
        new Paragraph({
          children: inlineToDocx((token as Tokens.Paragraph).tokens),
          ...options,
        }),
      ];
    case "list":
      return (token as Tokens.List).items.map(
        (item) =>
          // We don't use docx.js `bullet: { level: 0 }` here: that hardcodes
          // `<w:numId w:val="1"/>`, and when inserted via `patchDocument` it
          // resolves against the template's `numbering.xml` (where numId=1 is
          // a decimal list), so bullets would render as "1., 2., 3.".
          // Instead, render bullets as a literal "• " with a hanging indent.
          new Paragraph({
            children: [
              new TextRun({ text: "• " }),
              ...inlineToDocx(listItemInlineTokens(item)),
            ],
            indent: {
              left: convertInchesToTwip(0.5),
              hanging: convertInchesToTwip(0.25),
            },
            ...options,
          }),
      );
    default:
      return []; // unsupported blocks are skipped and not rendered
  }
};

const listItemInlineTokens = (item: Tokens.ListItem): Token[] =>
  item.tokens.flatMap((blockToken) =>
    (blockToken.type === "text" || blockToken.type === "paragraph") &&
    "tokens" in blockToken &&
    blockToken.tokens
      ? blockToken.tokens
      : [blockToken],
  );

const inlineToDocx = (
  tokens: Token[],
): (TextRun | ExternalHyperlink | InternalHyperlink)[] =>
  tokens.map((token) => {
    if (token.type === "link") {
      const link = token as Tokens.Link;
      const linkText = extractText(link.tokens);
      // Remove the leading "/" from internal links so they become "#anchor".
      const isExternal = isExternalUrl(link.href);
      const normalizedUrl = isExternal ? link.href : link.href.replace("/", "");

      if (!isExternal && normalizedUrl.startsWith("#")) {
        return new InternalHyperlink({
          children: [
            new TextRun({ text: linkText, style: "Hyperlink", color: linkColor }),
          ],
          anchor: normalizedUrl.slice(1),
        });
      }

      return new ExternalHyperlink({
        children: [
          new TextRun({ text: linkText, style: "Hyperlink", color: linkColor }),
        ],
        link: normalizedUrl,
      });
    }
    return new TextRun(extractText([token]));
  });

const extractText = (tokens: Token[]): string =>
  tokens.reduce((acc, token) => {
    if (token.type === "link") return acc + extractText(token.tokens ?? []);
    if ("tokens" in token && token.tokens) return acc + extractText(token.tokens);
    if ("text" in token) return acc + token.text;
    return acc;
  }, "");
