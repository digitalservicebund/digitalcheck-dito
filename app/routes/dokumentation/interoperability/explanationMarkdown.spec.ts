import { describe, expect, it } from "vitest";
import {
  extractExplanationParagraphTexts,
  interoperabilityExplanationParagraphs,
} from "~/routes/dokumentation/interoperability/explanationMarkdown.ts";

describe("extractExplanationParagraphTexts", () => {
  it("extracts every section from a markdown document", () => {
    const markdown = `
## legal
Legal content

## organizational
Organizational content

## semantic
Semantic content

## technical
Technical content
`;

    expect(extractExplanationParagraphTexts(markdown)).toEqual({
      legal: "Legal content",
      organizational: "Organizational content",
      semantic: "Semantic content",
      technical: "Technical content",
    });
  });

  it("throws when one or more sections are missing", () => {
    expect(() =>
      extractExplanationParagraphTexts(`
## legal
Only one section
`),
    ).toThrowError("Missing explanation markdown sections");
  });

  it("loads the shipped explanation markdown at build time", () => {
    expect(interoperabilityExplanationParagraphs.legal).toContain(
      "Ziel ist es",
    );
    expect(interoperabilityExplanationParagraphs.technical).toContain("Quelle");
  });
});
