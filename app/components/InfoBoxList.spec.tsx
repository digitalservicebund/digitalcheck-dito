import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InfoBoxList from "./InfoBoxList";

const mockInfoBoxItems = [
  {
    label: undefined,
    headline: undefined,
    image: undefined,
    content: "Lorem1",
    links: [],
  },
  {
    label: undefined,
    headline: undefined,
    image: undefined,
    content: "Lorem2",
    links: [],
  },
];

describe("InfoBoxList", () => {
  describe("Separator", () => {
    it("has expected padding when the separator is enabled", () => {
      render(<InfoBoxList items={mockInfoBoxItems} separator />);
      expect(screen.getByRole("list")).toHaveClass("ds-stack-32");
    });

    it("has expected padding when the separator is disabled", () => {
      render(<InfoBoxList items={mockInfoBoxItems} separator={false} />);
      expect(screen.getByRole("list")).toHaveClass("ds-stack-48");
    });

    it("has expected padding when the separator is unset", () => {
      render(<InfoBoxList items={mockInfoBoxItems} />);
      expect(screen.getByRole("list")).toHaveClass("ds-stack-48");
    });
  });

  describe("Top level elements", () => {
    it("shows the heading", () => {
      render(
        <InfoBoxList
          heading={{ text: "TestHeading" }}
          items={mockInfoBoxItems}
        />,
      );

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "TestHeading",
      );
    });
  });

  describe("Items", () => {
    it("renders the InfoBoxItems", () => {
      render(<InfoBoxList items={mockInfoBoxItems} />);

      expect(screen.getAllByRole("listitem").length).toBe(2);
    });
  });
});
