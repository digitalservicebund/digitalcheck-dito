import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import userEvent from "@testing-library/user-event";
import { BrowserRouter, useLoaderData } from "react-router";
import { preCheck } from "~/resources/content/vorpruefung";
import Index from "~/routes/vorpruefung._preCheckNavigation.$questionId";

const { questions } = preCheck;

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useLoaderData: vi.fn(),
    useActionData: vi.fn(),
  };
});

vi.mock("@rvf/react-router", async () => {
  const rvfReact = await import("@rvf/react");
  return rvfReact;
});

describe("PreCheck validation", () => {
  beforeEach(() => {
    vi.mocked(useLoaderData).mockReturnValue({
      questionIdx: 0,
      answers: [],
      question: questions[0],
    });

    render(
      <BrowserRouter>
        <Index />
      </BrowserRouter>,
    );
  });

  it("shows error when trying to click next without selecting an answer", async () => {
    const user = userEvent.setup();

    await user.click(
      screen.getByRole("button", { name: "Übernehmen & weiter" }),
    );

    expect(screen.getByLabelText("Ja")).toHaveAccessibleErrorMessage(
      "Fehler: Bitte wählen Sie eine Option aus.",
    );
    expect(screen.getByLabelText("Nein")).toHaveAccessibleErrorMessage(
      "Fehler: Bitte wählen Sie eine Option aus.",
    );
    expect(
      screen.getByLabelText("Ich bin unsicher"),
    ).toHaveAccessibleErrorMessage("Fehler: Bitte wählen Sie eine Option aus.");

    // error message on fieldset
    expect(
      screen.getByLabelText("Ja").parentElement?.parentElement,
    ).toHaveAccessibleErrorMessage("Fehler: Bitte wählen Sie eine Option aus.");
  });

  it("allows next when selecting an answer", async () => {
    const user = userEvent.setup();

    await user.click(
      screen.getByRole("button", { name: "Übernehmen & weiter" }),
    );

    expect(screen.getByLabelText("Ja")).toHaveAccessibleErrorMessage(
      "Fehler: Bitte wählen Sie eine Option aus.",
    );

    await user.click(screen.getByLabelText("Ja"));

    await user.click(
      screen.getByRole("button", { name: "Übernehmen & weiter" }),
    );

    expect(screen.getByLabelText("Ja")).not.toHaveAccessibleErrorMessage(
      "Fehler: Bitte wählen Sie eine Option aus.",
    );
  });
});
