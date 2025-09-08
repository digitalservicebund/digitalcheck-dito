import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import InfoBox from "./InfoBox";

describe("InfoBox", () => {
  describe("Top level elements", () => {
    it("shows the label", () => {
      render(<InfoBox badge={{ children: "TestLabel" }} />);
      expect(screen.getByText("TestLabel")).toBeInTheDocument();
    });

    it("shows the heading", () => {
      render(<InfoBox heading={{ text: "TestHeading" }} />);

      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "TestHeading",
      );
    });

    it("shows the content", () => {
      render(<InfoBox content="Test **Content**" />);

      expect(screen.getByRole("paragraph")).toHaveTextContent("Test Content");
    });

    it("shows the detailSummary", () => {
      const testDetailSummary = {
        items: [
          { title: "Test Detail 1", content: "Test Content 1" },
          { title: "Test Detail 2", content: "Test Content 2" },
        ],
      };
      render(<InfoBox detailsSummary={testDetailSummary} />);

      expect(screen.getAllByRole("group").length).toBe(2);
      expect(screen.getAllByRole("group").at(0)).toHaveTextContent(
        "Test Detail 1Test Content 1",
      );
    });

    it("shows the link list", () => {
      const testLinks = {
        header: "Test link list",
        links: [
          {
            title: "Link 1",
            url: "example.com",
          },
          {
            title: "Link 2",
            url: "example2.com",
          },
        ],
      };

      const RouterStubInfoBoxItem = createRoutesStub([
        {
          path: "/",
          Component: () => <InfoBox linkList={testLinks} />,
        },
      ]);
      render(<RouterStubInfoBoxItem />);

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Test link list",
      );

      const linkListEl = screen.getByRole("list");
      expect(within(linkListEl).getAllByRole("listitem").length).toBe(2);
    });
  });
});
