import { describe, expect, it } from "vitest";
import { nestListInListItems } from "./blocksRendererUtils";

describe("nestListInListItems", () => {
  it("should nest lists within list items correctly", () => {
    const textNode = { type: "text", text: "TEXT" };
    const input = [
      {
        type: "paragraph",
        children: [textNode],
      },
      {
        type: "list",
        format: "ordered",
        children: [
          {
            type: "list-item",
            children: [textNode],
          },
          {
            type: "list",
            format: "ordered",
            children: [
              {
                type: "list-item",
                children: [textNode],
              },
            ],
          },
          {
            type: "list-item",
            children: [textNode],
          },
          {
            type: "list",
            format: "ordered",
            children: [
              {
                type: "list-item",
                children: [textNode],
              },
            ],
          },
        ],
      },
    ];

    const expected = [
      {
        type: "paragraph",
        children: [textNode],
      },
      {
        type: "list",
        format: "ordered",
        children: [
          {
            type: "list-item",
            children: [
              textNode,
              {
                type: "list",
                format: "ordered",
                children: [
                  {
                    type: "list-item",
                    children: [textNode],
                  },
                ],
              },
            ],
          },
          {
            type: "list-item",
            children: [
              textNode,
              {
                type: "list",
                format: "ordered",
                children: [
                  {
                    type: "list-item",
                    children: [textNode],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const result = nestListInListItems(input);
    expect(result).toEqual(expected);
  });

  it("should handle empty input array", () => {
    expect(nestListInListItems([])).toEqual([]);
  });

  it("should handle input with no nested lists", () => {
    const textNode = { type: "text", text: "TEXT" };
    const input = [
      {
        type: "paragraph",
        children: [textNode],
      },
      {
        type: "list",
        format: "ordered",
        children: [
          {
            type: "list-item",
            children: [textNode],
          },
          {
            type: "list-item",
            children: [textNode],
          },
        ],
      },
    ];

    const result = nestListInListItems(input);
    expect(result).toEqual(input);
  });
});
