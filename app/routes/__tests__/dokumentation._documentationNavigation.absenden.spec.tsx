// Import mocks first
import "./utils/mockLocalStorageVersioned";
import "./utils/mockRouter";

// mock pruefstelleMails since the real data is not stable yet and would break tests
const mockPruefstelleMails = vi.hoisted(
  () =>
    new Map<string, string>([
      ["Bund", "poststelle@nkr.bund.de"],
      ["Brandenburg", "pruefstelle-brandenburg@example.com"],
    ]),
);

vi.mock("~/resources/content/shared/bundeslaender", async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import("~/resources/content/shared/bundeslaender")
    >();
  return { ...actual, pruefstelleMails: mockPruefstelleMails };
});
// End of mocks

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readDataFromLocalStorage } from "~/utils/localStorageVersioned";
import { DocumentationSend } from "../dokumentation._documentationNavigation.absenden";
import { DocumentationDataProvider } from "../dokumentation/DocumentationDataProvider";
import type {
  DocumentationData,
  PolicyTitle,
} from "../dokumentation/documentationDataSchema";

const renderWithPolicyTitle = (policyTitle?: PolicyTitle) => {
  vi.mocked(readDataFromLocalStorage<DocumentationData>).mockReturnValue({
    version: "2",
    policyTitle,
  });

  return render(
    <DocumentationDataProvider>
      <DocumentationSend />
    </DocumentationDataProvider>,
  );
};

const querySendHeading = () =>
  screen.queryByRole("heading", {
    name: "Fertige Dokumentation an Prüfstelle senden",
  });

describe("DocumentationSend", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows the NKR send instructions for Bund", () => {
    renderWithPolicyTitle({ title: "Titel", bundesland: "Bund" });

    expect(querySendHeading()).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: mockPruefstelleMails.get("Bund") }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/keine Prüfstelle/)).not.toBeInTheDocument();
  });

  it("shows the Prüfstelle send instructions for a Land with Prüfstelle", () => {
    renderWithPolicyTitle({ title: "Titel", bundesland: "Brandenburg" });

    expect(querySendHeading()).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: mockPruefstelleMails.get("Brandenburg"),
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/keine Prüfstelle/)).not.toBeInTheDocument();
  });

  it("shows the self-check hint and no send box for a Land without Prüfstelle", () => {
    renderWithPolicyTitle({ title: "Titel", bundesland: "Hessen" });

    expect(screen.getByText(/Da es für Hessen/)).toBeInTheDocument();
    expect(querySendHeading()).not.toBeInTheDocument();
  });

  it("falls back to a generic self-check hint when no data is stored", () => {
    renderWithPolicyTitle(undefined);

    expect(screen.getByText(/Da es für Ihr Bundesland/)).toBeInTheDocument();
    expect(querySendHeading()).not.toBeInTheDocument();
  });

  it("falls back to a generic self-check hint for drafts without a bundesland selection", () => {
    // @ts-expect-error bundesland is not set
    renderWithPolicyTitle({ title: "Titel", bundesland: "" });

    expect(screen.getByText(/Da es für Ihr Bundesland/)).toBeInTheDocument();
    expect(querySendHeading()).not.toBeInTheDocument();
  });
});
