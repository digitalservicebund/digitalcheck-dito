import { render, screen, within } from "@testing-library/react";
import { UserEvent, userEvent } from "@testing-library/user-event";
import React from "react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { header } from "~/resources/content/shared/header.ts";
import PageHeader from "./PageHeader";

vi.mock("~/hooks/deviceHook", () => {
  return {
    useResize: vi.fn(),
  };
});

vi.mock("react-router", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-router")>();
  return {
    ...original,
    useMatches: vi.fn(() => []),
    Link: vi.fn(({ to, children, ...rest }) => (
      // just render a plain anchor tag
      <a href={to as string} {...rest}>
        {children}
      </a>
    )),
  };
});

describe("PageHeader", () => {
  const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);
    return render(ui, { wrapper: MemoryRouter });
  };

  describe("hovering desktop navigation menu items", () => {
    const targetText = header.items[0].text;
    const expectedContent = header.items[0].overlayContent[0].title;

    let desktopNav: HTMLElement;
    let firstHeaderItem: HTMLElement;
    let user: UserEvent;

    beforeEach(async () => {
      user = userEvent.setup();
      renderWithRouter(<PageHeader />);

      desktopNav = screen.getByTestId("desktop-nav");
      firstHeaderItem = within(desktopNav).getByText(targetText);

      expect(screen.queryByText(expectedContent)).toBeNull();

      await user.hover(firstHeaderItem);
    });

    it("opens the correct menu item", () => {
      expect(within(desktopNav).getByText(expectedContent)).toBeVisible();
    });

    it("closes the correct menu item on unhover", async () => {
      expect(within(desktopNav).getByText(expectedContent)).toBeVisible();
      await user.unhover(firstHeaderItem);
      expect(within(desktopNav).queryByText(expectedContent)).toBeNull();
    });

    it("closes the menu item on escape key", async () => {
      expect(within(desktopNav).getByText(expectedContent)).toBeVisible();
      await user.keyboard("{escape}");
      expect(within(desktopNav).queryByText(expectedContent)).toBeNull();
    });

    it("closes the menu item on click", async () => {
      expect(within(desktopNav).getByText(expectedContent)).toBeVisible();
      await user.click(firstHeaderItem);
      expect(within(desktopNav).queryByText(expectedContent)).toBeNull();
    });

    it("closes the menu item if another item is hovered", async () => {
      expect(within(desktopNav).getByText(expectedContent)).toBeVisible();
      const secondItem = within(desktopNav).getByText(header.items[1].text);
      await user.hover(secondItem);
      expect(within(desktopNav).queryByText(expectedContent)).toBeNull();
    });
  });
});
