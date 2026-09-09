import { describe, expect, it } from "vitest";
import { news } from "./das-ist-neu";

function toEpoch(date: string): number {
  const [d, m, y] = date.split(".").map(Number);
  return new Date(y, m - 1, d).getTime();
}

describe("das-ist-neu", () => {
  it("contains dated items in descending order", () => {
    const dateStrings = news.items
      .map((item) => item.badge?.text)
      .filter((text): text is string => text !== undefined);

    const sortedDescending = [...dateStrings].sort(
      (a, b) => toEpoch(b) - toEpoch(a),
    );
    expect(dateStrings).toEqual(sortedDescending);
  });
});
