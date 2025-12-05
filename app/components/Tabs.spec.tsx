import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TabGroup, { TabGroupProps } from "~/components/Tabs/Tabs";

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = MockResizeObserver;

const Example = (props: TabGroupProps) => (
  <TabGroup {...props}>
    <TabGroup.TabList>
      <TabGroup.Tab>Tab 0</TabGroup.Tab>
      <TabGroup.Tab>Tab 1</TabGroup.Tab>
      <TabGroup.Tab>Tab 2</TabGroup.Tab>
    </TabGroup.TabList>
    <TabGroup.TabPanels>
      <TabGroup.TabPanel>Tab panel 0</TabGroup.TabPanel>
      <TabGroup.TabPanel>Tab panel 1</TabGroup.TabPanel>
      <TabGroup.TabPanel>Tab panel 2</TabGroup.TabPanel>
    </TabGroup.TabPanels>
  </TabGroup>
);

function assertSelectedState(expectedIndex: number, container: HTMLElement) {
  // 1: assert that the correct tab is selected
  const tabs = screen.getAllByRole("tab");
  expect(tabs).toHaveLength(3);

  tabs.forEach((tab, index) => {
    expect(tab).toHaveTextContent(`Tab ${index}`);
    expect(tab).toHaveAttribute(
      "aria-controls",
      expect.stringContaining("panel"),
    );
    expect(tab).toHaveAttribute(
      "aria-selected",
      index === expectedIndex ? "true" : "false",
    );
    expect(tab).toHaveAttribute(
      "tabindex",
      index === expectedIndex ? "0" : "-1",
    );
  });

  // 2: assert that the correct listbox item is presented
  const listboxButtons = container.querySelectorAll(
    'button[aria-haspopup="listbox"]',
  );
  expect(listboxButtons).toHaveLength(1);
  expect(listboxButtons[0]).toHaveTextContent(`Tab ${expectedIndex}`);

  // 3: assert that the correct panel is displayed
  const panels = screen.getAllByRole("tabpanel");
  expect(panels).toHaveLength(1);
  expect(panels[0]).toBeVisible();
  expect(panels[0]).toHaveTextContent(`Tab panel ${expectedIndex}`);
}

describe("Tabs component", () => {
  it("Renders correctly with default index", () => {
    const { container } = render(<Example />);

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    assertSelectedState(0, container);
  });

  it("Renders correctly with a specific index", () => {
    const { container } = render(<Example initialActiveIndex={1} />);
    assertSelectedState(1, container);
  });

  it("Switches tabs and content on tab button click", async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);
    const targetIndex = 2;

    const tabButtons = screen.getAllByRole("tab");

    expect(tabButtons[0]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Tab 0" })).toBeVisible();
    expect(
      screen.queryByRole("tabpanel", { name: `Tab ${targetIndex}` }),
    ).not.toBeInTheDocument();

    await user.click(tabButtons[targetIndex]);

    assertSelectedState(2, container);
  });

  it("triggers onChange calls", async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(<Example onChange={handler} />);
    await user.click(screen.getByRole("tab", { name: "Tab 1" }));
    expect(handler).toHaveBeenCalledExactlyOnceWith(1);
  });

  describe("Mobile dropdown interaction", () => {
    it("Opens the dropdown options on button click", async () => {
      const user = userEvent.setup();
      render(<Example />);
      const listboxButton = screen.getByRole("button", {
        name: "Tab 0",
      });

      expect(
        screen.queryByRole("option", { name: "Tab 1" }),
      ).not.toBeInTheDocument();

      await user.click(listboxButton);
      const options = screen.getAllByRole("option");

      expect(options).toHaveLength(3);
      expect(options.map((option) => option.textContent)).toStrictEqual([
        "Tab 0",
        "Tab 1",
        "Tab 2",
      ]);
    });

    it("Switches tabs when an option is clicked", async () => {
      const user = userEvent.setup();
      const { container } = render(<Example />);
      const targetIndex = 1;

      const listboxButton = screen.getByRole("button", {
        name: "Tab 0",
      });
      assertSelectedState(0, container);

      await user.click(listboxButton);

      const targetOption = await screen.findByRole("option", {
        name: `Tab ${targetIndex}`,
      });
      await user.click(targetOption);

      assertSelectedState(1, container);
    });

    it("triggers onChange calls", async () => {
      const user = userEvent.setup();
      const handler = vi.fn();
      render(<Example onChange={handler} />);
      // open the dropdown
      await user.click(screen.getByRole("button", { name: "Tab 0" }));
      // select the new tab
      await user.click(screen.getByRole("option", { name: "Tab 1" }));
      expect(handler).toHaveBeenCalledExactlyOnceWith(1);
    });
  });
});
