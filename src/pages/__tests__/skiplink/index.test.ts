import { describe, expect, it } from "vitest";

const pages = import.meta.glob<string>(
  ["/src/pages/**/*.{astro,mdx}", "/src/layouts/**/*.astro"],
  { query: "?raw", import: "default", eager: true },
);

const MAIN_TAG = /<main(?=[\s/>])[^>]*>/g;
const MAIN_ID = /\sid="main"/;

const pagesWithMain = Object.entries(pages).filter(([, source]) =>
  source.match(MAIN_TAG),
);

describe("<main> elements are skip link targets", () => {
  it("finds <main> elements in src/pages/ and src/layouts/", () => {
    expect(pagesWithMain.length).toBeGreaterThan(0);
  });

  it.each(pagesWithMain)('%s has one <main> with id="main"', (_, source) => {
    const mainTags = source.match(MAIN_TAG) ?? [];
    expect(mainTags).toContainEqual(expect.stringMatching(MAIN_ID));
    expect(
      source.match(new RegExp(MAIN_ID, "g")),
      'expected id="main" to be used only once',
    ).toHaveLength(1);
  });
});
