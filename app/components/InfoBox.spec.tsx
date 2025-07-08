import { ArrowCircleRightOutlined } from "@digitalservicebund/icons";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InfoBoxList from "./InfoBoxList";

const mockInfoBoxItems = [
  {
    label: undefined,
    headline: undefined,
    image: undefined,
    content: "Lorem1",
    buttons: [],
  },
  {
    label: undefined,
    headline: undefined,
    image: undefined,
    content: "Lorem2",
    buttons: [],
  },
];

describe("InfoBoxList", () => {
  describe("Separator", () => {
    it("has expected padding when the separator is enabled", () => {
      render(<InfoBoxList separator={true} items={mockInfoBoxItems} />);
      expect(screen.getByRole("list")).toHaveClass("ds-stack-32");
    });

    it("has expected padding when the separator is disabled", () => {
      render(<InfoBoxList separator={false} items={mockInfoBoxItems} />);
      expect(screen.getByRole("list")).toHaveClass("ds-stack-48");
    });

    it("has expected padding when the separator is unset", () => {
      render(<InfoBoxList items={mockInfoBoxItems} />);
      expect(screen.getByRole("list")).toHaveClass("ds-stack-32");
    });
  });

  describe("Top level elements", () => {
    it("shows the icon", () => {
      render(
        <InfoBoxList
          items={mockInfoBoxItems}
          Icon={ArrowCircleRightOutlined}
        />,
      );
      expect(
        screen.getByTestId("ArrowCircleRightOutlinedIcon"),
      ).toBeInTheDocument();
    });

    it("shows the label", () => {
      render(
        <InfoBoxList
          items={mockInfoBoxItems}
          badge={{ children: "TestLabel" }}
        />,
      );
      expect(screen.getByRole("mark")).toHaveTextContent("TestLabel");
    });

    it("shows the heading", () => {
      render(
        <InfoBoxList
          items={mockInfoBoxItems}
          heading={{ text: "TestHeading", tagName: "h2" }}
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
