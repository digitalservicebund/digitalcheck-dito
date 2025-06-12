import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { ReactNode } from "react";
import type { DropdownItemProps } from "~/components/DropdownContentList";
import type { DropdownProps } from "./DropdownMenu";
import DropdownMenu from "./DropdownMenu";

vi.mock("~/resources/content/components/header.ts", () => ({
  header: {
    contactTel: {
      msgMobile: "mobile msg",
      msg: "desktop msg",
      number: "0123456",
    },
    contactMail: {
      msg: "desktop mail msg",
      url: "mail@example.com",
    },
  },
}));

const mockDropdownData: DropdownItemProps[] = [
  { title: "Link1", href: "/", plausibleEventName: "event1" },
  {
    title: "Link2",
    href: "/link2",
    content: "Description for Link2",
    plausibleEventName: "event2",
  },
  {
    title: "Link3",
    href: "/link3",
    isNewTitle: true,
    newContent: "New content",
    plausibleEventName: "event3",
  },
];

const mockOnToggle = vi.fn();
const mockOnItemClick = vi.fn();
const mockOnOpenChange = vi.fn();

const defaultTestProps: DropdownProps = {
  label: "Main Menu",
  data: mockDropdownData,
  isExpanded: false,
  onToggle: mockOnToggle,
  onItemClick: mockOnItemClick,
  onOpenChange: mockOnOpenChange,
  isActiveParent: false,
  variant: "desktop",
  plausibleEventName: "",
};

const RouterWrapper = ({
  children,
  initialEntries,
}: {
  children: ReactNode;
  initialEntries: string[];
}) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Routes>
      <Route path="*" element={children} />
    </Routes>
  </MemoryRouter>
);

