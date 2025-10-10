import { vi } from "vitest";

export const mockDocumentationDataService = () => {
  vi.mock(
    "~/routes/dokumentation/documentationDataService",
    async (importOriginal) => {
      const actual =
        await importOriginal<
          typeof import("~/routes/dokumentation/documentationDataService")
        >();
      return {
        ...actual,
        getDocumentationStep: vi.fn(),
        createOrUpdateDocumentationStep: vi.fn(),
      };
    },
  );
};
