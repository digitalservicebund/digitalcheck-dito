import { vi } from "vitest";
import {
  ExternalHyperlinkOptions,
  ParagraphOptions,
  TextRunOptions,
} from "./testUtils.ts";

// Mock docx with lightweight test doubles exposing constructor options
vi.mock("docx", async (importOriginal) => {
  const module = await importOriginal<typeof import("docx")>();

  class TextRunMock {
    type = "TextRun";
    text: string;
    break: number;
    constructor(options: TextRunOptions | string) {
      if (typeof options === "string") {
        this.text = options;
        this.break = 0;
      } else {
        this.text = options.text;
        this.break = options.break ?? 0;
      }
    }
  }

  const defaultParagraphOptions: ParagraphOptions = { children: [] };

  class ParagraphMock {
    type = "Paragraph";
    constructor(options: ParagraphOptions = defaultParagraphOptions) {
      Object.assign(this, options);
    }
  }

  class ExternalHyperlinkMock {
    type = "ExternalHyperlink";
    constructor(options: ExternalHyperlinkOptions) {
      Object.assign(this, options);
    }
  }

  return {
    ...module,
    TextRun: vi.fn(TextRunMock),
    Paragraph: vi.fn(ParagraphMock),
    ExternalHyperlink: vi.fn(ExternalHyperlinkMock),
  };
});
