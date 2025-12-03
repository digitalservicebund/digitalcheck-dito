import { expect, type Locator, type Page, test } from "@playwright/test";
import { extractRawText } from "mammoth";
import { documentationDocument } from "~/resources/content/documentation-document";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  ROUTE_DOCUMENTATION,
  ROUTE_DOCUMENTATION_NOTES,
  ROUTE_DOCUMENTATION_PARTICIPATION,
  ROUTE_DOCUMENTATION_SEND,
  ROUTE_DOCUMENTATION_SUMMARY,
  ROUTE_DOCUMENTATION_TITLE,
} from "~/resources/staticRoutes";

const testData = {
  title: "E2E Titel des Regelungsvorhabens",
  participationFormats: "E2E Formate Input",
  participationResults: "E2E Ergebnisse Input",
  principle1Paragraph: "123",
  principle1Reason: "E2E Begründung Prinzip 1",
  principle2Paragraph: "456",
  principle2Reason: "E2E Begründung Prinzip 2",
  principle3Paragraph: "234",
  principle3Reason: "E2E Begründung Prinzip 3",
  customParagraph: "789",
  customReason: "E2E Eigene Erklärung 1",
  customParagraph2: "1011",
  customReason2: "E2E Eigene Erklärung 2",
  negativeReason: "E2E Negative Begründung",
  irrelevantReason: "E2E Nicht relevant Begründung",
};

async function downloadDocumentAndGetText(
  page: Page,
  button: Locator,
  filePath: string,
) {
  const downloadPromise = page.waitForEvent("download");
  await button.click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe(
    "Dokumentation_der_Digitaltauglichkeit_V2.docx",
  );

  await download.saveAs(filePath);
  const { value: docText } = await extractRawText({ path: filePath });
  return docText;
}

function expectStringsOrderedInText(
  text: string,
  expectedStringsOrdered: string[],
  notExpectedStrings: string[],
) {
  // Validate that strings appear in the document in the right order
  let expectedLastIdx = -1;
  for (const expectedText of expectedStringsOrdered) {
    const searchIdx = text.indexOf(expectedText, expectedLastIdx + 1);
    expect(searchIdx, expectedText).toBeGreaterThan(expectedLastIdx);
    expectedLastIdx = searchIdx;
  }

  for (const notExpectedText of notExpectedStrings) {
    const searchIdx = text.indexOf(notExpectedText);
    expect(searchIdx, notExpectedText).toBe(-1);
  }
}

