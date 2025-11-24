import { renderHook } from "@testing-library/react";
import { it, vi } from "vitest";
import { readVersionedDataFromLocalStorage } from "~/utils/localStorageVersioned";
import { ResultType } from "../vorpruefung.ergebnis/PreCheckResult";
import { usePreCheckData } from "./preCheckDataHook";
import {
  DATA_SCHEMA_VERSION,
  deletePreCheckData,
  PreCheckData,
} from "./preCheckDataService";

vi.mock("~/utils/localStorageVersioned", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("~/utils/localStorageVersioned")>();

  return {
    ...actual,
    readVersionedDataFromLocalStorage: vi.fn(),
    writeVersionedDataToLocalStorage: vi.fn(),
    removeFromLocalStorage: vi.fn(),
  };
});

const mockData: PreCheckData = {
  version: DATA_SCHEMA_VERSION,
  answers: [
    { answer: "Ja", questionId: "question1" },
    { answer: "Nein", questionId: "question2" },
  ],
  title: "Title",
  negativeReasoning: "Reasoning",
  ssr: false,
};

describe("PreCheck Data Hook", () => {
  beforeEach(() => {
    deletePreCheckData(); // to reset caching
    vi.mocked(readVersionedDataFromLocalStorage).mockReturnValue(mockData);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("preCheckData", () => {
    it("returns the correct data structure", () => {
      const { result } = renderHook(() => usePreCheckData());

      expect(result.current.hasData).toBe(true);
      expect(result.current.resultData?.title).toBe(mockData.title);
      expect(result.current.answers).toHaveLength(2);
      expect(result.current.answers).toBe(mockData.answers);
      expect(result.current.firstUnansweredQuestionIndex).toBe(2);

      // Check result objects
      expect(result.current.result?.digital).toBe(ResultType.NEGATIVE);
      expect(result.current.result?.interoperability).toBe(ResultType.NEGATIVE);
      expect(result.current.result?.euBezug).toBe(ResultType.NEGATIVE);
    });
  });

  it("returns specific answer for question ID", () => {
    const { result } = renderHook(() => usePreCheckData());

    const question2 = result.current.answerForQuestionId("question2");
    expect(question2?.answer).toBe("Nein");
  });
});
