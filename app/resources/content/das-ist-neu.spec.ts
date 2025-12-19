import { news } from "./das-ist-neu";

interface CustomMatchers<R> {
  toBeSortedDates(): R;
}
declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Assertion<T> extends CustomMatchers<T> {}
}
expect.extend({
  toBeSortedDates(dates: string[]) {
    const ok = dates.every((date, i, arr) => {
      if (i === 0) return true;
      const [d1, m1, y1] = date.split(".").map(Number);
      const [d2, m2, y2] = arr[i - 1].split(".").map(Number);
      const time1 = new Date(y1, m1 - 1, d1).getTime();
      const time2 = new Date(y2, m2 - 1, d2).getTime();
      return time1 <= time2;
    });
    if (ok) {
      return { pass: true, message: () => "" };
    } else {
      return {
        message: () => `expected ${JSON.stringify(dates)} to be sorted`,
        pass: false,
      };
    }
  },
});

describe("das-ist-neu", () => {
  it("contains dated items in descending order", () => {
    const dateStrings = news.items.map((item) => item.badge.text);

    expect(dateStrings).toBeSortedDates();
  });
});
