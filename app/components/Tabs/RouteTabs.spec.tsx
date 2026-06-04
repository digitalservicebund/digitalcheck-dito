import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import RouteTabs from "~/components/Tabs/RouteTabs";

const navigateMock = vi.fn(async (_to: string) => {});

vi.mock("react-router", () => ({
  useNavigate: () => navigateMock,
}));

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

describe("RouteTabs component", () => {
  it("renders desktop navigation links", () => {
    render(<RouteTabs activeKey="eins" tabs={tabs} />);

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
    render(<RouteTabs activeKey="eins" tabs={tabs} />);

    await user.click(screen.getByRole("link", { name: "Tab 2" }));

    expect(screen.getByRole("link", { name: "Tab 2" })).toHaveAttribute(
      "href",
      "/zwei",
    );
  });

  it("navigates from the mobile listbox", async () => {
    const user = userEvent.setup();
    render(<RouteTabs activeKey="eins" tabs={tabs} />);

    await user.click(screen.getByRole("button", { name: "Tab 1" }));
    await user.click(screen.getByRole("option", { name: "Tab 2" }));

    expect(navigateMock).toHaveBeenCalledWith("/zwei");
  });
});
