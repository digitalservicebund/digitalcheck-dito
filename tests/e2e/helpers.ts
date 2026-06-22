import { dokumentation_hinweise } from "@/config/routes.ts";
import {
  expect as baseExpect,
  type Locator,
  type Page,
} from "@playwright/test";
import { extractRawText } from "mammoth";

declare module "@playwright/test" {
  interface Matchers<R> {
    toHaveStringsOrdered(
      expectedStringsOrdered: string[],
      notExpectedStrings?: string[],
    ): R;
  }
}

// Helper function to extract a readable snippet around an index
const getContextSnippet = (text: string, idx: number, length: number = 0) => {
  const padding = 40; // Number of characters to show before and after
  const start = Math.max(0, idx - padding);
  const end = Math.min(text.length, idx + length + padding);

  let snippet = text.slice(start, end).replaceAll("\n", String.raw`\n`); // Escape newlines for readability

  // Add visual ellipsis if truncated
  if (start > 0) snippet = "..." + snippet;
  if (end < text.length) snippet = snippet + "...";

  return snippet;
};

export const expect = baseExpect.extend({
  toHaveStringsOrdered(
    text: string,
    expectedStringsOrdered: string[],
    notExpectedStrings: string[] = [],
  ) {
    let expectedLastIdx = -1;
    for (const expectedText of expectedStringsOrdered) {
      const searchIdx = text.indexOf(expectedText, expectedLastIdx + 1);
      if (searchIdx <= expectedLastIdx) {
        // Fallback to searching from 0 just to find where it actually is (if it exists at all)
        const absoluteIdx = text.indexOf(expectedText);
        const contextIdx =
          absoluteIdx === -1 ? Math.max(0, expectedLastIdx) : absoluteIdx;

        return {
          pass: false,
          message: () =>
            `Expected string "${expectedText}" not found in correct order.\n` +
            `Last found match ended around index: ${expectedLastIdx}\n` +
            `Context: "${getContextSnippet(text, contextIdx, expectedText.length)}"`,
        };
      }
      expectedLastIdx = searchIdx;
    }

    for (const notExpectedText of notExpectedStrings) {
      const searchIdx = text.indexOf(notExpectedText);
      if (searchIdx !== -1) {
        return {
          pass: false,
          message: () =>
            `String "${notExpectedText}" should not be present in text.\n` +
            `Context: "${getContextSnippet(text, searchIdx, notExpectedText.length)}"`,
        };
      }
    }

    return {
      pass: true,
      message: () => "Strings are ordered as expected",
    };
  },
});

/**
 * Wait until all SSR Astro islands on the page have hydrated.
 * Astro removes the `ssr` attribute from `<astro-island>` after hydration.
 * Use before interacting with controlled inputs or React-only handlers.
 */
export async function waitForHydration(page: Page) {
  await page.waitForFunction(
    () => document.querySelectorAll("astro-island[ssr]").length === 0,
  );
}
export async function downloadDocumentAndGetText(
  page: Page,
  button: Locator,
  filePath: string,
  expectedSuggestedFilename: string,
) {
  const downloadPromise = page.waitForEvent("download");
  await button.click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe(expectedSuggestedFilename);

  await download.saveAs(filePath);
  const { value: docText } = await extractRawText({ path: filePath });
  return docText;
}

export function expectDocumentToNotContainTags(text: string) {
  const tagsIdx = /{{}}/g.exec(text);
  expect(tagsIdx).toBeNull();
}

export async function expectAndSkipNotice(page: Page) {
  await page.waitForURL(dokumentation_hinweise.path);
  await waitForHydration(page);
  await expect(
    page.getByRole("heading", { name: "Wichtige Hinweise" }),
  ).toBeVisible();
  await page.getByRole("checkbox", { name: "gelesen", exact: false }).check();
  await page.getByRole("button", { name: "Weiter" }).click();
}

export async function clickNext(page: Page) {
  await page
    .getByRole("link", { name: "Weiter" })
    .or(page.getByRole("button", { name: "Weiter" })) // form submit button
    .click();
}

export async function skipUntil(
  page: Page,
  wantedUrl: string,
  options: { name: string; groupName?: string },
): Promise<void> {
  if (await page.getByTestId("stepper").isVisible()) {
    // use mobile navigation buttons, click next repeatedly
    let previousUrl = page.url();
    while (!page.url().includes(wantedUrl)) {
      await clickNext(page);
      await page.waitForURL((url) => url.href !== previousUrl, {
        timeout: 5_000,
      });
      previousUrl = page.url();
      await waitForHydration(page);
    }
  } else {
    // navigate directly
    if (options.groupName) {
      await page.getByRole("button", { name: options.groupName }).click();
    }
    await page.getByRole("link", { name: options.name }).click();
    await expect(page).toHaveURL(wantedUrl);
  }
}
