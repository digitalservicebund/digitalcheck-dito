import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import Nav from "./Nav";

const renderNav = (
  activeElementUrl?: string,
  completedElementUrls?: string[],
) => {
  // Stubbing the router is needed because Nav uses Links
  const RouterStub = createRoutesStub([
    {
      path: "/",
      Component: () => (
        <Nav
          activeElementUrl={activeElementUrl}
          ariaLabel="Label Text"
          completedElementUrls={completedElementUrls}
        >
          <Nav.Items>
            <Nav.Item url="/example1">Navigation Item 1</Nav.Item>
            <Nav.Item url="/example2" disabled>
              Navigation Item 2
            </Nav.Item>
            <Nav.Item
              subItems={
                <Nav.Items>
                  <Nav.Item url="/example3-1">Navigation SubItem 1</Nav.Item>
                  <Nav.Item url="/example3-2">Navigation SubItem 2</Nav.Item>
                </Nav.Items>
              }
            >
              Navigation Item 3 with SubItems
            </Nav.Item>
          </Nav.Items>
        </Nav>
      ),
    },
  ]);

  return render(<RouterStub />);
};

describe("Nav", () => {
  it("creates a navigation with 4 elements one of which is disabled", () => {
    renderNav();

    expect(screen.getAllByRole("list").length).toBe(2);
    expect(screen.getAllByRole("listitem").length).toBe(5);

    expect(
      screen.getByRole("link", {
        name: "Navigation Item 1",
      }),
    ).toHaveAttribute("href", "/example1");

    const disabledElement = screen.getByRole("link", {
      name: "Navigation Item 2",
    });
    expect(disabledElement).toHaveAttribute("href", "/example2");
    expect(disabledElement).toHaveAttribute("aria-disabled", "true");
    expect(disabledElement).toHaveClass("pointer-events-none", "text-gray-800");

    const subItems = screen.getByRole("button", {
      name: "Navigation Item 3 with SubItems",
    }).parentElement!;

    expect(
      within(subItems).getByRole("link", {
        name: "Navigation SubItem 1",
      }),
    ).toHaveAttribute("href", "/example3-1");

    expect(
      within(subItems).getByRole("link", {
        name: "Navigation SubItem 2",
      }),
    ).toHaveAttribute("href", "/example3-2");
  });

  it("highlights the current element", () => {
    renderNav("/example3-1");

    const activeElement = screen.getByRole("link", {
      current: "page",
    });
    expect(activeElement).toHaveClass(
      "ds-label-02-bold",
      "pointer-events-none",
      "border-l-blue-800",
      "bg-blue-300",
    );
  });

  it("shows a completed icon for completed elements", () => {
    renderNav("/example3-1", ["/example1", "/example2"]);

    const completedElements = screen.getAllByRole("link", {
      name: /- completed/,
    });
    expect(completedElements.length).toBe(2);

    for (const element of completedElements) {
      expect(within(element).getByTestId("CheckIcon")).toBeInTheDocument();
    }
  });

  it("automatically opens the subItems when a descendant element is active", () => {
    const { container: render1 } = renderNav("/example1");
    expect(
      within(render1).getByRole("button", {
        name: "Navigation Item 3 with SubItems",
      }),
    ).toHaveAttribute("aria-expanded", "false");

    const { container: render2 } = renderNav("/example3-2");
    expect(
      within(render2).getByRole("button", {
        name: "Navigation Item 3 with SubItems",
      }),
    ).toHaveAttribute("aria-expanded", "true");
  });
});
