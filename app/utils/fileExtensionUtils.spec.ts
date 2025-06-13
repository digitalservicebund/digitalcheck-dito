import { describe, expect, it } from "vitest";
import {
  getDownloadableExtensionName,
  getFileExtension,
} from "./fileExtensionUtils";

describe("fileExtensionUtils", () => {
  describe("getFileExtension", () => {
    it("returns the correct file extension", () => {
      expect(getFileExtension("https://example.com/path/to/file.txt")).toBe(
        "txt",
      );

      expect(
        getFileExtension("https://example.com/path/to/archive.tar.gz"),
      ).toBe("gz");

      expect(getFileExtension("https://example.com/path/to/file")).toBe(null);

      expect(getFileExtension("https://example.com/path.with.dots/")).toBe(
        null,
      );
    });
  });

  describe("getDownloadableExtensionName", () => {
    it("returns the correct extension", () => {
      expect(
        getDownloadableExtensionName("https://example.com/path/to/file.txt"),
      ).toBe(undefined);

      expect(
        getDownloadableExtensionName("https://example.com/path/to/file.pdf"),
      ).toBe("PDF");

      expect(
        getDownloadableExtensionName("https://example.com/path/to/file.docx"),
      ).toBe("DOCX");

      expect(
        getDownloadableExtensionName("https://example.com/path/to/file.xlsx"),
      ).toBe("XLSX");

      expect(
        getDownloadableExtensionName("https://example.com/path/to/file.pptx"),
      ).toBe("PPTX");

      expect(
        getDownloadableExtensionName("https://example.com/path/to/file/pptx"),
      ).toBe(undefined);
    });
  });
});