function expectDocumentToNotContainTags(text: string) {
  const tagsIdx = /{{}}/g.exec(text);
  expect(tagsIdx).toBeNull();
}

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
  });

  test("see the notice, confirm, and continue", async () => {
    await expect(page).toHaveURL(ROUTE_DOCUMENTATION_NOTES.url);
    await expect(
      page.getByRole("heading", { name: "Wichtige Hinweise" }),
    ).toBeVisible();
    const continueButton = page.getByRole("button", { name: "Weiter" });
    await expect(continueButton).toBeDisabled();

    await page.getByRole("checkbox", { name: "gelesen", exact: false }).check();
    await expect(continueButton).toBeEnabled();
    await continueButton.click();
  });

  test("fill title page and navigate to participation", async () => {
    await expect(page).toHaveURL(ROUTE_DOCUMENTATION_TITLE.url);
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
    await page.getByLabel("Ja, gänzlich oder teilweise").check();

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

    // Fill custom aspect inputs - need to target the last occurrence
    const paragraphInputs = form.getByLabel("Paragrafen");
    const reasonInputs = form.getByLabel(
      "Begründung mit Textreferenz (empfohlen für bessere Zuordnung)",
    );
    await paragraphInputs.last().fill(testData.customParagraph);
    await reasonInputs.last().fill(testData.customReason);
  });

  // eslint-disable-next-line playwright/expect-expect
  test("download draft documentation from principle page", async ({}, testInfo) => {
    const docText = await downloadDocumentAndGetText(
      page,
      page.getByRole("button", { name: "Zwischenstand herunterladen (.docx)" }),
      testInfo.outputPath("documentation.docx"),
    );
    expectStringsOrderedInText(
      docText,
      [
        "Titel Ihres Regelungsvorhaben",
        testData.title,
        "Auswirkungen auf Betroffene",
        testData.participationFormats,
        testData.participationResults,
        "digitale Angebote",
        "Ja, gänzlich oder teilweise",
        "Ermöglichen Sie digitale Kommunikation",
        "Paragrafen",
        documentationDocument.placeholderOptional,
        "Erläuterung",
        documentationDocument.placeholderOptional,
        "Formulieren Sie die Regelung technologieoffen",
        "Paragrafen",
        testData.principle2Paragraph,
        "Erläuterung",
        testData.principle2Reason,
        "Denken Sie an Antragsstellung, Bearbeitung und Bescheid",
        "Paragrafen",
        documentationDocument.placeholderOptional,
        "Erläuterung",
        documentationDocument.placeholderOptional,
        "Eigener Punkt",
        "Paragrafen",
        testData.customParagraph,
        "Erläuterung",
        testData.customReason,
        "Datenwiederverwendung",
      ],
      [
        testData.principle1Paragraph,
        testData.principle1Reason,
        testData.negativeReason,
        testData.irrelevantReason,
      ],
    );
    expectDocumentToNotContainTags(docText);

    await page.getByRole("button", { name: "Weiter" }).click();
  });

  test("handle negative principle answer", async () => {
    await page.getByRole("radio", { name: "Nein" }).check();
    // Validate textarea is shown
    const form = page.locator("form");
    const textarea = form.getByLabel("Begründung");
    await expect(textarea).toBeVisible();
    await textarea.fill(testData.negativeReason);

    await page.getByRole("button", { name: "Weiter" }).click();
  });

  test("handle irrelevant principle answer and skip principle Automation", async () => {
    await page.getByLabel("Nicht relevant").check();

    // Validate textarea is shown
    const form = page.locator("form");
    const textarea = form.getByLabel("Begründung");
    await expect(textarea).toBeVisible();
    await textarea.fill(testData.irrelevantReason);

    await page.getByRole("button", { name: "Weiter" }).click();
    await page
      .getByRole("heading", { level: 1, name: "Automatisierung" })
      .waitFor();
    await page.getByRole("button", { name: "Weiter" }).click();
  });

  test("handle aspect and multiple own explanations on last principle", async () => {
    await page
      .getByRole("radio", { name: "Ja, gänzlich oder teilweise" })
      .check();

    const form = page.locator("form");

    // Check last aspect
    const checkboxes = form.getByRole("checkbox");
    await checkboxes.last().check();
    const paragraphInputs = form.getByLabel("Paragrafen");
    const reasonInputs = form.getByLabel(
      "Begründung mit Textreferenz (empfohlen für bessere Zuordnung)",
    );
    await expect(paragraphInputs).toBeVisible();
    await paragraphInputs.fill(testData.principle3Paragraph);
    await reasonInputs.fill(testData.principle3Reason);

    // Add custom aspect
    await page
      .getByRole("button", { name: "Eigene Erklärung hinzufügen" })
      .click();

    // Fill custom aspect inputs - need to target the last occurrence
    await paragraphInputs.last().fill(testData.customParagraph);
    await reasonInputs.last().fill(testData.customReason);

    // Add another custom aspect
    await page
      .getByRole("button", { name: "Eigene Erklärung hinzufügen" })
      .click();
    await paragraphInputs.last().fill(testData.customParagraph2);
    await reasonInputs.last().fill(testData.customReason2);
  });

  test("navigate to summary", async () => {
    await page.getByRole("button", { name: "Weiter" }).click();
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

  test("download documentation from absenden page", async ({}, testInfo) => {
    await expect(page).toHaveURL(ROUTE_DOCUMENTATION_SEND.url);

    const docText = await downloadDocumentAndGetText(
      page,
      page.getByRole("button", { name: "Word-Datei herunterladen (.docx)" }),
      testInfo.outputPath("documentation.docx"),
    );
    expectStringsOrderedInText(
      docText,
      [
        "Titel Ihres Regelungsvorhaben",
        testData.title,
        "Auswirkungen auf Betroffene",
        testData.participationFormats,
        testData.participationResults,
        "Digitale Angebote",
        "Ja, gänzlich oder teilweise",
        "Ermöglichen Sie digitale Kommunikation",
        "Paragrafen",
        documentationDocument.placeholderOptional,
        "Erläuterung",
        documentationDocument.placeholderOptional,
        "Formulieren Sie die Regelung technologieoffen",
        "Paragrafen",
        testData.principle2Paragraph,
        "Erläuterung",
        testData.principle2Reason,
        "Eigener Punkt",
        "Paragrafen",
        testData.customParagraph,
        "Erläuterung",
        testData.customReason,
        "Datenwiederverwendung",
        "Nein",
        testData.negativeReason,
        "Etablierte Technologien",
        "Nicht relevant",
        testData.irrelevantReason,
        "Automatisierung",
        "Datenschutz",
        "Stellen Sie den Datenschutz sicher",
        "Paragrafen",
        documentationDocument.placeholderOptional,
        "Erläuterung",
        documentationDocument.placeholderOptional,
        "Gewährleisten Sie die Informationssicherheit",
        "Paragrafen",
        testData.principle3Paragraph,
        "Erläuterung",
        testData.principle3Reason,
        "Eigener Punkt",
        "Paragrafen",
        testData.customParagraph,
        "Erläuterung",
        testData.customReason,
        "Eigener Punkt",
        "Paragrafen",
        testData.customParagraph2,
        "Erläuterung",
        testData.customReason2,
        "Das ist jetzt zu tun",
      ],
      [],
    );
    expectDocumentToNotContainTags(docText);
  });

  test("go to landing page and download empty document template", async ({}, testInfo) => {
    await page.goto(ROUTE_DOCUMENTATION.url);

    const docText = await downloadDocumentAndGetText(
      page,
      page.getByRole("link", { name: "Word-Vorlage herunterladen (.docx)" }),
      testInfo.outputPath("documentation.docx"),
    );
    expectStringsOrderedInText(
      docText,
      [
        "Titel Ihres Regelungsvorhaben",
        documentationDocument.placeholder,
        "Auswirkungen auf Betroffene",
        documentationDocument.placeholder,
        documentationDocument.placeholder,
        "Digitale Angebote",
        "Ja, gänzlich oder teilweise | Nein | Nicht relevant",
        "Ermöglichen Sie digitale Kommunikation",
        "Paragrafen",
        documentationDocument.placeholderOptional,
        "Erläuterung",
        documentationDocument.placeholderOptional,
        "Formulieren Sie die Regelung technologieoffen",
        "Paragrafen",
        documentationDocument.placeholderOptional,
        "Erläuterung",
        documentationDocument.placeholderOptional,
      ],
      [
        testData.title,
        testData.participationFormats,
        testData.participationResults,
        testData.principle2Paragraph,
        testData.principle2Reason,
        testData.customParagraph,
        testData.customReason,
        testData.negativeReason,
        testData.irrelevantReason,
      ],
    );
    expectDocumentToNotContainTags(docText);
  });
});

