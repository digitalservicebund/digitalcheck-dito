import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "~/utils/localStorage";
import {
  createDocumentationData,
  createOrUpdateDocumentationStep,
  DATA_SCHEMA_VERSION,
  deleteDocumentationData,
  deleteDocumentationStep,
  getDocumentationData,
  getDocumentationStep,
  STORAGE_KEY,
  type DocumentationData,
  type DocumentationField,
  type DocumentationStep,
} from "./documentationDataService";

vi.mock("~/utils/localStorage", () => ({
  readFromLocalStorage: vi.fn(),
  writeToLocalStorage: vi.fn(),
}));

const localStorageMock = {
  removeItem: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const mockReadFromLocalStorage = vi.mocked(readFromLocalStorage);
const mockWriteToLocalStorage = vi.mocked(writeToLocalStorage);

describe("documentationDataService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createDocumentationData", () => {
    it("should create empty documentation data by default", () => {
      const result = createDocumentationData();

      expect(result).toEqual({
        version: DATA_SCHEMA_VERSION,
        steps: [],
      });
      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          steps: [],
        },
        STORAGE_KEY,
      );
    });

    it("should create documentation data with provided steps", () => {
      const testSteps: DocumentationStep[] = [
        {
          id: "step1",
          items: [{ key: "field1", value: "value1" }],
        },
      ];

      const result = createDocumentationData(testSteps);

      expect(result).toEqual({
        version: DATA_SCHEMA_VERSION,
        steps: testSteps,
      });
      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          steps: testSteps,
        },
        STORAGE_KEY,
      );
    });
  });

  describe("getDocumentationData", () => {
    it("should return data from localStorage", () => {
      const testData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        steps: [{ id: "step1", items: [] }],
      };
      mockReadFromLocalStorage.mockReturnValue(testData);

      const result = getDocumentationData();

      expect(result).toEqual(testData);
      expect(mockReadFromLocalStorage).toHaveBeenCalledWith(
        STORAGE_KEY,
        DATA_SCHEMA_VERSION,
      );
    });

    it("should return null when no data exists", () => {
      mockReadFromLocalStorage.mockReturnValue(null);

      const result = getDocumentationData();

      expect(result).toBeNull();
    });

    it("should propagate version mismatch errors", () => {
      mockReadFromLocalStorage.mockImplementation(() => {
        throw new Error("Data version mismatch");
      });

      expect(() => getDocumentationData()).toThrow("Data version mismatch");
    });
  });

  describe("deleteDocumentationData", () => {
    it("should remove data from localStorage", () => {
      deleteDocumentationData();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(STORAGE_KEY);
    });
  });

  describe("createOrUpdateDocumentationStep", () => {
    it("should create new step when no data exists", () => {
      mockReadFromLocalStorage.mockReturnValue(null);
      const testFields: DocumentationField[] = [
        { key: "field1", value: "value1" },
      ];

      createOrUpdateDocumentationStep("step1", testFields);

      expect(mockWriteToLocalStorage).toHaveBeenCalledTimes(2);
      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          steps: [
            {
              id: "step1",
              items: testFields,
            },
          ],
        },
        STORAGE_KEY,
      );
    });

    it("should add new step to existing data", () => {
      const existingData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        steps: [{ id: "existingStep", items: [] }],
      };
      mockReadFromLocalStorage.mockReturnValue(existingData);

      const testItems: DocumentationField[] = [
        { key: "field1", value: "value1" },
      ];

      createOrUpdateDocumentationStep("newStep", testItems);

      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          steps: [
            { id: "existingStep", items: [] },
            { id: "newStep", items: testItems },
          ],
        },
        STORAGE_KEY,
      );
    });

    it("should update existing step", () => {
      const existingData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        steps: [
          { id: "step1", items: [{ key: "oldField", value: "oldValue" }] },
        ],
      };
      mockReadFromLocalStorage.mockReturnValue(existingData);

      const newItems: DocumentationField[] = [
        { key: "newField", value: "newValue" },
      ];

      createOrUpdateDocumentationStep("step1", newItems);

      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          steps: [{ id: "step1", items: newItems }],
        },
        STORAGE_KEY,
      );
    });

    it("should handle empty items array", () => {
      const existingData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        steps: [],
      };
      mockReadFromLocalStorage.mockReturnValue(existingData);

      createOrUpdateDocumentationStep("step1", []);

      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          steps: [{ id: "step1", items: [] }],
        },
        STORAGE_KEY,
      );
    });
  });

  describe("getDocumentationStep", () => {
    it("should return specific step when it exists", () => {
      const testStep: DocumentationStep = {
        id: "step1",
        items: [{ key: "field1", value: "value1" }],
      };
      const testData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        steps: [testStep, { id: "step2", items: [] }],
      };
      mockReadFromLocalStorage.mockReturnValue(testData);

      const result = getDocumentationStep("step1");

      expect(result).toEqual(testStep);
    });

    it("should return null when step does not exist", () => {
      const testData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        steps: [{ id: "step2", items: [] }],
      };
      mockReadFromLocalStorage.mockReturnValue(testData);

      const result = getDocumentationStep("step1");

      expect(result).toBeNull();
    });

    it("should return null when no data exists", () => {
      mockReadFromLocalStorage.mockReturnValue(null);

      const result = getDocumentationStep("step1");

      expect(result).toBeNull();
    });
  });

  describe("deleteDocumentationStep", () => {
    it("should delete existing step and return true", () => {
      const testData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        steps: [
          { id: "step1", items: [] },
          { id: "step2", items: [] },
        ],
      };
      mockReadFromLocalStorage.mockReturnValue(testData);

      const result = deleteDocumentationStep("step1");

      expect(result).toBe(true);
      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          steps: [{ id: "step2", items: [] }],
        },
        STORAGE_KEY,
      );
    });

    it("should return false when step does not exist", () => {
      const testData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        steps: [{ id: "step2", items: [] }],
      };
      mockReadFromLocalStorage.mockReturnValue(testData);

      const result = deleteDocumentationStep("step1");

      expect(result).toBe(false);
      expect(mockWriteToLocalStorage).not.toHaveBeenCalled();
    });

    it("should return false when no data exists", () => {
      mockReadFromLocalStorage.mockReturnValue(null);

      const result = deleteDocumentationStep("step1");

      expect(result).toBe(false);
      expect(mockWriteToLocalStorage).not.toHaveBeenCalled();
    });

    it("should handle deletion of last step", () => {
      const testData: DocumentationData = {
        version: DATA_SCHEMA_VERSION,
        steps: [{ id: "step1", items: [] }],
      };
      mockReadFromLocalStorage.mockReturnValue(testData);

      const result = deleteDocumentationStep("step1");

      expect(result).toBe(true);
      expect(mockWriteToLocalStorage).toHaveBeenCalledWith(
        {
          version: DATA_SCHEMA_VERSION,
          steps: [],
        },
        STORAGE_KEY,
      );
    });
  });
});
