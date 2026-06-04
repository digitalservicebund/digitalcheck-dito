import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router";
import { describe, expect, it } from "vitest";
import RouteTabs from "~/components/Tabs/RouteTabs";

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = MockResizeObserver;

const tabs = [
  { key: "eins", label: "Tab 1", to: "/eins" },
  { key: "zwei", label: "Tab 2", to: "/zwei" },
];

const Example = () => {
  const location = useLocation();

  return (
    <>
      <RouteTabs
        activeKey={location.pathname === "/zwei" ? "zwei" : "eins"}
        tabs={tabs}
      />
      <output data-testid="pathname">{location.pathname}</output>
    </>
  );
};

describe("RouteTabs component", () => {
  it("renders desktop navigation links", () => {
    render(
      <MemoryRouter initialEntries={["/eins"]}>
        <Example />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Tab 1" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Tab 2" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("navigates when a desktop link is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/eins"]}>
        <Example />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("link", { name: "Tab 2" }));

    expect(screen.getByTestId("pathname")).toHaveTextContent("/zwei");
  });

  it("navigates from the mobile listbox", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/eins"]}>
        <Example />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Tab 1" }));
    await user.click(screen.getByRole("option", { name: "Tab 2" }));

    expect(screen.getByTestId("pathname")).toHaveTextContent("/zwei");
  });
});
