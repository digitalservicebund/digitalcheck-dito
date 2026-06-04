import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RouteTabs from "~/components/Tabs/RouteTabs";

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = MockResizeObserver;

const mockNavigate = vi.fn();
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("~/utils/routerCompat")>();
  return { ...actual, useNavigate: () => mockNavigate };
});

const tabs = [
  { key: "eins", label: "Tab 1", to: "/eins" },
  { key: "zwei", label: "Tab 2", to: "/zwei" },
];

describe("RouteTabs component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

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

    const tab2Link = screen.getByRole("link", { name: "Tab 2" });
    await user.click(tab2Link);

    expect(tab2Link).toHaveAttribute("href", "/zwei");
  });

  it("navigates from the mobile listbox", async () => {
    const user = userEvent.setup();
    render(<RouteTabs activeKey="eins" tabs={tabs} />);

    await user.click(screen.getByRole("button", { name: "Tab 1" }));
    await user.click(screen.getByRole("option", { name: "Tab 2" }));

    expect(mockNavigate).toHaveBeenCalledWith("/zwei");
  });
});
