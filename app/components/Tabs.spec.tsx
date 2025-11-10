import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Container from "~/components/Container.tsx";
import InfoBox from "~/components/InfoBox.tsx";
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
        <InfoBox
          heading={{
            tagName: "h3",
            look: "ds-heading-03-reg",
            text: "someTitle",
          }}
          content={"someText"}
        />
      </Container>
    ),
  },
  { title: "Example 2", content: <div>Content Tab 2</div> },
  { title: "Example 3", content: <span>Content Tab 3</span> },
];

describe("Tabs component", () => {
  it("Renders correctly with default index", () => {
    render(<Tabs tabs={mockTabs} />);

    expect(screen.getByRole("tablist")).toBeInTheDocument();

    const tabButtons = screen.getAllByRole("tab");
    expect(tabButtons).toHaveLength(mockTabs.length);

    mockTabs.forEach((tab, index) => {
      expect(tabButtons[index]).toHaveTextContent(tab.title);
      expect(tabButtons[index]).toHaveAttribute(
        "aria-controls",
        expect.stringContaining("panel"),
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

    const panel2 = screen.queryByRole("tabpanel", { name: mockTabs[1].title });
    expect(panel2).not.toBeInTheDocument();
    const panel3 = screen.queryByRole("tabpanel", { name: mockTabs[2].title });
    expect(panel3).not.toBeInTheDocument();
  });

  it("Renders correctly with a specific index", () => {
    const initialIndex = 1;
    const { container } = render(
      <Tabs tabs={mockTabs} initialActiveIndex={initialIndex} />,
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

    expect(
      screen.queryByRole("tabpanel", { name: mockTabs[0].title }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("tabpanel", {
        name: mockTabs[2].title,
      }),
    ).not.toBeInTheDocument();
  });

  it("Switches tabs and content on tab button click", async () => {
    const user = userEvent.setup();
    const { container } = render(<Tabs tabs={mockTabs} />);
    const targetIndex = 2;

    const tabButtons = screen.getAllByRole("tab");

    expect(tabButtons[0]).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByRole("tabpanel", { name: mockTabs[0].title }),
    ).toBeVisible();
    expect(
      screen.queryByRole("tabpanel", { name: mockTabs[targetIndex].title }),
    ).not.toBeInTheDocument();

    await user.click(tabButtons[targetIndex]);

    expect(tabButtons[0]).toHaveAttribute("aria-selected", "false");
    expect(tabButtons[0]).toHaveAttribute("tabindex", "-1");
    expect(tabButtons[targetIndex]).toHaveAttribute("aria-selected", "true");
    expect(tabButtons[targetIndex]).toHaveAttribute("tabindex", "0");

    expect(
      screen.queryByRole("tabpanel", { name: mockTabs[0].title }),
    ).not.toBeInTheDocument();
    const activePanel = screen.getByRole("tabpanel", {
      name: mockTabs[targetIndex].title,
    });
    expect(activePanel).toBeVisible();
    expect(within(activePanel).getByText("Content Tab 3")).toBeVisible();
  });

  describe("Mobile dropdown interaction", () => {
    it("Opens the dropdown options on button click", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} />);
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
      const { container } = render(<Tabs tabs={mockTabs} />);
      const targetIndex = 1;

      let listboxButton = screen.getByRole("button", {
        name: mockTabs[0].title,
      });
      expect(
        screen.getByRole("tabpanel", { name: mockTabs[0].title }),
      ).toBeVisible();
      expect(
        screen.queryByRole("tabpanel", { name: mockTabs[1].title }),
      ).not.toBeInTheDocument();

      await user.click(listboxButton);

      const targetOption = await screen.findByRole("option", {
        name: mockTabs[targetIndex].title,
      });
      await user.click(targetOption);

      listboxButton = await screen.findByRole("button", {
        name: mockTabs[targetIndex].title,
      });
      expect(listboxButton).toBeInTheDocument();

      expect(
        screen.queryByRole("tabpanel", { name: mockTabs[0].title }),
      ).not.toBeInTheDocument();
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
});
