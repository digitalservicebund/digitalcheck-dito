// Import mocks first
import "~/routes/__tests__/utils/mockLocalStorageVersioned";
// End of mocks
import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  readDataFromLocalStorage,
  removeFromLocalStorage,
  writeVersionedDataToLocalStorage,
} from "~/utils/localStorageVersioned";
import { MemoryRouter } from "~/utils/routerCompat";
import {
  DocumentationDataProvider,
  STORAGE_KEY,
  useDocumentationDataService,
} from "./DocumentationDataProvider";
import {
  DATA_SCHEMA_VERSION_V2,
  Principle,
  type DocumentationData,
  type V2,
} from "./documentationDataSchema";

vi.mock("~/contexts/FeatureFlagContext", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("~/contexts/FeatureFlagContext")>();
  return {
    ...actual,
    useFeatureFlag: vi.fn().mockReturnValue(true),
  };
});

const mockRead = vi.mocked(readDataFromLocalStorage);
const mockWrite = vi.mocked(writeVersionedDataToLocalStorage);
const mockRemove = vi.mocked(removeFromLocalStorage);

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <DocumentationDataProvider>{children}</DocumentationDataProvider>
  </MemoryRouter>
);

const emptyData: DocumentationData<V2> = { version: DATA_SCHEMA_VERSION_V2 };

