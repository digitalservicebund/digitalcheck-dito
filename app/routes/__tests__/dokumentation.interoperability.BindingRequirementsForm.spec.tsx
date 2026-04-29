import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import BindingRequirementsForm from "~/routes/dokumentation/interoperability/BindingRequirementsForm";

describe("BindingRequirementsForm", () => {
  it("adds empty requirement fields", async () => {
    const user = userEvent.setup();
    render(<BindingRequirementsForm />);

    const addButton = screen.getByRole("button", {
      name: "Weitere Anforderung hinzufuegen",
    });

    expect(
      screen.queryByLabelText("Verbindliche Anforderung 1"),
    ).not.toBeInTheDocument();

    await user.click(addButton);
    expect(screen.getByLabelText("Verbindliche Anforderung 1")).toBeVisible();

    await user.click(addButton);
    expect(screen.getByLabelText("Verbindliche Anforderung 2")).toBeVisible();
  });
});
