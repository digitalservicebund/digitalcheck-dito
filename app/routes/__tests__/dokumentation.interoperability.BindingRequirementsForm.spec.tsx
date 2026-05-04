import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import BindingRequirementsForm from "~/routes/dokumentation/interoperability/BindingRequirementsForm";

describe("BindingRequirementsForm", () => {
  it("adds an additional requirement", async () => {
    const user = userEvent.setup();
    render(<BindingRequirementsForm />);

    const addButton = screen.getByRole("button", {
      name: "Verbindliche Anforderung hinzufügen",
    });

    expect(screen.getByText("Anforderung 1")).toBeVisible();
    expect(screen.queryByText("Anforderung 2")).not.toBeInTheDocument();

    await user.click(addButton);
    expect(screen.getByText("Anforderung 2")).toBeVisible();
  });

  it("removes a single requirement when more than one exists", async () => {
    const user = userEvent.setup();
    render(<BindingRequirementsForm />);

    const addButton = screen.getByRole("button", {
      name: "Verbindliche Anforderung hinzufügen",
    });

    const removeFirstButton = screen.getByRole("button", {
      name: "Anforderung 1 entfernen",
    });

    expect(removeFirstButton).toBeDisabled();

    await user.click(addButton);
    expect(removeFirstButton).toBeEnabled();

    await user.click(removeFirstButton);
    expect(screen.queryByText("Anforderung 2")).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Anforderung 1 entfernen" }),
    ).toBeDisabled();

    await user.click(addButton);
    expect(screen.getByText("Anforderung 2")).toBeVisible();
  });
});