describe("DocumentationDataProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRead.mockReturnValue(null);
  });

  describe("documentationData (initial load)", () => {
    it("returns data from localStorage on mount", async () => {
      const storedData: DocumentationData<V2> = {
        version: DATA_SCHEMA_VERSION_V2,
        policyTitle: { title: "Stored Title" },
      };
      mockRead.mockReturnValue(storedData);

      const { result } = renderHook(() => useDocumentationDataService(), {
        wrapper,
      });
      await act(async () => {});

      expect(result.current.documentationData).toEqual(storedData);
    });

    it("returns empty state when localStorage returns null", async () => {
      mockRead.mockReturnValue(null);

      const { result } = renderHook(() => useDocumentationDataService(), {
        wrapper,
      });
      await act(async () => {});

      expect(result.current.documentationData).toEqual(emptyData);
    });
  });

  describe("deleteDocumentationData", () => {
    it("calls removeFromLocalStorage with STORAGE_KEY", async () => {
      const { result } = renderHook(() => useDocumentationDataService(), {
        wrapper,
      });
      await act(async () => {});

      act(() => result.current.deleteDocumentationData());

      expect(mockRemove).toHaveBeenCalledWith(STORAGE_KEY);
    });
  });

  describe("createOrUpdateDocumentationData", () => {
    it("writes single field data to localStorage", async () => {
      const data: DocumentationData<V2> = {
        version: DATA_SCHEMA_VERSION_V2,
        policyTitle: { title: "My Policy" },
      };

      const { result } = renderHook(() => useDocumentationDataService(), {
        wrapper,
      });
      await act(async () => {});

      act(() => result.current.createOrUpdateDocumentationData(data));

      expect(mockWrite).toHaveBeenCalledWith(data, STORAGE_KEY);
    });

    it("writes complete data object to localStorage", async () => {
      const data: DocumentationData<V2> = {
        version: DATA_SCHEMA_VERSION_V2,
        policyTitle: { title: "My Policy" },
        participation: { formats: "Workshops", results: "Results" },
        principles: [{ id: "p1", answer: "Nein", reasoning: "", aspects: [] }],
      };

      const { result } = renderHook(() => useDocumentationDataService(), {
        wrapper,
      });
      await act(async () => {});

      act(() => result.current.createOrUpdateDocumentationData(data));

      expect(mockWrite).toHaveBeenCalledWith(data, STORAGE_KEY);
    });
  });

  describe("setPolicyTitle", () => {
    it("merges policyTitle into empty state when no prior data exists", async () => {
      mockRead.mockReturnValue(null);

      const { result } = renderHook(() => useDocumentationDataService(), {
        wrapper,
      });
      await act(async () => {});

      act(() => result.current.setPolicyTitle({ title: "New Title" }));

      expect(mockWrite).toHaveBeenCalledWith(
        { ...emptyData, policyTitle: { title: "New Title" } },
        STORAGE_KEY,
      );
    });

    it("updates policyTitle while preserving existing data", async () => {
      const existingData: DocumentationData<V2> = {
        version: DATA_SCHEMA_VERSION_V2,
        policyTitle: { title: "Old Title" },
        participation: { formats: "Online", results: "Some results" },
      };
      mockRead.mockReturnValue(existingData);

      const { result } = renderHook(() => useDocumentationDataService(), {
        wrapper,
      });
      await act(async () => {});

      act(() => result.current.setPolicyTitle({ title: "Updated Title" }));

      expect(mockWrite).toHaveBeenCalledWith(
        { ...existingData, policyTitle: { title: "Updated Title" } },
        STORAGE_KEY,
      );
    });
  });

  describe("setParticipation", () => {
    it("merges participation into empty state when no prior data exists", async () => {
      mockRead.mockReturnValue(null);

      const { result } = renderHook(() => useDocumentationDataService(), {
        wrapper,
      });
      await act(async () => {});

      const participation = { formats: "Webinar", results: "Feedback" };
      act(() => result.current.setParticipation(participation));

      expect(mockWrite).toHaveBeenCalledWith(
        { ...emptyData, participation },
        STORAGE_KEY,
      );
    });

    it("updates participation while preserving existing data", async () => {
      const existingData: DocumentationData<V2> = {
        version: DATA_SCHEMA_VERSION_V2,
        policyTitle: { title: "My Policy" },
        participation: { formats: "Old format", results: "Old results" },
      };
      mockRead.mockReturnValue(existingData);

      const { result } = renderHook(() => useDocumentationDataService(), {
        wrapper,
      });
      await act(async () => {});

      const newParticipation = { formats: "Workshop", results: "New results" };
      act(() => result.current.setParticipation(newParticipation));

      expect(mockWrite).toHaveBeenCalledWith(
        { ...existingData, participation: newParticipation },
        STORAGE_KEY,
      );
    });
  });

  describe("addOrUpdatePrinciple", () => {
    const principle1: Principle = {
      id: "p1",
      answer: "Nein",
      reasoning: "",
      aspects: undefined,
    } as const;
    const principle2: Principle = {
      id: "p2",
      answer: "Nicht relevant",
      reasoning: "",
      aspects: undefined,
    } as const;

    it("adds principle when principles is undefined (no prior data)", async () => {
      mockRead.mockReturnValue(null);

      const { result } = renderHook(() => useDocumentationDataService(), {
        wrapper,
      });
      await act(async () => {});

      act(() => result.current.addOrUpdatePrinciple(principle1));

      expect(mockWrite).toHaveBeenCalledWith(
        { ...emptyData, principles: [principle1] },
        STORAGE_KEY,
      );
    });

    it("adds principle to an empty principles array", async () => {
      const existingData: DocumentationData<V2> = {
        version: DATA_SCHEMA_VERSION_V2,
        principles: [],
      };
      mockRead.mockReturnValue(existingData);

      const { result } = renderHook(() => useDocumentationDataService(), {
        wrapper,
      });
      await act(async () => {});

      act(() => result.current.addOrUpdatePrinciple(principle1));

      expect(mockWrite).toHaveBeenCalledWith(
        { ...existingData, principles: [principle1] },
        STORAGE_KEY,
      );
    });

    it("appends principle to existing principles array", async () => {
      const existingData: DocumentationData<V2> = {
        version: DATA_SCHEMA_VERSION_V2,
        principles: [principle1],
      };
      mockRead.mockReturnValue(existingData);

      const { result } = renderHook(() => useDocumentationDataService(), {
        wrapper,
      });
      await act(async () => {});

      act(() => result.current.addOrUpdatePrinciple(principle2));

      expect(mockWrite).toHaveBeenCalledWith(
        { ...existingData, principles: [principle1, principle2] },
        STORAGE_KEY,
      );
    });

    it("updates principle with matching id in-place, preserving other principles", async () => {
      const existingData: DocumentationData<V2> = {
        version: DATA_SCHEMA_VERSION_V2,
        principles: [principle1, principle2],
      };
      mockRead.mockReturnValue(existingData);

      const { result } = renderHook(() => useDocumentationDataService(), {
        wrapper,
      });
      await act(async () => {});

      const updatedPrinciple1 = {
        id: "p1",
        answer: "Nicht relevant",
        reasoning: "Updated reasoning",
      } as const;
      act(() => result.current.addOrUpdatePrinciple(updatedPrinciple1));

      expect(mockWrite).toHaveBeenCalledWith(
        { ...existingData, principles: [updatedPrinciple1, principle2] },
        STORAGE_KEY,
      );
    });
  });
});
