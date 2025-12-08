import { expect, Page } from "@playwright/test";

export async function checkHeadingsForFlowContent(page: Page) {
  await expect(
    page.locator(
      "h1 div, h2 div, h3 div, h4 div, h5 div, h1 p, h2 p, h3 p, h4 p, h5 p",
    ),
    "flow content inside heading",
  ).not.toBeAttached();
}
