import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Box from "~/components/Box.tsx";
import Container from "~/components/Container.tsx";
import Tabs, { TabItem } from "./Tabs";

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = MockResizeObserver;

const mockTabs: TabItem[] = [
  {
    title: "Example 1",
    content: (
      <Container>
        <Box
          heading={{
            tagName: "h3",
            look: "ds-heading-03-reg",
            text: "someTitle",
          }}
          content={{
            markdown: "someText",
          }}
        />
      </Container>
    ),
  },
  { title: "Example 2", content: <div>Content Tab 2</div> },
  { title: "Example 3", content: <span>Content Tab 3</span> },
];

const ariaLabel = "label";

describe("Tabs component", () => {
  it("Renders correctly with default index", () => {
    const { container } = render(
      <Tabs tabs={mockTabs} ariaLabel={ariaLabel} />,
    );

    expect(
      screen.getByRole("tablist", { name: ariaLabel }),
    ).toBeInTheDocument();

    const tabButtons = screen.getAllByRole("tab");
    expect(tabButtons).toHaveLength(mockTabs.length);

    mockTabs.forEach((tab, index) => {
      expect(tabButtons[index]).toHaveTextContent(tab.title);
      expect(tabButtons[index]).toHaveAttribute("id", `tab-${index + 1}`);
      expect(tabButtons[index]).toHaveAttribute(
        "aria-controls",
        `panel-${index + 1}`,
      );
      expect(tabButtons[index]).toHaveAttribute(
        "aria-selected",
        index === 0 ? "true" : "false",
      );
      expect(tabButtons[index]).toHaveAttribute(
        "tabindex",
        index === 0 ? "0" : "-1",
      );
    });

    const listboxButton = screen.getByRole("button", {
      name: mockTabs[0].title,
    });
    expect(listboxButton).toBeInTheDocument();

    const panel1 = screen.getByRole("tabpanel", { name: mockTabs[0].title });
    expect(panel1).toBeVisible();
    expect(within(panel1).getByText("someTitle")).toBeVisible();
    expect(within(panel1).getByText("someText")).toBeVisible();

    const panel2 = container.querySelector("#panel-2");
    expect(panel2).not.toBeVisible();
    const panel3 = container.querySelector("#panel-3");
    expect(panel3).not.toBeVisible();
  });

  it("Renders correctly with a specific index", () => {
    const initialIndex = 1;
    const { container } = render(
      <Tabs
        tabs={mockTabs}
        initialActiveIndex={initialIndex}
        ariaLabel={ariaLabel}
      />,
    );

    const tabButtons = screen.getAllByRole("tab");
    expect(tabButtons[initialIndex]).toHaveAttribute("aria-selected", "true");
    expect(tabButtons[initialIndex]).toHaveAttribute("tabindex", "0");
    expect(tabButtons[0]).toHaveAttribute("aria-selected", "false");
    expect(tabButtons[0]).toHaveAttribute("tabindex", "-1");
    expect(tabButtons[2]).toHaveAttribute("aria-selected", "false");
    expect(tabButtons[2]).toHaveAttribute("tabindex", "-1");

    expect(
      screen.getByRole("button", { name: mockTabs[initialIndex].title }),
    ).toBeInTheDocument();

    const panelActive = screen.getByRole("tabpanel", {
      name: mockTabs[initialIndex].title,
    });
    expect(panelActive).toBeVisible();
    expect(within(panelActive).getByText("Content Tab 2")).toBeVisible();

    const panelInactive1 = container.querySelector("#panel-1");
    expect(panelInactive1).not.toBeVisible();
    const panelInactive3 = container.querySelector("#panel-3");
    expect(panelInactive3).not.toBeVisible();
  });

  it("Switches tabs and content on tab button click", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Tabs tabs={mockTabs} ariaLabel={ariaLabel} />,
    );
    const targetIndex = 2;

    const tabButtons = screen.getAllByRole("tab");

    expect(tabButtons[0]).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByRole("tabpanel", { name: mockTabs[0].title }),
    ).toBeVisible();
    expect(
      container.querySelector(`#panel-${targetIndex + 1}`),
    ).not.toBeVisible();

    await user.click(tabButtons[targetIndex]);

    expect(tabButtons[0]).toHaveAttribute("aria-selected", "false");
    expect(tabButtons[0]).toHaveAttribute("tabindex", "-1");
    expect(tabButtons[targetIndex]).toHaveAttribute("aria-selected", "true");
    expect(tabButtons[targetIndex]).toHaveAttribute("tabindex", "0");

    expect(container.querySelector("#panel-1")).not.toBeVisible();
    const activePanel = screen.getByRole("tabpanel", {
      name: mockTabs[targetIndex].title,
    });
    expect(activePanel).toBeVisible();
    expect(within(activePanel).getByText("Content Tab 3")).toBeVisible();
  });

  describe("Keyboard navigation regular view", () => {
    it("Activates the focused tab on enter", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Tabs tabs={mockTabs} ariaLabel={ariaLabel} />,
      );
      const tabButtons = screen.getAllByRole("tab");

      tabButtons[0].focus();
      await user.keyboard("{ArrowRight}");
      expect(tabButtons[1]).toHaveFocus();
      expect(tabButtons[1]).toHaveAttribute("aria-selected", "false");
      expect(container.querySelector("#panel-2")).not.toBeVisible();

      await user.keyboard("{Enter}");

      expect(tabButtons[1]).toHaveAttribute("aria-selected", "true");
      expect(tabButtons[0]).toHaveAttribute("aria-selected", "false");
      expect(
        screen.getByRole("tabpanel", { name: mockTabs[1].title }),
      ).toBeVisible();
      expect(container.querySelector("#panel-1")).not.toBeVisible();
    });

    it("Activates the focused tab on space key press", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Tabs tabs={mockTabs} ariaLabel={ariaLabel} />,
      );
      const tabButtons = screen.getAllByRole("tab");

      tabButtons[0].focus();
      await user.keyboard("{ArrowRight}");
      await user.keyboard("{ArrowRight}");
      expect(tabButtons[2]).toHaveFocus();
      expect(tabButtons[2]).toHaveAttribute("aria-selected", "false");
      expect(container.querySelector("#panel-3")).not.toBeVisible();

      await user.keyboard(" ");

      expect(tabButtons[2]).toHaveAttribute("aria-selected", "true");
      expect(tabButtons[0]).toHaveAttribute("aria-selected", "false");
      expect(
        screen.getByRole("tabpanel", { name: mockTabs[2].title }),
      ).toBeVisible();
      expect(container.querySelector("#panel-1")).not.toBeVisible();
    });
  });

  describe("Mobile dropdown interaction", () => {
    it("Opens the dropdown options on button click", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} ariaLabel={ariaLabel} />);
      const listboxButton = screen.getByRole("button", {
        name: mockTabs[0].title,
      });

      expect(
        screen.queryByRole("option", { name: mockTabs[1].title }),
      ).not.toBeInTheDocument();

      await user.click(listboxButton);

      const option1 = await screen.findByRole("option", {
        name: mockTabs[0].title,
      });
      const option2 = await screen.findByRole("option", {
        name: mockTabs[1].title,
      });
      const option3 = await screen.findByRole("option", {
        name: mockTabs[2].title,
      });

      expect(option1).toBeInTheDocument();
      expect(option2).toBeInTheDocument();
      expect(option3).toBeInTheDocument();
    });

    it("Switches tabs when an option is clicked", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Tabs tabs={mockTabs} ariaLabel={ariaLabel} />,
      );
      const targetIndex = 1;

      let listboxButton = screen.getByRole("button", {
        name: mockTabs[0].title,
      });
      expect(container.querySelector("#panel-1")).toBeVisible();
      expect(container.querySelector("#panel-2")).not.toBeVisible();

      await user.click(listboxButton);

      const targetOption = await screen.findByRole("option", {
        name: mockTabs[targetIndex].title,
      });
      await user.click(targetOption);

      listboxButton = await screen.findByRole("button", {
        name: mockTabs[targetIndex].title,
      });
      expect(listboxButton).toBeInTheDocument();

      expect(container.querySelector("#panel-1")).not.toBeVisible();
      const activePanel = screen.getByRole("tabpanel", {
        name: mockTabs[targetIndex].title,
      });
      expect(activePanel).toBeVisible();
      expect(within(activePanel).getByText("Content Tab 2")).toBeVisible();

      const tabButtons = screen.getAllByRole("tab");
      expect(tabButtons[targetIndex]).toHaveAttribute("aria-selected", "true");
      expect(tabButtons[0]).toHaveAttribute("aria-selected", "false");
    });
  });

  it("Updates the active tab when index changes", () => {
    const { rerender, container } = render(
      <Tabs tabs={mockTabs} ariaLabel={ariaLabel} />,
    );

    expect(screen.getAllByRole("tab")[0]).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(container.querySelector("#panel-1")).toBeVisible();
    expect(
      screen.getByRole("button", { name: mockTabs[0].title }),
    ).toBeInTheDocument();

    const newIndex = 2;
    rerender(
      <Tabs
        tabs={mockTabs}
        initialActiveIndex={newIndex}
        ariaLabel={ariaLabel}
      />,
    );

    const tabButtons = screen.getAllByRole("tab");
    expect(tabButtons[newIndex]).toHaveAttribute("aria-selected", "true");
    expect(tabButtons[0]).toHaveAttribute("aria-selected", "false");

    expect(container.querySelector("#panel-1")).not.toBeVisible();
    const activePanel = screen.getByRole("tabpanel", {
      name: mockTabs[newIndex].title,
    });
    expect(activePanel).toBeVisible();
    expect(within(activePanel).getByText("Content Tab 3")).toBeVisible();

    expect(
      screen.getByRole("button", { name: mockTabs[newIndex].title }),
    ).toBeInTheDocument();
  });
});
