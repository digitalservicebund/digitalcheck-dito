import { describe, expect, it } from "vitest";
import {
  AbsatzWithNumber,
  prependNumberToAbsatz,
} from "~/utils/paragraphUtils";

describe("prependNumberToAbsatz", () => {
  it("should prepend number to first text node in absatz", () => {
    const textNode1 = { type: "text" as const, text: "TEXT1" };
    const textNode2 = { type: "text" as const, text: "TEXT2" };
    const absatz: AbsatzWithNumber = {
      id: 1,
      number: 42,
      Text: [
        {
          type: "paragraph",
          children: [textNode1, textNode2],
        },
        {
          type: "paragraph",
          children: [textNode1, textNode2],
        },
      ],
      PrinzipErfuellungen: [],
    };

    const result = prependNumberToAbsatz(absatz);
    expect(result).toEqual([
      {
        type: "paragraph",
        children: [
          { type: "text", text: "(42) TEXT1" },
          { type: "text", text: "TEXT2" },
        ],
      },
      {
        type: "paragraph",
        children: [
          { type: "text", text: "TEXT1" },
          { type: "text", text: "TEXT2" },
        ],
      },
    ]);
  });
});
