import { expect, type Page, test } from "@playwright/test";
import { extractRawText } from "mammoth";
import { documentationDocument } from "~/resources/content/documentation-document";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_SEND,
  ROUTE_DOCUMENTATION_SUMMARY,
  ROUTE_DOCUMENTATION_TITLE,
} from "~/resources/staticRoutes";

const { introduction } = documentationDocument;

const testData = {
  title: "E2E Titel des Regelungsvorhabens",
  participationFormats: "E2E Formate Input",
  participationResults: "E2E Ergebnisse Input",
  principle1Paragraph: "§123",
  principle1Reason: "E2E Begründung Prinzip 1",
  principle2Paragraph: "§456",
  principle2Reason: "E2E Begründung Prinzip 2",
  customParagraph: "§789",
  customReason: "E2E Eigene Erklärung",
  negativeReason: "E2E Negative Begründung",
  irrelevantReason: "E2E Nicht relevant Begründung",
};

test.describe("documentation flow happy path", () => {
  test.describe.configure({ mode: "serial" });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    if (page) {
      await page.close();
    }
  });

  test("start documentation flow from landing page", async () => {
    await page.goto(ROUTE_DOCUMENTATION.url);
    await expect(page).toHaveURL(ROUTE_DOCUMENTATION.url);

    await page.getByRole("link", { name: "Dokumentation starten" }).click();
    await expect(page).toHaveURL(ROUTE_DOCUMENTATION_TITLE.url);
  });

  test("fill title page and navigate to participation", async () => {
    await page
      .getByLabel(digitalDocumentation.info.inputTitle.label)
      .fill(testData.title);
    await page.getByRole("button", { name: "Weiter" }).click();

    await expect(page).toHaveURL(ROUTE_DOCUMENTATION_PARTICIPATION.url);
  });

  test("fill participation page and navigate to first principle", async () => {
    const textareas = page.getByLabel("Antwort");
    await textareas.nth(0).fill(testData.participationFormats);
    await textareas.nth(1).fill(testData.participationResults);
    await page.getByRole("button", { name: "Weiter" }).click();

    expect(page.url()).not.toBe(ROUTE_DOCUMENTATION_PARTICIPATION.url);
    await expect(page.locator("mark", { hasText: "Prinzipien" })).toBeVisible();
  });

  test("handle positive principle answer with aspect management", async () => {
    await page.getByLabel("Ja, gänzlich oder Teilweise").click();

    // Check that reasoning checkboxes are shown
    const form = page.locator("form");
    const checkboxes = form.getByRole("checkbox");
    await expect(checkboxes.first()).toBeVisible();

    // Check first aspect and fill inputs
    await checkboxes.first().check();
    await expect(form.getByLabel("Paragrafen")).toBeVisible();
    await form.getByLabel("Paragrafen").fill(testData.principle1Paragraph);
    await form
      .getByLabel(
        "Begründung mit Textreferenz (empfohlen für bessere Zuordnung)",
      )
      .fill(testData.principle1Reason);

    // Delete the reasoning
    await page
      .getByRole("button", { name: "Erläuterung löschen" })
      .first()
      .click();
    await page.getByRole("button", { name: "Löschen" }).click(); // confirm deletion in dialog

    // Validate checkbox is unchecked and inputs are hidden
    await expect(checkboxes.first()).not.toBeChecked();

    // Check second aspect
    await checkboxes.nth(1).check();
    await expect(form.getByLabel("Paragrafen")).toBeVisible();
    await form.getByLabel("Paragrafen").fill(testData.principle2Paragraph);
    await form
      .getByLabel(
        "Begründung mit Textreferenz (empfohlen für bessere Zuordnung)",
      )
      .fill(testData.principle2Reason);

    // Add custom aspect
    await page
      .getByRole("button", { name: "Eigene Erklärung hinzufügen" })
      .click();

    // Check custom aspect checkbox (label "Eigener Punkt" should now be available)
    await page.getByLabel("Eigener Punkt").check();

    // Fill custom aspect inputs - need to target the last occurrence
    const paragraphInputs = form.getByLabel("Paragrafen");
    const reasonInputs = form.getByLabel(
      "Begründung mit Textreferenz (empfohlen für bessere Zuordnung)",
    );
    await paragraphInputs.last().fill(testData.customParagraph);
    await reasonInputs.last().fill(testData.customReason);

    await page.getByRole("button", { name: "Weiter" }).click();
  });

  test("handle negative principle answer", async () => {
    await page.getByLabel("Nein").click();

    // Validate textarea is shown
    const form = page.locator("form");
    const textarea = form.getByLabel("Begründung");
    await expect(textarea).toBeVisible();
    await textarea.fill(testData.negativeReason);

    await page.getByRole("button", { name: "Weiter" }).click();
  });

  test("handle irrelevant principle answer and navigate to summary", async () => {
    await page.getByLabel("Nicht relevant").click();

    // Validate textarea is shown
    const form = page.locator("form");
    const textarea = form.getByLabel("Begründung");
    await expect(textarea).toBeVisible();
    await textarea.fill(testData.irrelevantReason);

    await page.getByRole("button", { name: "Weiter" }).click();

    // Continue through remaining 2 principles (4 and 5) to reach summary
    for (let i = 0; i < 2; i++) {
      await page.getByRole("button", { name: "Weiter" }).click();
    }

    await expect(page).toHaveURL(ROUTE_DOCUMENTATION_SUMMARY.url);
  });

  test("summary page shows entered data and navigate to absenden", async () => {
    await expect(page).toHaveURL(ROUTE_DOCUMENTATION_SUMMARY.url);

    const main = page.getByRole("main");
    await expect(main).toContainText(testData.title);
    await expect(main).toContainText(testData.customReason);
    await expect(main).toContainText(testData.negativeReason);
    await expect(main).toContainText(testData.irrelevantReason);

    const weiterButton = page.getByRole("link", { name: "Weiter" });
    await expect(weiterButton).toBeVisible({ timeout: 10000 });
    await weiterButton.click();
    await expect(page).toHaveURL(ROUTE_DOCUMENTATION_SEND.url);
  });

  test("download documentation from absenden page", async (_, testInfo) => {
    await expect(page).toHaveURL(ROUTE_DOCUMENTATION_SEND.url);

    const downloadPromise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "Word-Datei herunterladen (.docx)" })
      .click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe(
      "Dokumentation_der_Digitaltauglichkeit_V2.docx",
    );

    // Ensure answers appear (in the right position) in the downloaded file
    const filePath = testInfo.outputPath("documentation.docx");
    await download.saveAs(filePath);
    const { value: docText } = await extractRawText({ path: filePath });

    // Validate that key data appears in the document in the right order
    // TODO add some data to be validated once it is being included in the document
    const textOrder = [
      introduction.projectTitle.heading,
      testData.title,
      introduction.participationFormats.heading,
      testData.participationFormats,
      testData.participationResults,
      "Ja, gänzlich oder Teilweise",
      "Paragrafen",
      testData.principle2Paragraph,
      "Erläuterung",
      testData.principle2Reason,
      // TODO add "Paragrafen",
      // TODO add testData.customParagraph
      // TODO add "Erläuterung",
      // TODO add testData.customReason
      "Nein",
      // TODO add testData.negativeReason
      "Nicht relevant",
      // TODO add testData.irrelevantReason
    ];
    let lastIdx = -1;
    for (const searchText of textOrder) {
      const searchIdx = docText.indexOf(searchText, lastIdx);
      expect(searchIdx).toBeGreaterThan(lastIdx);
      lastIdx = searchIdx;
    }
  });
});
