import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { preCheck } from "~/resources/content/vorpruefung";
import { ROUTE_PRECHECK_INFO } from "~/resources/staticRoutes";
import { readVersionedDataFromLocalStorage } from "~/utils/localStorageVersioned";
import Index from "../vorpruefung._index";
import {
  DATA_SCHEMA_VERSION,
  PreCheckData,
} from "../vorpruefung/preCheckDataService";

vi.mock("~/utils/localStorageVersioned", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("~/utils/localStorageVersioned")>();
  return {
    ...actual,
    readVersionedDataFromLocalStorage: vi.fn(),
  };
});

const { questions } = preCheck;

const renderWithRouter = (component: React.ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("Vorpruefung Index Route - Integration Tests", () => {
  describe("with no existing data", () => {
    beforeEach(() => {
      renderWithRouter(<Index />);
    });

    it("renders the Hero section with the correct title", () => {
      expect(
        screen.getByRole("heading", {
          name: "Vorprüfung: Digitalbezug einschätzen",
          level: 1,
        }),
      ).toBeInTheDocument();
    });

    it("renders the main CTA button to start vorpruefung", () => {
      const startButton = screen.getByRole("link", {
        name: "Vorprüfung starten",
      });
      expect(startButton).toHaveAttribute("href", ROUTE_PRECHECK_INFO.url);
    });

    it("renders the support banner", () => {
      expect(
        screen.getByRole("heading", {
          name: "Sie haben Gesprächsbedarf zu Ihrem Vorhaben?",
          level: 2,
        }),
      ).toBeInTheDocument();
    });
  });

  describe("with already existing data, unfinished questions", () => {
    beforeEach(() => {
      vi.mocked(readVersionedDataFromLocalStorage).mockReturnValue({
        version: DATA_SCHEMA_VERSION,
        answers: [{ questionId: questions[0].id, answer: "yes" }],
        title: "",
        negativeReasoning: "",
        ssr: false,
      } as PreCheckData);

      renderWithRouter(<Index />);
    });

    it("renders the CTA button to continue vorpruefung at question 0", () => {
      const startButton = screen.getByRole("link", {
        name: "Vorprüfung fortsetzen",
      });
      expect(startButton).toHaveAttribute("href", questions[1].url);
    });

    it("renders the CTA button to restart vorpruefung", () => {
      const startButton = screen.getByRole("button", {
        name: "Neue Vorprüfung beginnen",
      });
      expect(startButton).toBeInTheDocument();
    });
  });

  describe("with already existing data, finished questions", () => {
    beforeEach(() => {
      vi.mocked(readVersionedDataFromLocalStorage).mockReturnValue({
        version: DATA_SCHEMA_VERSION,
        answers: new Array(6).fill(0).map((_, i) => ({
          questionId: questions[i].id,
          answer: "yes",
        })),
        title: "",
        negativeReasoning: "",
        ssr: false,
      } as PreCheckData);

      renderWithRouter(<Index />);
    });

    it("renders the CTA button to continue vorpruefung", () => {
      const startButton = screen.getByRole("link", {
        name: "Vorprüfung fortsetzen",
      });
      expect(startButton).toHaveAttribute("href", ROUTE_PRECHECK_INFO.url);
    });

    it("renders the CTA button to restart vorpruefung", () => {
      const startButton = screen.getByRole("button", {
        name: "Neue Vorprüfung beginnen",
      });
      expect(startButton).toBeInTheDocument();
    });
  });
});
