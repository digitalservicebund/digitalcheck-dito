import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import InfoBoxItem from "./InfoBoxItem";

const separatorStyleClass =
  "border-0 border-b-2 border-solid border-gray-400 pb-40";

describe("InfoBoxItem", () => {
  describe("Separator", () => {
    it("has expected class properties when the separator is enabled", () => {
      render(<InfoBoxItem separator={true} />);
      expect(screen.getByRole("listitem")).toHaveClass(separatorStyleClass);
    });
    it("has expected class properties when the separator is disabled", () => {
      render(<InfoBoxItem separator={false} />);
      expect(screen.getByRole("listitem")).not.toHaveClass(separatorStyleClass);
    });
  });

  describe("Top level elements", () => {
    it("shows the label", () => {
      render(<InfoBoxItem badge={{ children: "TestLabel" }} />);
      expect(screen.getByText("TestLabel")).toBeInTheDocument();
    });

    it("shows the heading", () => {
      render(<InfoBoxItem headline={{ text: "TestHeading" }} />);

      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "TestHeading",
      );
    });

    it("shows the content", () => {
      render(<InfoBoxItem content="Test **Content**" />);

      expect(screen.getByRole("paragraph")).toHaveTextContent("Test Content");
    });

    it("shows the detailSummary", () => {
      const testDetailSummary = {
        items: [
          { title: "Test Detail 1", content: "Test Content 1" },
          { title: "Test Detail 2", content: "Test Content 2" },
        ],
      };
      render(<InfoBoxItem detailsSummary={testDetailSummary} />);

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
          Component: () => <InfoBoxItem linkList={testLinks} />,
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
