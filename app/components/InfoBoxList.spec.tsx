import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InfoBox from "./InfoBox";
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
      render(
        <InfoBoxList separator>
          {mockInfoBoxItems.map((item, i) => (
            <InfoBox key={i} {...item} />
          ))}
        </InfoBoxList>,
      );
      expect(screen.getByRole("list")).toHaveClass("ds-stack-32");
    });

    it("has expected padding when the separator is disabled", () => {
      render(
        <InfoBoxList separator={false}>
          {mockInfoBoxItems.map((item, i) => (
            <InfoBox key={i} {...item} />
          ))}
        </InfoBoxList>,
      );
      expect(screen.getByRole("list")).toHaveClass("ds-stack-48");
    });

    it("has expected padding when the separator is unset", () => {
      render(
        <InfoBoxList>
          {mockInfoBoxItems.map((item, i) => (
            <InfoBox key={i} {...item} />
          ))}
        </InfoBoxList>,
      );
      expect(screen.getByRole("list")).toHaveClass("ds-stack-48");
    });
  });

  describe("Top level elements", () => {
    it("shows the heading", () => {
      render(
        <InfoBoxList heading={{ text: "TestHeading" }}>
          {mockInfoBoxItems.map((item, i) => (
            <InfoBox key={i} {...item} />
          ))}
        </InfoBoxList>,
      );

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "TestHeading",
      );
    });
  });

  describe("Items", () => {
    it("renders the InfoBoxItems", () => {
      render(
        <InfoBoxList>
          {mockInfoBoxItems.map((item, i) => (
            <InfoBox key={i} {...item} />
          ))}
        </InfoBoxList>,
      );

      expect(screen.getAllByRole("listitem").length).toBe(2);
    });
  });
});
