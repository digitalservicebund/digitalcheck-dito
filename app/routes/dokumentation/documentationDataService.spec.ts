import { beforeEach, describe, expect, it, vi } from "vitest";
import type { DocumentationData } from "./documentationDataSchema";
import {
  addOrUpdatePrinciple,
  createOrUpdateDocumentationData,
  DATA_SCHEMA_VERSION,
  deleteDocumentationData,
  getDocumentationData,
  setParticipation,
  setPolicyTitle,
  STORAGE_KEY,
} from "./documentationDataService";

vi.mock("~/utils/localStorageVersioned", async (importOriginal) => {
  const module = await importOriginal();
  return {
    // @ts-expect-error import is of type unknown
    ...module,
    readVersionedDataFromLocalStorage: vi.fn(),
    writeVersionedDataToLocalStorage: vi.fn(),
    removeFromLocalStorage: vi.fn(),
  };
});

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

import {
  readVersionedDataFromLocalStorage,
  removeFromLocalStorage,
  VersionMismatchError,
  writeVersionedDataToLocalStorage,
} from "~/utils/localStorageVersioned";

const mockReadFromLocalStorage = vi.mocked(readVersionedDataFromLocalStorage);
const mockWriteToLocalStorage = vi.mocked(writeVersionedDataToLocalStorage);
const mockRemoveFromLocalStorage = vi.mocked(removeFromLocalStorage);

