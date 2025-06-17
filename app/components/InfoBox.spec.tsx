import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InfoBoxList from "./InfoBoxList";

const mockInfoBoxItems = [
  {
    label: undefined,
    heading: { text: "Heading 1" },
    image: undefined,
    content: "Lorem1",
    buttons: [],
  },
  {
    label: undefined,
    heading: { text: "Heading 2" },
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
          <InfoBoxList.List>
            {mockInfoBoxItems.map((item) => (
              <InfoBoxList.Item key={item.heading.text} {...item} />
            ))}
          </InfoBoxList.List>
        </InfoBoxList>,
      );
      expect(screen.getByRole("list")).toHaveClass("ds-stack-32");
    });

    it("has expected padding when the separator is disabled", () => {
      render(
        <InfoBoxList>
          <InfoBoxList.List>
            {mockInfoBoxItems.map((item) => (
              <InfoBoxList.Item key={item.heading.text} {...item} />
            ))}
          </InfoBoxList.List>
        </InfoBoxList>,
      );
      expect(screen.getByRole("list")).toHaveClass("ds-stack-48");
    });
  });
});
