import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useOutletContext } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { NavigationContext } from "~/routes/dokumentation._documentationNavigation";
import DocumentationTitle from "~/routes/dokumentation._documentationNavigation.regelungsvorhaben-titel";
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
        name: "title",
        value: "",
        onChange: vi.fn(),
      }),
      error: () => null,
    })),
  };
});

const mockGetDocumentationStep = vi.mocked(getDocumentationStep);
const mockUseOutletContext = vi.mocked(useOutletContext);

describe("DocumentationTitle", () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter>
        <DocumentationTitle />
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    mockGetDocumentationStep.mockReturnValue(null);
    const context: NavigationContext = {
      currentUrl: "/dokumentation/regelungsvorhaben-titel",
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
        name: "Tragen Sie den Titel Ihres Regelungsvorhaben ein",
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("shows an input element with the expected label", () => {
    const input = screen.getByLabelText("Titel des Regelungsvorhabens");
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
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
