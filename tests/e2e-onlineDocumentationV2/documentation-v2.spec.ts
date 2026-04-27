import { expect, type Locator, type Page, test } from "@playwright/test";
import { extractRawText } from "mammoth";
import { documentationDocument } from "~/resources/content/documentation-document";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  dokumentation,
  dokumentation_absenden,
  dokumentation_beteiligungsformate,
  dokumentation_hinweise,
  dokumentation_regelungsvorhabenTitel,
  dokumentation_zusammenfassung,
} from "@/config/routes";

const testData = {
  title: "E2E V2 Titel des Regelungsvorhabens",
  participationFormats: "E2E V2 Formate Input",
  participationResults: "E2E V2 Ergebnisse Input",
  positiveReasoning: "E2E V2 Erklärung positiv",
  negativeReasoning: "E2E V2 Erklärung negativ",
  irrelevantReasoning: "E2E V2 Erklärung nicht relevant",
  lastPrincipleReasoning: "E2E V2 Erklärung letztes Prinzip",
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
    "Dokumentation_der_Digitaltauglichkeit.docx",
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

test("documentation V2 flow happy path", async ({ page }, testInfo) => {
  test.setTimeout(60_000);

  await test.step("start documentation flow from landing page", async () => {
    await page.goto(dokumentation.path);
    await expect(page).toHaveURL(dokumentation.path);

    await page.getByRole("link", { name: "Dokumentation starten" }).click();
  });

  await test.step("see the notice, confirm, and continue", async () => {
    await expect(page).toHaveURL(dokumentation_hinweise.path);
    await expect(
      page.getByRole("heading", { name: "Wichtige Hinweise" }),
    ).toBeVisible();
    const continueButton = page.getByRole("button", { name: "Weiter" });
    await expect(continueButton).toBeDisabled();

    await page.getByRole("checkbox", { name: "gelesen", exact: false }).check();
    await expect(continueButton).toBeEnabled();
    await continueButton.click();
  });

  await test.step("fill title page and navigate to participation", async () => {
    await expect(page).toHaveURL(dokumentation_regelungsvorhabenTitel.path);
    await page
      .getByLabel(digitalDocumentation.info.inputTitle.label)
      .fill(testData.title);
    await page.getByRole("button", { name: "Weiter" }).click();

    await expect(page).toHaveURL(dokumentation_beteiligungsformate.path);
  });

  await test.step("fill participation page and navigate to first principle", async () => {
    await page.getByTestId("schritte").fill(testData.participationFormats);
    await page.getByTestId("erkenntnisse").fill(testData.participationResults);
    await page.getByRole("button", { name: "Weiter" }).click();

    // Should be on the first principle page
    await page
      .getByRole("heading", { level: 2, name: /Schafft das Regelungsvorhaben/ })
      .waitFor();
    expect(page.url()).not.toContain(dokumentation_beteiligungsformate.path);
  });

  await test.step("positive principle answer page — select answer only", async () => {
    // V2: answer page only shows radio buttons, no aspects or reasoning
    await page.getByLabel("Ja, gänzlich oder teilweise").check();

    // Verify V2 simplification: no aspect-related inputs on answer page
    await expect(page.getByText("Schwerpunkte auswählen")).toBeHidden();
    await expect(page.getByLabel("Erklärung")).toBeHidden();

    await page.getByRole("button", { name: "Weiter" }).click();
  });

  await test.step("positive principle erläuterung page — select aspects and fill reasoning", async () => {
    // Should be on the erlaeuterung sub-page
    await page.waitForURL(/\/erlaeuterung$/, { timeout: 5000 });

    // Verify confirmation text for positive answer
    await expect(
      page.getByText(
        "Sie haben angegeben, dass das Prinzip auf ihr Vorhaben zutrifft.",
      ),
    ).toBeVisible();

    // Verify "Angaben ändern" link
    await expect(
      page.getByRole("link", { name: "Angaben ändern" }),
    ).toBeVisible();

    // Verify aspect pills are visible
    await expect(page.getByText("Schwerpunkte auswählen")).toBeVisible();

    // Toggle some aspect pills (buttons with aria-pressed)
    const aspectButtons = page.locator("button[aria-pressed]");
    const firstAspect = aspectButtons.first();
    await firstAspect.click();
    await expect(firstAspect).toHaveAttribute("aria-pressed", "true");

    // Fill reasoning textarea
    await page.getByLabel("Erklärung").fill(testData.positiveReasoning);
  });

  await test.step("download draft documentation from erläuterung page", async () => {
    const docText = await downloadDocumentAndGetText(
      page,
      page.getByRole("button", { name: "Zwischenstand herunterladen (.docx)" }),
      testInfo.outputPath("documentation-v2-draft.docx"),
    );
    expectStringsOrderedInText(
      docText,
      [
        testData.title,
        testData.participationFormats,
        testData.participationResults,
        "Digitale Angebote",
        "Ja, gänzlich oder teilweise",
        testData.positiveReasoning,
      ],
      [],
    );
    expectDocumentToNotContainTags(docText);

    await page.getByRole("button", { name: "Weiter" }).click();
  });

  await test.step("negative principle — answer and erläuterung", async () => {
    // Wait for next principle answer page
    await page
      .getByRole("heading", { level: 2, name: /Schafft das Regelungsvorhaben/ })
      .waitFor();

    await page.getByRole("radio", { name: "Nein" }).check();
    // Wait for navigation context to update after answer is saved
    await page.getByRole("button", { name: "Weiter" }).click();
    await page.waitForURL(/\/erlaeuterung$/, { timeout: 5000 });

    // Verify negative confirmation text
    await expect(
      page.getByText(
        "Sie haben angegeben, dass das Prinzip nicht auf ihr Vorhaben zutrifft.",
      ),
    ).toBeVisible();

    // No aspect pills for negative answer
    await expect(page.getByText("Schwerpunkte auswählen")).toBeHidden();

    // Fill reasoning
    await page.getByLabel("Erklärung").fill(testData.negativeReasoning);
    await page.getByRole("button", { name: "Weiter" }).click();
  });

  await test.step("irrelevant principle — answer and erläuterung", async () => {
    await page
      .getByRole("heading", { level: 2, name: /Schafft das Regelungsvorhaben/ })
      .waitFor();

    await page.getByLabel("Nicht relevant").check();
    await page.getByRole("button", { name: "Weiter" }).click();
    await page.waitForURL(/\/erlaeuterung$/, { timeout: 5000 });

    // Verify irrelevant confirmation text
    await expect(
      page.getByText(
        "Sie haben angegeben, dass das Prinzip nicht relevant für Ihr Vorhaben ist.",
      ),
    ).toBeVisible();

    // No aspect pills for irrelevant answer
    await expect(page.getByText("Schwerpunkte auswählen")).toBeHidden();

    // Fill reasoning
    await page.getByLabel("Erklärung").fill(testData.irrelevantReasoning);
    await page.getByRole("button", { name: "Weiter" }).click();
  });

  await test.step("skip principle without answering", async () => {
    // V2 uses warningInsteadOfError, so Weiter navigates even without answer
    await page
      .getByRole("heading", { level: 2, name: /Schafft das Regelungsvorhaben/ })
      .waitFor();

    await page.getByRole("button", { name: "Weiter" }).click();
  });

  await test.step("last principle — answer and erläuterung with aspects", async () => {
    await page
      .getByRole("heading", { level: 2, name: /Schafft das Regelungsvorhaben/ })
      .waitFor();

    await page
      .getByRole("radio", { name: "Ja, gänzlich oder teilweise" })
      .check();
    await page.getByRole("button", { name: "Weiter" }).click();
    await page.waitForURL(/\/erlaeuterung$/, { timeout: 5000 });

    // Select multiple aspect pills
    const aspectButtons = page.locator("button[aria-pressed]");
    const count = await aspectButtons.count();
    for (let i = 0; i < Math.min(count, 2); i++) {
      await aspectButtons.nth(i).click();
    }

    // Fill reasoning
    await page.getByLabel("Erklärung").fill(testData.lastPrincipleReasoning);
    await page.getByRole("button", { name: "Weiter" }).click();
  });

  await test.step("navigate to summary", async () => {
    await expect(page).toHaveURL(dokumentation_zusammenfassung.path);
  });

  await test.step("summary page shows entered data and navigate to absenden", async () => {
    const main = page.getByRole("main");
    await expect(main).toContainText(testData.title);
    await expect(main).toContainText(testData.positiveReasoning);
    await expect(main).toContainText(testData.lastPrincipleReasoning);
    await expect(main).toContainText(testData.negativeReasoning);
    await expect(main).toContainText(testData.irrelevantReasoning);
    // Skipped principle (no answer) still shows the "missing" warning
    await expect(main).toContainText(
      "Sie haben diesen Punkt noch nicht bearbeitet.",
    );

    const weiterButton = page.getByRole("link", { name: "Weiter" });
    await expect(weiterButton).toBeVisible({ timeout: 10000 });
    await weiterButton.click();
    await expect(page).toHaveURL(dokumentation_absenden.path);
  });

  await test.step("download documentation from absenden page", async () => {
    await expect(page).toHaveURL(dokumentation_absenden.path);

    const docText = await downloadDocumentAndGetText(
      page,
      page.getByRole("button", { name: "Word-Datei herunterladen (.docx)" }),
      testInfo.outputPath("documentation-v2-final.docx"),
    );
    expectStringsOrderedInText(
      docText,
      [
        testData.title,
        testData.participationFormats,
        testData.participationResults,
        "Digitale Angebote",
        "Ja, gänzlich oder teilweise",
        testData.positiveReasoning,
        "Nein",
        testData.negativeReasoning,
        "Nicht relevant",
        testData.irrelevantReasoning,
        testData.lastPrincipleReasoning,
      ],
      [],
    );
    expectDocumentToNotContainTags(docText);
  });
});

test("go to landing page and download empty V2 document template", async ({
  page,
}, testInfo) => {
  await page.goto(dokumentation.path);

  const docText = await downloadDocumentAndGetText(
    page,
    page.getByRole("link", { name: "Word-Vorlage herunterladen (.docx)" }),
    testInfo.outputPath("documentation-v2-template.docx"),
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
    ],
    [
      testData.title,
      testData.participationFormats,
      testData.participationResults,
      testData.positiveReasoning,
      testData.negativeReasoning,
      testData.irrelevantReasoning,
    ],
  );
  expectDocumentToNotContainTags(docText);
});

