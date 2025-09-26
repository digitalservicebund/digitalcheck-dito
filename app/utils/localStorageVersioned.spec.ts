import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  readVersionedDataFromLocalStorage,
  removeFromLocalStorage,
  writeVersionedDataToLocalStorage,
  type VersionedData,
} from "./localStorageVersioned";

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

interface TestData extends VersionedData {
  version: string;
  testField: string;
}

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("localStorage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("readFromLocalStorage", () => {
    it("should return parsed data when version matches", () => {
      const testData: TestData = {
        version: "1.0.0",
        testField: "test value",
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(testData));

      const result = readVersionedDataFromLocalStorage<TestData>(
        "testKey",
        "1.0.0",
      );

      expect(result).toEqual(testData);
      expect(localStorageMock.getItem).toHaveBeenCalledWith("testKey");
    });

    it("should return null when no data exists", () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = readVersionedDataFromLocalStorage<TestData>(
        "testKey",
        "1.0.0",
      );

      expect(result).toBeNull();
      expect(localStorageMock.getItem).toHaveBeenCalledWith("testKey");
    });

    it("should return null when data is empty string", () => {
      localStorageMock.getItem.mockReturnValue("");

      const result = readVersionedDataFromLocalStorage<TestData>(
        "testKey",
        "1.0.0",
      );

      expect(result).toBeNull();
      expect(localStorageMock.getItem).toHaveBeenCalledWith("testKey");
    });

    it("should throw error when version mismatches", () => {
      const testData: TestData = {
        version: "1.0.0",
        testField: "test value",
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(testData));

      expect(() =>
        readVersionedDataFromLocalStorage<TestData>("testKey", "2.0.0"),
      ).toThrow(
        "Data version mismatch for testKey. Expected 2.0.0, found 1.0.0",
      );
    });

    it("should throw error when JSON parsing fails", () => {
      localStorageMock.getItem.mockReturnValue("invalid json");

      expect(() =>
        readVersionedDataFromLocalStorage<TestData>("testKey", "1.0.0"),
      ).toThrow();
    });
  });

  describe("writeToLocalStorage", () => {
    it("should store data as JSON string", () => {
      const testData: TestData = {
        version: "1.0.0",
        testField: "test value",
      };

      writeVersionedDataToLocalStorage(testData, "testKey");

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "testKey",
        JSON.stringify(testData),
      );
    });

    it("should handle complex nested data", () => {
      const complexData = {
        version: "1.0.0",
        nested: {
          array: [1, 2, 3],
          object: { key: "value" },
        },
        boolean: true,
        number: 42,
      };

      writeVersionedDataToLocalStorage(complexData, "complexKey");

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "complexKey",
        JSON.stringify(complexData),
      );
    });
  });

  describe("removeFromLocalStorage", () => {
    it("should remove item from localStorage", () => {
      removeFromLocalStorage("testKey");

      expect(localStorageMock.removeItem).toHaveBeenCalledWith("testKey");
    });

    it("should handle removal of non-existent key", () => {
      removeFromLocalStorage("nonExistentKey");

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        "nonExistentKey",
      );
    });
  });

  describe("SSR compatibility", () => {
    beforeEach(() => {
      // Simulate server-side environment
      Object.defineProperty(global, "window", {
        value: undefined,
        writable: true,
      });
    });

    afterEach(() => {
      // Restore window object
      Object.defineProperty(global, "window", {
        value: { localStorage: localStorageMock },
        writable: true,
      });
    });

    it("should throw error when calling readFromLocalStorage on server-side", () => {
      expect(() =>
        readVersionedDataFromLocalStorage<TestData>("testKey", "1.0.0"),
      ).toThrow(
        "localStorage is not available. This function should only be called on the client-side.",
      );
      expect(localStorageMock.getItem).not.toHaveBeenCalled();
    });

    it("should throw error when calling writeToLocalStorage on server-side", () => {
      const testData: TestData = {
        version: "1.0.0",
        testField: "test value",
      };

      expect(() =>
        writeVersionedDataToLocalStorage(testData, "testKey"),
      ).toThrow(
        "localStorage is not available. This function should only be called on the client-side.",
      );
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    it("should throw error when calling removeFromLocalStorage on server-side", () => {
      expect(() => removeFromLocalStorage("testKey")).toThrow(
        "localStorage is not available. This function should only be called on the client-side.",
      );
      expect(localStorageMock.removeItem).not.toHaveBeenCalled();
    });
  });
});
