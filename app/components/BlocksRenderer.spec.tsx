import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Node } from "~/utils/paragraphUtils";
import { BlocksRenderer } from "./BlocksRenderer";

describe("BlocksContentRenderer", () => {
  describe("Basic rendering", () => {
    it("renders simple text nodes", () => {
      const content: Node[] = [
        { type: "text", text: "Hello world" },
        { type: "text", text: "Another text" },
      ];

      const { container } = render(<BlocksRenderer content={content} />);

      expect(container.textContent).toBe("Hello worldAnother text");
    });

    it("renders paragraph nodes with text children", () => {
      const content: Node[] = [
        {
          type: "paragraph",
          children: [{ type: "text", text: "This is a paragraph" }],
        },
      ];

      const { container } = render(<BlocksRenderer content={content} />);

      const paragraph = container.querySelector("p");
      expect(paragraph).toBeInTheDocument();
      expect(paragraph?.textContent).toBe("This is a paragraph");
    });

    it("renders unordered list", () => {
      const content: Node[] = [
        {
          type: "list",
          format: "unordered",
          children: [
            {
              type: "list-item",
              children: [{ type: "text", text: "First item" }],
            },
            {
              type: "list-item",
              children: [{ type: "text", text: "Second item" }],
            },
          ],
        },
      ];

      render(<BlocksRenderer content={content} />);

      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(2);
      expect(listItems[0]).toHaveTextContent("First item");
      expect(listItems[1]).toHaveTextContent("Second item");

      const list = screen.getByRole("list");
      expect(list.tagName).toBe("UL");
    });

    it("renders ordered list", () => {
      const content: Node[] = [
        {
          type: "list",
          format: "ordered",
          children: [
            {
              type: "list-item",
              children: [{ type: "text", text: "First step" }],
            },
          ],
        },
      ];

      render(<BlocksRenderer content={content} />);

      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(1);
      expect(listItems[0]).toHaveTextContent("First step");

      const list = screen.getByRole("list");
      expect(list.tagName).toBe("OL");
    });

    it("renders list items correctly", () => {
      const content: Node[] = [
        {
          type: "list-item",
          children: [{ type: "text", text: "List item content" }],
        },
      ];

      const { container } = render(<BlocksRenderer content={content} />);

      const listItem = container.querySelector("li");
      expect(listItem).toBeInTheDocument();
      expect(listItem?.textContent).toBe("List item content");
    });
  });

  describe("Nested content", () => {
    it("renders nested paragraphs within lists", () => {
      const content: Node[] = [
        {
          type: "list",
          format: "unordered",
          children: [
            {
              type: "list-item",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: "Nested paragraph" }],
                },
              ],
            },
          ],
        },
      ];

      const { container } = render(<BlocksRenderer content={content} />);

      const list = container.querySelector("ul");
      const listItem = container.querySelector("li");
      const paragraph = container.querySelector("p");

      expect(list).toBeInTheDocument();
      expect(listItem).toBeInTheDocument();
      expect(paragraph).toBeInTheDocument();
      expect(paragraph?.textContent).toBe("Nested paragraph");
      expect(paragraph?.parentElement?.tagName).toBe("LI");
      expect(listItem?.parentElement?.tagName).toBe("UL");
    });

    it("handles mixed content types", () => {
      const content: Node[] = [
        { type: "text", text: "Plain text" },
        {
          type: "paragraph",
          children: [{ type: "text", text: "Paragraph text" }],
        },
        {
          type: "list",
          format: "unordered",
          children: [
            {
              type: "list-item",
              children: [{ type: "text", text: "List item" }],
            },
          ],
        },
      ];

      const { container } = render(<BlocksRenderer content={content} />);

      // Check that all text content is present
      expect(container.textContent).toContain("Plain text");
      expect(container.textContent).toContain("Paragraph text");
      expect(container.textContent).toContain("List item");

      // Check that elements are created correctly
      const paragraph = container.querySelector("p");
      expect(paragraph).toBeInTheDocument();
      expect(paragraph?.textContent).toBe("Paragraph text");

      const listItem = container.querySelector("li");
      expect(listItem).toBeInTheDocument();
      expect(listItem?.textContent).toBe("List item");
    });
  });

  describe("Modifiers", () => {
    it("applies modifier when condition is met", () => {
      const CustomComponent = ({ node }: { node: Node }) => (
        <div data-testid="custom-component">Custom: {node.text}</div>
      );

      const content: Node[] = [
        { type: "text", text: "Normal text" },
        { type: "text", text: "Underlined text", underline: true },
      ];

      const modifiers = {
        underline: CustomComponent,
      };

      render(<BlocksRenderer content={content} modifiers={modifiers} />);

      expect(screen.getByText("Normal text")).toBeInTheDocument();
      expect(screen.getByTestId("custom-component")).toBeInTheDocument();
      expect(screen.getByText("Custom: Underlined text")).toBeInTheDocument();
    });

    it("does not apply modifier when condition is false", () => {
      const CustomComponent = ({ node }: { node: Node }) => (
        <div data-testid="custom-component">Custom: {node.text}</div>
      );

      const content: Node[] = [
        { type: "text", text: "Normal text", underline: false },
      ];

      const modifiers = {
        underline: CustomComponent,
      };

      render(<BlocksRenderer content={content} modifiers={modifiers} />);

      expect(screen.getByText("Normal text")).toBeInTheDocument();
      expect(screen.queryByTestId("custom-component")).not.toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("handles empty content array", () => {
      const content: Node[] = [];

      const { container } = render(<BlocksRenderer content={content} />);

      expect(container.firstChild).toBeNull();
    });

    it("handles node without children or text", () => {
      const content: Node[] = [{ type: "paragraph" }];

      const { container } = render(<BlocksRenderer content={content} />);

      // Node without children returns node.text (undefined), which renders as empty
      expect(container.textContent).toBe("");
    });

    it("handles node with empty children array", () => {
      const content: Node[] = [
        {
          type: "paragraph",
          children: [],
        },
      ];

      const { container } = render(<BlocksRenderer content={content} />);

      const paragraph = container.querySelector("p");
      expect(paragraph).toBeInTheDocument();
      expect(paragraph?.textContent).toBe("");
    });

    it("handles text node with empty string", () => {
      const content: Node[] = [{ type: "text", text: "" }];

      const { container } = render(<BlocksRenderer content={content} />);

      expect(container.textContent).toBe("");
    });
  });
});
