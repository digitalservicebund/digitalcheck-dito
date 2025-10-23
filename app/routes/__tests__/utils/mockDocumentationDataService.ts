import { vi } from "vitest";
import { initialDocumentationData } from "~/routes/dokumentation/documentationDataService";

vi.mock(
  "~/routes/dokumentation/documentationDataHook",
  async (importOriginal) => {
    const actual =
      await importOriginal<
        typeof import("~/routes/dokumentation/documentationDataHook")
      >();
    return {
      ...actual,
      useDocumentationData: vi.fn(() => ({
        documentationData: initialDocumentationData,
        findDocumentationDataForUrl: vi.fn(),
      })),
    };
  },
);
