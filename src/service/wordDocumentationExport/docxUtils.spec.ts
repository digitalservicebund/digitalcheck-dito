import "./mockDocx.ts"; // set up mocks first

import { linkColor } from "@/service/wordDocumentationExport/styles.ts";
import { PatchType, TextRun } from "docx";
import { describe, expect, it, vi } from "vitest";
import {
  stringToTextRuns,
  toMailtoHyperlinkPatch,
  toParagraphPatch,
} from "./docxUtils.ts";
import { asExternalHyperlinkLike, getTextFromHyperlink } from "./testUtils.ts";

describe("mailto hyperlinks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("toHyperlinkPatch creates a paragraph with an email hyperlink", () => {
    const emailAddress = "test@example.com";
    const hyperlinkPatch = toMailtoHyperlinkPatch(emailAddress);

    expect(hyperlinkPatch.type).toBe(PatchType.PARAGRAPH);
    expect(hyperlinkPatch.children).toHaveLength(1);

    const hyperlink = asExternalHyperlinkLike(hyperlinkPatch.children[0]);
    expect(hyperlink.type).toBe("ExternalHyperlink");
    expect(hyperlink.link).toBe("mailto:" + emailAddress);
    expect(getTextFromHyperlink(hyperlinkPatch.children[0])).toBe(emailAddress);
  });

  it("toMailtoHyperlinkPatch applies Hyperlink style to the text runs", () => {
    const emailAddress = "contact@domain.org";
    toMailtoHyperlinkPatch(emailAddress);

    expect(TextRun).toHaveBeenCalledWith(
      expect.objectContaining({
        text: emailAddress,
        style: "Hyperlink",
      }),
    );
  });

  it("toMailtoHyperlinkPatch handles multiline email addresses by splitting into TextRuns", () => {
    const multilineEmail = "email1@test.com\nemail2@test.com";
    toMailtoHyperlinkPatch(multilineEmail);

    expect(TextRun).toHaveBeenCalledTimes(2);
    expect(TextRun).toHaveBeenCalledWith({
      text: "email1@test.com",
      break: 0,
      style: "Hyperlink",
      color: linkColor,
    });
    expect(TextRun).toHaveBeenCalledWith({
      text: "email2@test.com",
      break: 1,
      style: "Hyperlink",
      color: linkColor,
    });
  });
});

describe("formatting", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("stringToTextRuns splits answers with newlines into TextRuns with breaks", () => {
    const runs = stringToTextRuns("line1\nline2\nline3");
    expect(runs).toHaveLength(3);
    expect(TextRun).toHaveBeenCalledTimes(3);
    expect(TextRun).toHaveBeenCalledWith({ text: "line1", break: 0 });
    expect(TextRun).toHaveBeenCalledWith({ text: "line2", break: 1 });
    expect(TextRun).toHaveBeenCalledWith({ text: "line3", break: 1 });
  });

  it("toParagraphPatch converts a multiline string into TextRuns with breaks", () => {
    const paraPatch = toParagraphPatch("a\nb");
    expect(paraPatch.type).toBe(PatchType.PARAGRAPH);
    expect(TextRun).toHaveBeenCalledTimes(2);
    expect(TextRun).toHaveBeenCalledWith({ text: "a", break: 0 });
    expect(TextRun).toHaveBeenCalledWith({ text: "b", break: 1 });
  });
});