async function expectAndSkipNotice(page: Page) {
  await page.waitForURL(dokumentation_hinweise.path);
  await expect(
    page.getByRole("heading", { name: "Wichtige Hinweise" }),
  ).toBeVisible();
  await page.getByRole("checkbox", { name: "gelesen", exact: false }).check();
  await page.getByRole("button", { name: "Weiter" }).click();
}

test.describe("with partial documentation started", () => {
  test.beforeEach(async ({ page }) => {
    await test.step("start documentation flow from landing page and skip the notice", async () => {
      await page.goto(dokumentation.path);
      await expect(page).toHaveURL(dokumentation.path);

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
      await expect(page).toHaveURL(dokumentation_hinweise.path);
      await page.goBack();
      await expect(page).toHaveURL(dokumentation.path);
    });
  });

  test("can resume", async ({ page }) => {
    await page
      .getByRole("link", {
        name: "Dokumentation fortsetzen",
      })
      .click();
    await page.waitForURL(dokumentation_regelungsvorhabenTitel.path);
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
      expect(page.url().endsWith(dokumentation.path)).toBe(true);
      await expect(dialog).toBeHidden();
    });

    await test.step("open start-over dialog and download draft", async () => {
      await openDialog();

      const docText = await downloadDocumentAndGetText(
        page,
        page.getByRole("button", {
          name: "Zwischenstand herunterladen (.docx)",
        }),
        testInfo.outputPath("documentation-v2-draft.docx"),
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

      await page.waitForURL(dokumentation_regelungsvorhabenTitel.path);

      await expect(
        page.getByLabel(digitalDocumentation.info.inputTitle.label),
      ).toBeEmpty();
    });
  });
});
