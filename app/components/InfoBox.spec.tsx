import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import InfoBox, { DetailsSummaryListProps } from "./InfoBox";

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
  });

  describe("DetailsSummaryList", () => {
    it("shows the detailSummary", () => {
      const testDetailSummary: DetailsSummaryListProps = {
        title: { text: "List Title", tagName: "h3" },
        items: [
          { title: "Test Detail 1", children: "Test Content 1" },
          { title: "Test Detail 2", children: "Test Content 2" },
        ],
      };
      render(<InfoBox.DetailsSummaryList {...testDetailSummary} />);

      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "List Title",
      );
      expect(screen.getAllByRole("group").length).toBe(2);
      expect(screen.getAllByRole("group").at(0)).toHaveTextContent(
        "Test Detail 1Test Content 1",
      );
    });
  });

  describe("LinkList", () => {
    it("shows links", () => {
      const RouterStubInfoBoxItem = createRoutesStub([
        {
          path: "/",
          Component: () => (
            <InfoBox>
              <InfoBox.LinkList
                links={[
                  {
                    text: "Link 1",
                    to: "example.com",
                  },
                  {
                    text: "Link 2",
                    to: "example2.com",
                    download: true,
                  },
                ]}
              />
            </InfoBox>
          ),
        },
      ]);
      render(<RouterStubInfoBoxItem />);

      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(2);
      expect(links.map((link) => link.textContent.trim())).toStrictEqual([
        "Link 1",
        "Link 2",
      ]);
      expect(links.at(1)).toHaveAttribute("download");
    });
  });
});
