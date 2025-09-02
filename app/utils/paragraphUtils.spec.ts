import { describe, expect, it } from "vitest";
import { prependNumberToAbsatz } from "~/utils/paragraphUtils";
import { BaseAbsatz } from "./strapiData.server";

describe("prependNumberToAbsatz", () => {
  it("should prepend number to first text node in absatz", () => {
    const textNode1 = { type: "text" as const, text: "TEXT1" };
    const textNode2 = { type: "text" as const, text: "TEXT2" };
    const absatz: BaseAbsatz = {
      documentId: "abc-1",
      Nummer: 1,
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
          { type: "text", text: "(1) TEXT1" },
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
