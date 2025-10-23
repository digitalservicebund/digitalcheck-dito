// Import mocks first
import "./utils/mockDocumentationDataService";
import "./utils/mockForm";
import "./utils/mockRouter";
// End of mocks

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLoaderData, useOutletContext } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Route, ROUTES_DOCUMENTATION_PRE } from "~/resources/staticRoutes";
import { NavigationContext } from "../dokumentation._documentationNavigation";
import DocumentationPrinciple from "../dokumentation._documentationNavigation.$principleId";

const routes: (Route[] | Route)[] = [
  ...ROUTES_DOCUMENTATION_PRE,
  [
    {
      title: "Prinzip: Digitale Angebote",
      url: "/dokumentation/prinzip-1-digitale-angebote",
    },
  ],
];

const mockedUseOutletContext = vi.mocked(useOutletContext);
// const mockedUseDocumentationData = vi.mocked(useDocumentationData);
const mockedUseLoaderData = vi.mocked(useLoaderData);

describe("DocumentationPrinciple", () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter>
        <DocumentationPrinciple />
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    const context: NavigationContext = {
      currentUrl: "/current-url",
      nextUrl: "/next-url",
      previousUrl: "/previous-url",
      routes: routes,
      prinzips: [
        {
          Name: "Prinzip 1: Digitale Angebote",
          Kurzbezeichnung: "Prinzip 1",
          URLBezeichnung: "prinzip-1-digitale-angebote",
          documentId: "1",
          Nummer: 1,
          order: 1,
          Beschreibung: [],
          Aspekte: [],
        },
      ],
    };
    mockedUseOutletContext.mockReturnValue(context);
    mockedUseLoaderData.mockReturnValue({
      principleId: "prinzip-1-digitale-angebote",
    });

    renderWithRouter();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows the expected heading", () => {
    expect(
      screen.getByRole("heading", {
        name: "Prinzip 1: Digitale Angebote",
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("shows the correct answer options", () => {
    ["Ja, gänzlich oder Teilweise", "Nein", "Nicht relevant"].forEach(
      (labelText) => {
        const input = screen.getByLabelText(labelText);
        expect(input).toBeInTheDocument();
        expect(input.tagName).toBe("INPUT");
      },
    );
  });

  it("shows submit button", () => {
    const submitButton = screen.getByRole("button", {
      name: "Weiter",
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("shows back button", () => {
    const backButton = screen.getByRole("link", { name: "Zurück" });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/previous-url");
  });
});
