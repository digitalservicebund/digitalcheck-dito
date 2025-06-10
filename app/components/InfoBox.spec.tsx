import { ArrowCircleRightOutlined } from "@digitalservicebund/icons";
import { render, screen } from "@testing-library/react";
import InfoBox from "./InfoBox";

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

describe("InfoBox", () => {
  describe("Separator", () => {
    it("has expected padding when the separator is enabled", () => {
      render(<InfoBox separator={true} items={mockInfoBoxItems} />);
      expect(screen.getByRole("list")).toHaveClass("ds-stack-32");
    });

    it("has expected padding when the separator is disabled", () => {
      render(<InfoBox separator={false} items={mockInfoBoxItems} />);
      expect(screen.getByRole("list")).toHaveClass("ds-stack-48");
    });

    it("has expected padding when the separator is unset", () => {
      render(<InfoBox items={mockInfoBoxItems} />);
      expect(screen.getByRole("list")).toHaveClass("ds-stack-32");
    });
  });

  describe("Top level elements", () => {
    it("shows the icon", () => {
      render(
        <InfoBox items={mockInfoBoxItems} Icon={ArrowCircleRightOutlined} />,
      );
      expect(
        screen.getByTestId("ArrowCircleRightOutlinedIcon"),
      ).toBeInTheDocument();
    });

    it("shows the label", () => {
      render(
        <InfoBox items={mockInfoBoxItems} badge={{ children: "TestLabel" }} />,
      );
      expect(screen.getByRole("mark")).toHaveTextContent("TestLabel");
    });

    it("shows the heading", () => {
      render(
        <InfoBox
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
      render(<InfoBox items={mockInfoBoxItems} />);

      expect(screen.getAllByRole("listitem").length).toBe(2);
    });
  });
});