describe("documentationDataService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getDocumentationData", () => {
    it("should return data from localStorage", () => {
      const testData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        policyTitle: { title: "Test Policy" },
        participation: {
          formats: "Test formats",
          results: "Test results",
        },
        principles: [],
      };
      mockReadFromLocalStorage.mockReturnValue(testData);

      const result = getDocumentationData();

      expect(result).toEqual(testData);
      expect(mockReadFromLocalStorage).toHaveBeenCalledWith(
        STORAGE_KEY,
        DATA_SCHEMA_VERSION,
      );
    });

    it("should return empty data object when no data exists", () => {
      mockReadFromLocalStorage.mockReturnValue(null);

      const result = getDocumentationData();

      expect(result).toEqual({ version: DATA_SCHEMA_VERSION });
    });

    it("should propagate version mismatch errors", () => {
      mockReadFromLocalStorage.mockImplementation(() => {
        throw new VersionMismatchError("Data version mismatch");
      });

      expect(() => getDocumentationData()).toThrow(
        new VersionMismatchError("Data version mismatch"),
      );
    });
  });

  describe("deleteDocumentationData", () => {
    it("should remove data from localStorage", () => {
      deleteDocumentationData();

      expect(mockRemoveFromLocalStorage).toHaveBeenCalledWith(STORAGE_KEY);
    });
  });

  describe("createOrUpdateDocumentationData", () => {
    it("should write data to localStorage", () => {
      const testData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        policyTitle: { title: "New Policy" },
      };

      createOrUpdateDocumentationData(testData);

      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        testData,
        STORAGE_KEY,
      );
    });

    it("should write complete data object", () => {
      const testData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        policyTitle: { title: "Policy" },
        participation: {
          formats: "formats",
          results: "results",
        },
        principles: [
          { id: "principle1", answer: "Ja", reasoning: [] },
          { id: "principle2", answer: "Nein", reasoning: "" },
        ],
      };

      createOrUpdateDocumentationData(testData);

      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        testData,
        STORAGE_KEY,
      );
    });
  });

  describe("setPolicyTitle", () => {
    it("should set policy title when no data exists", () => {
      mockReadFromLocalStorage.mockReturnValue(null);

      setPolicyTitle({ title: "New Policy" });

      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          policyTitle: { title: "New Policy" },
        },
        STORAGE_KEY,
      );
    });

    it("should update policy title in existing data", () => {
      const existingData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        policyTitle: { title: "Old Policy" },
        participation: {
          formats: "formats",
          results: "results",
        },
        principles: [],
      };
      mockReadFromLocalStorage.mockReturnValue(existingData);

      setPolicyTitle({ title: "Updated Policy" });

      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          policyTitle: { title: "Updated Policy" },
          participation: {
            formats: "formats",
            results: "results",
          },
          principles: [],
        },
        STORAGE_KEY,
      );
    });
  });

  describe("setParticipation", () => {
    it("should set participation when no data exists", () => {
      mockReadFromLocalStorage.mockReturnValue(null);

      setParticipation({
        formats: "New formats",
        results: "New results",
      });

      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          participation: {
            formats: "New formats",
            results: "New results",
          },
        },
        STORAGE_KEY,
      );
    });

    it("should update participation in existing data", () => {
      const existingData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        policyTitle: { title: "Policy" },
        participation: {
          formats: "Old formats",
          results: "Old results",
        },
        principles: [],
      };
      mockReadFromLocalStorage.mockReturnValue(existingData);

      setParticipation({
        formats: "Updated formats",
        results: "Updated results",
      });

      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          policyTitle: { title: "Policy" },
          participation: {
            formats: "Updated formats",
            results: "Updated results",
          },
          principles: [],
        },
        STORAGE_KEY,
      );
    });
  });

  describe("addOrUpdatePrinciple", () => {
    it("should add principle when no data exists", () => {
      mockReadFromLocalStorage.mockReturnValue(null);

      addOrUpdatePrinciple({
        id: "principle1",
        answer: "Ja",
        reasoning: [],
      });

      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          principles: [
            {
              id: "principle1",
              answer: "Ja",
              reasoning: [],
            },
          ],
        },
        STORAGE_KEY,
      );
    });

    it("should add principle when principles array is empty", () => {
      const existingData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        policyTitle: { title: "Policy" },
        principles: [],
      };
      mockReadFromLocalStorage.mockReturnValue(existingData);

      addOrUpdatePrinciple({
        id: "principle1",
        answer: "Nein",
        reasoning: "",
      });

      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          policyTitle: { title: "Policy" },
          principles: [
            {
              id: "principle1",
              answer: "Nein",
              reasoning: "",
            },
          ],
        },
        STORAGE_KEY,
      );
    });

    it("should add principle to existing principles", () => {
      const existingData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        principles: [
          {
            id: "principle1",
            answer: "Ja",
            reasoning: [],
          },
        ],
      };
      mockReadFromLocalStorage.mockReturnValue(existingData);

      addOrUpdatePrinciple({
        id: "principle2",
        answer: "Nein",
        reasoning: "",
      });

      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          principles: [
            {
              id: "principle1",
              answer: "Ja",
              reasoning: [],
            },
            {
              id: "principle2",
              answer: "Nein",
              reasoning: "",
            },
          ],
        },
        STORAGE_KEY,
      );
    });

    it("should update existing principle with same id", () => {
      const existingData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        principles: [
          {
            id: "principle1",
            answer: "Ja",
            reasoning: [],
          },
          {
            id: "principle2",
            answer: "Nein",
            reasoning: "",
          },
        ],
      };
      mockReadFromLocalStorage.mockReturnValue(existingData);

      addOrUpdatePrinciple({
        id: "principle1",
        answer: "Nicht relevant",
        reasoning: "",
      });

      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          principles: [
            {
              id: "principle1",
              answer: "Nicht relevant",
              reasoning: "",
            },
            {
              id: "principle2",
              answer: "Nein",
              reasoning: "",
            },
          ],
        },
        STORAGE_KEY,
      );
    });

    it("should handle principles array being undefined", () => {
      const existingData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        policyTitle: { title: "Policy" },
      };
      mockReadFromLocalStorage.mockReturnValue(existingData);

      addOrUpdatePrinciple({
        id: "principle1",
        answer: "Ja",
        reasoning: [],
      });

      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          policyTitle: { title: "Policy" },
          principles: [
            {
              id: "principle1",
              answer: "Ja",
              reasoning: [],
            },
          ],
        },
        STORAGE_KEY,
      );
    });
  });
});