describe("DropdownMenu Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderDropdown = (
    props: Partial<DropdownProps> = {},
    initialEntries: string[] = ["/"],
  ) => {
    const mergedProps = { ...defaultTestProps, ...props };

    return render(
      <RouterWrapper initialEntries={initialEntries}>
        <DropdownMenu {...mergedProps} />
      </RouterWrapper>,
    );
  };

  it("has correct ARIA attributes when closed", () => {
    renderDropdown({ label: "Aria Menu", isExpanded: false });
    const button = screen.getByRole("button", { name: "Aria Menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-haspopup", "menu");
    expect(button).toHaveAttribute(
      "aria-controls",
      "dropdown-Aria Menu-inhalt",
    );
    expect(
      document.getElementById("dropdown-Aria Menu-inhalt"),
    ).not.toBeInTheDocument();
  });

  it("has correct ARIA attributes and displays content when open", () => {
    renderDropdown({ label: "Aria Menu", isExpanded: true });
    const button = screen.getByRole("button", { name: "Aria Menu" });
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAttribute(
      "aria-controls",
      "dropdown-Aria Menu-inhalt",
    );

    const panel = document.getElementById("dropdown-Aria Menu-inhalt");
    expect(panel).toBeInTheDocument();
    expect(panel).toBeVisible();
    expect(panel).toHaveAttribute(
      "aria-labelledby",
      "dropdown-Aria Menu-button",
    );

    expect(
      within(panel!).getByRole("menuitem", { name: "Link1" }),
    ).toBeVisible();
    expect(
      within(panel!).getByRole("menuitem", { name: "Link2" }),
    ).toBeVisible();
  });

  describe("Desktop Variant Interactions", () => {
    it("calls onToggle on pointerEnter if not expanded", () => {
      const { container } = renderDropdown({
        variant: "desktop",
        isExpanded: false,
      });
      fireEvent.pointerEnter(container.firstChild!);
      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it("calls onToggle on pointerLeave if expanded", () => {
      const { container } = renderDropdown({
        variant: "desktop",
        isExpanded: true,
      });
      fireEvent.pointerLeave(container.firstChild!);
      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it("displays dropdown content items when isExpanded is true", () => {
      renderDropdown({ variant: "desktop", isExpanded: true });
      expect(screen.getByRole("menuitem", { name: "Link1" })).toBeVisible();
      expect(screen.getByText("Description for Link2")).toBeVisible();
      expect(screen.getByText("New content")).toBeVisible();
    });
  });

  describe("Mobile Variant Interactions", () => {
    const user = userEvent.setup();

    it("calls onToggle when button is clicked", async () => {
      renderDropdown({ variant: "mobile" });
      const button = screen.getByRole("button", { name: "Main Menu" });
      await user.click(button);
      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it("displays dropdown content items when isExpanded is true", () => {
      renderDropdown({ variant: "mobile", isExpanded: true });
      expect(screen.getByRole("menuitem", { name: "Link1" })).toBeVisible();

      const secondElement = screen.getByText("Description for Link2");
      expect(secondElement).toHaveClass("hidden");
      const thirdElement = screen.getByText("New content");
      const thirdNewContentParentDiv = thirdElement.parentElement;

      expect(thirdNewContentParentDiv).toHaveClass("max-lg:hidden");
    });
  });

  describe("Content Display", () => {
    const user = userEvent.setup();

    it("displays support section desktop message when hasSupport is true and expanded (desktop)", () => {
      renderDropdown({
        hasSupport: true,
        isExpanded: true,
        variant: "desktop",
      });
      expect(screen.getByText(/desktop msg/)).toBeInTheDocument();
      expect(screen.getByText("0123456")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "0123456" })).toHaveAttribute(
        "href",
        "tel:0123456",
      );
    });

    it("displays support section mobile message when hasSupport, isMobile and expanded", () => {
      renderDropdown({ hasSupport: true, isExpanded: true, variant: "mobile" });
      expect(screen.getByText(/mobile msg/)).toBeInTheDocument();
      expect(screen.getByText("0123456")).toBeInTheDocument();
    });

    it("does not display support section when hasSupport is false,", () => {
      renderDropdown({ hasSupport: false, isExpanded: true });
      expect(screen.queryByText(/desktop msg/)).not.toBeInTheDocument();
      expect(screen.queryByText(/mobile msg/)).not.toBeInTheDocument();
    });

    it("does not display support section when not expanded", () => {
      renderDropdown({ hasSupport: true, isExpanded: false });
      expect(screen.queryByText(/desktop msg/)).not.toBeInTheDocument();
    });

    it("calls onItemClick when a dropdown item is clicked", async () => {
      renderDropdown({ isExpanded: true });
      const itemToClick = screen.getByRole("menuitem", { name: "Link2" });
      await user.click(itemToClick);
      expect(mockOnItemClick).toHaveBeenCalledTimes(1);
    });

    it("renders an <ol> and item numbers when isOrderedList is true and expanded", () => {
      renderDropdown({ isExpanded: true, isOrderedList: true }); // This uses defaultTestProps.data which is mockDropdownData
      const list = screen.getByRole("list");
      expect(list.tagName).toBe("OL");
      const firstLinkItem = screen.getByRole("menuitem", {
        name: "Link1",
      });
      expect(firstLinkItem).toHaveTextContent(/1\.\s*Link1/);
      const secondLinkItem = screen.getByRole("menuitem", {
        name: "Link2",
      });
      expect(secondLinkItem).toHaveTextContent(/2\.\s*Link2/);
      const thirdLinkItem = screen.getByRole("menuitem", {
        name: "Link3",
      });
      expect(thirdLinkItem).toHaveTextContent(/NEU\s*3\.\s*Link3/);
    });

    it("renders a <ul> when isOrderedList is false and expanded", () => {
      renderDropdown({ isExpanded: true, isOrderedList: false });
      const list = screen.getByRole("list");
      expect(list.tagName).toBe("UL");
      expect(screen.queryByText(/1\. Link1/)).not.toBeInTheDocument();
      expect(screen.getByText("Link1")).toBeInTheDocument();
    });
  });

  describe("Active Item highlighting", () => {
    it("highlights an item when the url matches the page", () => {
      renderDropdown({ isExpanded: true, isOrderedList: false });
      const activeLink = screen.getByText("Link1").parentElement!;

      expect(activeLink.classList).toContain("border-blue-800");
      expect(activeLink.classList).toContain("bg-blue-100");

      const inActiveLink = screen.getByText("Link2").parentElement!;

      expect(inActiveLink.classList).not.toContain("border-blue-800");
      expect(inActiveLink.classList).not.toContain("bg-blue-100");
    });

    it("does not highlight when the noHighlight option is set", () => {
      const newMockDropdownData: DropdownItemProps[] = [
        {
          title: "Link1",
          href: "/",
          plausibleEventName: "event1",
          activeBehavior: "noHighlight",
        },
        {
          title: "Link2",
          href: "/Link2",
          plausibleEventName: "event2",
        },
      ];

      renderDropdown({
        isExpanded: true,
        isOrderedList: false,
        data: newMockDropdownData,
      });

      const activeLink = screen.getByText("Link1").parentElement!;

      expect(activeLink.classList).not.toContain("border-blue-800");
      expect(activeLink.classList).not.toContain("bg-blue-100");
    });

    it("does only highlight exact path matches when the exactMatch option is set", () => {
      const newMockDropdownData: DropdownItemProps[] = [
        {
          title: "Link1",
          href: "/Link1",
          plausibleEventName: "event1",
          activeBehavior: "exactMatch",
        },
        {
          title: "Link2",
          href: "/Link1/Link2",
          plausibleEventName: "event2",
        },
      ];

      renderDropdown(
        {
          isExpanded: true,
          isOrderedList: false,
          data: newMockDropdownData,
        },
        ["/Link1/Link2"],
      );

      const inActiveLink = screen.getByText("Link1").parentElement!;

      expect(inActiveLink.classList).not.toContain("border-blue-800");
      expect(inActiveLink.classList).not.toContain("bg-blue-100");

      const activeLink = screen.getByText("Link2").parentElement!;

      expect(activeLink.classList).toContain("border-blue-800");
      expect(activeLink.classList).toContain("bg-blue-100");
    });
  });
});
