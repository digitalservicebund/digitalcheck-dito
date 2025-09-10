import { fireEvent, render, screen, within } from "@testing-library/react";
import { UserEvent, userEvent } from "@testing-library/user-event";
import React from "react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it } from "vitest";
import { header } from "~/resources/content/shared/header.ts";
import PageHeader from "./PageHeader";

vi.mock("react-router", async (importOriginal) => {
  const original = await importOriginal<typeof import("react-router")>();
  return {
    ...original,
    useMatches: vi.fn(() => []),
  };
});

describe("PageHeader", () => {
  const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);
    return render(ui, { wrapper: MemoryRouter });
  };

  enum TestModes {
    clicking = "clicking",
    hovering = "hovering",
  }

  for (const interaction of [TestModes.clicking, TestModes.hovering]) {
    describe(`${interaction} desktop navigation menu items`, () => {
      const targetText = header.items[0].text;
      const expectedContent = header.items[0].overlayContent[0].title;

      let desktopNav: HTMLElement;
      let firstHeaderItem: HTMLElement;
      let user: UserEvent;

      function getDropdownElement() {
        return within(desktopNav).queryByText(expectedContent);
      }

      beforeEach(async () => {
        user = userEvent.setup();
        renderWithRouter(<PageHeader />);

        desktopNav = screen.getByTestId("desktop-nav");
        firstHeaderItem = within(desktopNav).getByRole("button", {
          name: targetText,
        });

        expect(getDropdownElement()).toBeNull();

        switch (interaction) {
          case TestModes.hovering:
            await user.hover(firstHeaderItem);
            break;
          case TestModes.clicking:
            fireEvent.click(firstHeaderItem);
            break;
        }
      });

      it("opens the correct menu item", () => {
        expect(getDropdownElement()).toBeVisible();
      });

      it.skipIf(interaction !== TestModes.hovering)(
        "closes the correct menu item on unhover",
        async () => {
          expect(getDropdownElement()).toBeVisible();
          await user.unhover(firstHeaderItem);
          expect(getDropdownElement()).toBeNull();
        },
      );

      it("closes the menu item on escape key", async () => {
        expect(getDropdownElement()).toBeVisible();
        await user.keyboard("{escape}");
        expect(getDropdownElement()).toBeNull();
      });

      it("closes the menu item on click", async () => {
        expect(getDropdownElement()).toBeVisible();
        await user.click(firstHeaderItem);
        expect(getDropdownElement()).toBeNull();
      });

      it("closes the menu item if another item is hovered", async () => {
        expect(getDropdownElement()).toBeVisible();
        const secondItem = within(desktopNav).getByRole("button", {
          name: header.items[1].text,
        });
        await user.hover(secondItem);
        expect(getDropdownElement()).toBeNull();
      });

      it("closes the menu item if another item is clicked", async () => {
        expect(getDropdownElement()).toBeVisible();
        const secondItem = within(desktopNav).getByRole("button", {
          name: header.items[1].text,
        });
        await user.click(secondItem);
        expect(getDropdownElement()).toBeNull();
      });
    });
  }
});