test.describe("with partial documentation started", () => {
  async function expectAndSkipNotice(page: Page) {
    await page.waitForURL(ROUTE_DOCUMENTATION_NOTES.url);
    await expect(
      page.getByRole("heading", { name: "Wichtige Hinweise" }),
    ).toBeVisible();
    await page.getByRole("checkbox", { name: "gelesen", exact: false }).check();
    await page.getByRole("button", { name: "Weiter" }).click();
  }

  test.beforeEach(async ({ page }) => {
    await test.step("start documentation flow from landing page and skip the notice", async () => {
      await page.goto(ROUTE_DOCUMENTATION.url);
      await expect(page).toHaveURL(ROUTE_DOCUMENTATION.url);

      await page.getByRole("link", { name: "Dokumentation starten" }).click();

      await expectAndSkipNotice(page);
    });

    await test.step("fill the title", async () => {
      await page
        .getByLabel(digitalDocumentation.info.inputTitle.label)
        .fill(testData.title);
    });

    await test.step("go back to start page", async () => {
      await page.goBack();
      await expect(page).toHaveURL(ROUTE_DOCUMENTATION_NOTES.url);
      await page.goBack();
      await expect(page).toHaveURL(ROUTE_DOCUMENTATION.url);
    });
  });

  test("can resume", async ({ page }) => {
    await page
      .getByRole("link", {
        name: "Dokumentation fortsetzen",
      })
      .click();
    await page.waitForURL(ROUTE_DOCUMENTATION_TITLE.url);
    await expect(
      page.getByLabel(digitalDocumentation.info.inputTitle.label),
    ).toHaveValue(testData.title);
  });

  test("can start over", async ({ page }, testInfo) => {
    const startOverButton = page.getByRole("button", {
      name: "Neue Dokumentation beginnen",
    });

    async function openDialog() {
      await startOverButton.click();
      const dialog = page.getByRole("dialog");
      // `toBeVisible` does not work on the dialog even though it is visible visually
      await expect(dialog).toHaveAttribute("data-open");
      // assert visibility of heading instead
      await expect(dialog.getByRole("heading")).toBeVisible();
      return dialog;
    }

    await test.step("open start-over dialog but cancel", async () => {
      const dialog = await openDialog();
      await dialog.getByRole("button", { name: "Abbrechen" }).click();
      expect(page.url().endsWith(ROUTE_DOCUMENTATION.url)).toBe(true); // unchanged
      await expect(dialog).toBeHidden();
    });

    await test.step("open start-over dialog and download draft", async () => {
      await openDialog();

      const docText = await downloadDocumentAndGetText(
        page,
        page.getByRole("button", {
          name: "Zwischenstand herunterladen (.docx)",
        }),
        testInfo.outputPath("documentation.docx"),
      );
      expectStringsOrderedInText(
        docText,
        ["Titel Ihres Regelungsvorhaben", testData.title],
        [],
      );
    });

    await test.step("confirm start over", async () => {
      const dialog = page.getByRole("dialog");
      await dialog.getByRole("button", { name: "Neu beginnen" }).click();

      await expectAndSkipNotice(page);

      await page.waitForURL(ROUTE_DOCUMENTATION_TITLE.url);

      await expect(
        page.getByLabel(digitalDocumentation.info.inputTitle.label),
      ).toBeEmpty();
    });
  });
});
