import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router";
import { describe, expect, it } from "vitest";
import TabGroup, {
  SearchParamTabs,
  TabGroupProps,
} from "~/components/Tabs/Tabs";

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = MockResizeObserver;

const tabs = ["Tab 0", "Tab 1", "Tab 2"];

type ExampleProps = Partial<Omit<TabGroupProps, "children">>;

const Example = (props: ExampleProps) => (
  <TabGroup {...props}>
    <TabGroup.Tab label={tabs[0]}>Tab panel 0</TabGroup.Tab>
    <TabGroup.Tab label={tabs[1]}>Tab panel 1</TabGroup.Tab>
    <TabGroup.Tab label={tabs[2]}>Tab panel 2</TabGroup.Tab>
  </TabGroup>
);

const SearchParamExample = () => {
  const location = useLocation();

  return (
    <>
      <SearchParamTabs>
        <SearchParamTabs.Tab tabId="tab-0" label={tabs[0]}>
          Tab panel 0
        </SearchParamTabs.Tab>
        <SearchParamTabs.Tab tabId="tab-1" label={tabs[1]}>
          Tab panel 1
        </SearchParamTabs.Tab>
        <SearchParamTabs.Tab tabId="tab-2" label={tabs[2]}>
          Tab panel 2
        </SearchParamTabs.Tab>
      </SearchParamTabs>
      <output data-testid="search">{location.search}</output>
    </>
  );
};

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
  it("renders without router context", () => {
    const { container } = render(<Example />);

    assertSelectedState(0, container);
  });

  it("Renders correctly with default index", () => {
    const { container } = render(<Example />);

    expect(screen.getByRole("tablist")).toBeInTheDocument();
    assertSelectedState(0, container);
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
  });

  it("uses state from the `tab` search parameter", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/?tab=tab-2"]}>
        <SearchParamExample />
      </MemoryRouter>,
    );

    assertSelectedState(2, container);
  });

  it("uses slugified label values for search-param state", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/?tab=ueberblick"]}>
        <SearchParamTabs>
          <SearchParamTabs.Tab label="Überblick">Panel 0</SearchParamTabs.Tab>
          <SearchParamTabs.Tab label="Häufige Fragen">
            Panel 1
          </SearchParamTabs.Tab>
        </SearchParamTabs>
      </MemoryRouter>,
    );

    expect(screen.getByRole("tab", { name: "Überblick" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      container.querySelector('button[aria-haspopup="listbox"]'),
    ).toHaveTextContent("Überblick");
  });

  it("prefers stable tab ids over label-derived slugs", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/?tab=background"]}>
        <SearchParamTabs>
          <SearchParamTabs.Tab tabId="overview" label="Einleitung">
            Panel 0
          </SearchParamTabs.Tab>
          <SearchParamTabs.Tab tabId="background" label="Grundlagen">
            Panel 1
          </SearchParamTabs.Tab>
        </SearchParamTabs>
      </MemoryRouter>,
    );

    expect(screen.getByRole("tab", { name: "Grundlagen" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      container.querySelector('button[aria-haspopup="listbox"]'),
    ).toHaveTextContent("Grundlagen");
  });

  it("updates the `tab` search parameter and preserves others", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/?foo=bar"]}>
        <SearchParamExample />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("tab", { name: "Tab 1" }));

    const searchParams = new URLSearchParams(
      screen.getByTestId("search").textContent ?? "",
    );
    expect(searchParams.get("foo")).toBe("bar");
    expect(searchParams.get("tab")).toBe("tab-1");
  });
});
