import { describe, expect, it } from "vitest";
import { keyValueToMap, type Option } from "./keyValue";

describe("keyValueToMap", () => {
  it("should convert a list of options to a map", () => {
    const options: readonly Option[] = [
      { value: "1", label: "One" },
      { value: "2", label: "Two" },
      { value: "3", label: "Three" },
    ];
    const result = keyValueToMap(options);
    const expected = new Map([
      ["1", "One"],
      ["2", "Two"],
      ["3", "Three"],
    ]);
    expect(result).toEqual(expected);
  });
});
