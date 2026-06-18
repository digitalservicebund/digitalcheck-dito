import { dokumentation_hinweise } from "@/config/routes.ts";
import { expect, type Locator, type Page } from "@playwright/test";
import { extractRawText } from "mammoth";

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

export function expectStringsOrderedInText(
  text: string,
  expectedStringsOrdered: string[],
  notExpectedStrings: string[],
) {
  let expectedLastIdx = -1;
  for (const expectedText of expectedStringsOrdered) {
    const searchIdx = text.indexOf(expectedText, expectedLastIdx + 1);
    expect(
      searchIdx,
      `Expected string "${expectedText}" not found after position ${expectedLastIdx}`,
    ).toBeGreaterThan(expectedLastIdx);
    expectedLastIdx = searchIdx;
  }

  for (const notExpectedText of notExpectedStrings) {
    const searchIdx = text.indexOf(notExpectedText);
    expect(
      searchIdx,
      `String "${notExpectedText}" should not be present in text`,
    ).toBe(-1);
  }
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
