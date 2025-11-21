import "../__tests__/utils/mockRouter";

import { render } from "@testing-library/react";
import { MemoryRouter, useLoaderData } from "react-router";
import { beforeEach, describe, it, vi } from "vitest";
import {
  createOrUpdatePreCheckData,
  getPreCheckData,
  initialPreCheckData,
} from "./preCheckDataService";
import Vorpruefung from "./route";

vi.mock("~/routes/vorpruefung/preCheckDataService", async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import("~/routes/vorpruefung/preCheckDataService")
    >();

  return {
    ...actual,
    createOrUpdatePreCheckData: vi.fn(),
  };
});

const oldAnswers = [
  {
    questionId: "question1",
    answer: "no",
  },
  {
    questionId: "question2",
    answer: "yes",
  },
];

describe("Vorpruefung Route", () => {
  beforeEach(() => {
    vi.mocked(useLoaderData).mockReturnValue({
      answers: {
        question1: "no",
        question2: "yes",
      },
    });

    getPreCheckData();

    render(
      <MemoryRouter>
        <Vorpruefung />
      </MemoryRouter>,
    );
  });

  it("loads answers from the cookie and saves it to the local storage", () => {
    expect(createOrUpdatePreCheckData).toHaveBeenCalledWith({
      ...initialPreCheckData,
      answers: oldAnswers,
    });
  });
});
