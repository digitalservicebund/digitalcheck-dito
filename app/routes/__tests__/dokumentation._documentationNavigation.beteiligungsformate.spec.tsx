import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useOutletContext } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { NavigationContext } from "~/routes/dokumentation._documentationNavigation";
import DocumentationParticipation from "~/routes/dokumentation._documentationNavigation.beteiligungsformate";
import { getDocumentationStep } from "~/routes/dokumentation/documentationDataService";

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

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useOutletContext: vi.fn(),
    useNavigate: vi.fn(() => vi.fn()),
  };
});

vi.mock("@rvf/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@rvf/react-router")>();
  return {
    ...actual,
    useForm: vi.fn(() => ({
      getFormProps: () => ({
        id: "test-form",
        onSubmit: vi.fn(),
      }),
      scope: (name: string) => ({
        name,
        value: "",
        onChange: vi.fn(),
      }),
      dirty: () => false,
      resetForm: vi.fn(),
      setDirty: vi.fn(),
    })),
    useField: vi.fn(() => ({
      getInputProps: (props: Record<string, unknown>) => ({
        ...props,
        name: "explanation",
        value: "",
        onChange: vi.fn(),
      }),
      error: () => null,
    })),
  };
});

const mockGetDocumentationStep = vi.mocked(getDocumentationStep);
const mockUseOutletContext = vi.mocked(useOutletContext);

describe("DocumentationParticipation", () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter>
        <DocumentationParticipation />
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    mockGetDocumentationStep.mockReturnValue(null);
    const context: NavigationContext = {
      currentUrl: "/dokumentation/beteiligungsformate",
      nextUrl: "/next-route",
      previousUrl: "/previous-route",
      routes: [],
    };
    mockUseOutletContext.mockReturnValue(context);

    renderWithRouter();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows the expected heading", () => {
    expect(
      screen.getByRole("heading", {
        name: "Auswirkungen auf Betroffene und an der Umsetzung Beteiligte",
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("shows first textarea with expected label and description", () => {
    const textareas = screen.getAllByLabelText("Antwort");
    expect(textareas[0]).toBeInTheDocument();
    expect(textareas[0].tagName).toBe("TEXTAREA");

    expect(
      screen.getByText(
        "Bitte listen Sie stichpunktartig auf, ob bzw. welche Schritte Sie unternommen haben.",
      ),
    ).toBeInTheDocument();
  });

  it("shows second textarea with expected label and description", () => {
    const textareas = screen.getAllByLabelText("Antwort");
    expect(textareas[1]).toBeInTheDocument();
    expect(textareas[1].tagName).toBe("TEXTAREA");

    expect(
      screen.getByText(
        "Bitte listen Sie stichpunktartig auf, welche Erkenntnisse eingearbeitet wurden und geben Sie Hinweise auf Paragrafen, die besonders umsetzungsrelevant sind.",
      ),
    ).toBeInTheDocument();
  });

  it("shows submit button", () => {
    const submitButton = screen.getByRole("button", {
      name: "Übernehmen & weiter",
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("shows back button", () => {
    const backButton = screen.getByRole("link", { name: "Zurück" });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/previous-route");
  });
});
