import { documentationDocument } from "@/resources/content/documentation-document";
import { type Page, test } from "@playwright/test";

import {
  assistent_dokumentation,
  assistent_dokumentation_abschliessen,
  assistent_dokumentation_beteiligungsformate,
  assistent_dokumentation_euInteroperabilitaet,
  assistent_dokumentation_regelungsvorhaben,
  assistent_dokumentation_zusammenfassung,
  dokumentation,
} from "@/config/routes";
import {
  clickNext,
  downloadDocumentAndGetText,
  expect,
  expectDocumentToNotContainTags,
  waitForHydration,
} from "./helpers";

const testData = {
  title: "E2E Titel des Regelungsvorhabens",
  organization: "E2E Organisation",
  participationFormats: "E2E Formate Input",
  participationResults: "E2E Ergebnisse Input",
  positiveReasoning: "E2E Erklärung positiv",
  negativeReasoning: "E2E Erklärung negativ",
  irrelevantReasoning: "E2E Erklärung nicht relevant",
  skippedPrincipleReasoning: "E2E Erklärung nachgetragen",
  lastPrincipleReasoning: "E2E Erklärung letztes Prinzip",
};

const fileName = "Dokumentation_der_Digitaltauglichkeit.docx";

async function expectPrinzipPage(page: Page, order: number) {
  await expect(
    page.getByText(`Prinzip ${order}`, { exact: true }),
  ).toBeVisible();
  await waitForHydration(page);
}

async function selectSchwerpunkte(page: Page, count: number) {
  const group = page.getByRole("group", { name: "Schwerpunkte auswählen" });
  for (let i = 0; i < count; i++) {
    // the checkbox is visually hidden in its label, styled as a pill
    await group.locator("label").nth(i).click();
    await expect(group.getByRole("checkbox").nth(i)).toBeChecked();
  }
}

async function gotoStartPage(page: Page) {
  await page.goto(assistent_dokumentation.path);
  await waitForHydration(page);
}

async function startDocumentation(page: Page) {
  await gotoStartPage(page);
  await page.getByRole("link", { name: "Dokumentation starten" }).click();
  await page.waitForURL(assistent_dokumentation_regelungsvorhaben.path);
  await waitForHydration(page);
}

test("old documentation landing page redirects to the new one", async ({
  page,
}) => {
  await page.goto(dokumentation.path);
  await expect(page).toHaveURL(assistent_dokumentation.path);
});

test("documentation flow happy path", async ({ page }, testInfo) => {
  test.setTimeout(60_000);

  await test.step("start documentation flow from landing page", async () => {
    await startDocumentation(page);
  });

  await test.step("fill Regelungsvorhaben and navigate to Beteiligungsformate", async () => {
    await page.getByLabel("Titel des Regelungsvorhabens").fill(testData.title);
    await page
      .getByLabel("Ministerium / Organisation")
      .fill(testData.organization);
    await clickNext(page);
    await page.waitForURL(assistent_dokumentation_beteiligungsformate.path);
    await waitForHydration(page);
  });

  await test.step("fill Beteiligungsformate and navigate to first Prinzip", async () => {
    await page.getByLabel("Erklärung").fill(testData.participationFormats);
    await page.getByLabel("Erkenntnisse").fill(testData.participationResults);
    await clickNext(page);
    await expectPrinzipPage(page, 1);
  });

  await test.step("positive Prinzip — select Schwerpunkte and fill reasoning", async () => {
    // Schwerpunkte and reasoning are only shown once answered
    await expect(page.getByText("Schwerpunkte auswählen")).toBeHidden();
    await expect(page.getByLabel("Erklärung")).toBeHidden();

    await page.getByLabel("Ja, gänzlich oder teilweise").check();
    await selectSchwerpunkte(page, 1);
    await page.getByLabel("Erklärung").fill(testData.positiveReasoning);
  });

  await test.step("download draft documentation", async () => {
    const docText = await downloadDocumentAndGetText(
      page,
      page.getByRole("button", { name: "Zwischenstand herunterladen" }),
      testInfo.outputPath("documentation-draft.docx"),
      fileName,
    );
    expect(docText).toHaveStringsOrdered([
      testData.title,
      testData.organization,
      testData.participationFormats,
      testData.participationResults,
      "Digitale Angebote",
      "Ja, gänzlich oder teilweise",
      testData.positiveReasoning,
    ]);
    expectDocumentToNotContainTags(docText);

    await clickNext(page);
  });

  await test.step("negative Prinzip — answer and reasoning without Schwerpunkte", async () => {
    await expectPrinzipPage(page, 2);
    await page.getByRole("radio", { name: "Nein" }).check();
    await expect(page.getByText("Schwerpunkte auswählen")).toBeHidden();
    await page.getByLabel("Erklärung").fill(testData.negativeReasoning);
    await clickNext(page);
  });

  await test.step("irrelevant Prinzip — answer and reasoning without Schwerpunkte", async () => {
    await expectPrinzipPage(page, 3);
    await page.getByLabel("Nicht relevant").check();
    await expect(page.getByText("Schwerpunkte auswählen")).toBeHidden();
    await page.getByLabel("Erklärung").fill(testData.irrelevantReasoning);
    await clickNext(page);
  });

  await test.step("skip Prinzip without answering", async () => {
    await expectPrinzipPage(page, 4);
    await clickNext(page);
  });

  await test.step("last Prinzip — answer with several Schwerpunkte", async () => {
    await expectPrinzipPage(page, 5);
    await page
      .getByRole("radio", { name: "Ja, gänzlich oder teilweise" })
      .check();
    await selectSchwerpunkte(page, 2);
    await page.getByLabel("Erklärung").fill(testData.lastPrincipleReasoning);
    await clickNext(page);
  });

  await test.step("answer no EU-Bezug and navigate to Zusammenfassung", async () => {
    await page.waitForURL(assistent_dokumentation_euInteroperabilitaet.path);
    await waitForHydration(page);
    await page
      .getByRole("radio", { name: "Nein, es ist kein Bezug vorhanden." })
      .check();
    await clickNext(page);
    await page.waitForURL(assistent_dokumentation_zusammenfassung.path);
    await waitForHydration(page);
  });

  await test.step("Zusammenfassung shows entered data and stays locked while incomplete", async () => {
    const main = page.getByRole("main");
    await expect(main).toContainText(testData.title);
    await expect(main).toContainText(testData.positiveReasoning);
    await expect(main).toContainText(testData.negativeReasoning);
    await expect(main).toContainText(testData.irrelevantReasoning);
    await expect(main).toContainText(testData.lastPrincipleReasoning);
    // The skipped Prinzip is still missing
    await expect(main).toContainText(
      "Sie haben diesen Punkt noch nicht bearbeitet.",
    );

    // "Weiter" opens a modal while the Dokumentation is incomplete
    await main.getByRole("button", { name: "Weiter", exact: true }).click();
    const modal = page.getByRole("dialog");
    await expect(modal).toContainText("Dokumentation unvollständig");
    await modal
      .getByRole("button", { name: "Zurück zur Dokumentation" })
      .or(modal.getByRole("link", { name: "Zurück zur Dokumentation" }))
      .click();
    await expectPrinzipPage(page, 4);
  });

  await test.step("complete the skipped Prinzip and return to Zusammenfassung", async () => {
    await page.getByLabel("Nicht relevant").check();
    await page.getByLabel("Erklärung").fill(testData.skippedPrincipleReasoning);
    await page.goto(assistent_dokumentation_zusammenfassung.path);
    await waitForHydration(page);
    await expect(page.getByRole("main")).not.toContainText(
      "Sie haben diesen Punkt noch nicht bearbeitet.",
    );
    await clickNext(page);
    await expect(page).toHaveURL(assistent_dokumentation_abschliessen.path);
    await waitForHydration(page);
  });

  await test.step("download documentation from Abschließen page", async () => {
    const docText = await downloadDocumentAndGetText(
      page,
      page.getByRole("button", { name: "Word-Datei herunterladen (.docx)" }),
      testInfo.outputPath("documentation-final.docx"),
      fileName,
    );
    expect(docText).toHaveStringsOrdered([
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
      testData.skippedPrincipleReasoning,
      testData.lastPrincipleReasoning,
    ]);
    expectDocumentToNotContainTags(docText);
  });
});

test("go to landing page and download empty document template", async ({
  page,
}, testInfo) => {
  await gotoStartPage(page);

  const docText = await downloadDocumentAndGetText(
    page,
    page.getByRole("button", { name: "Word-Vorlage herunterladen (.docx)" }),
    testInfo.outputPath("documentation-template.docx"),
    fileName,
  );
  const expectedStrings = [
    "Titel Ihres Regelungsvorhabens",
    documentationDocument.placeholder,
    "Auswirkungen auf Betroffene",
    documentationDocument.placeholder,
    documentationDocument.placeholder,
    "Digitale Angebote",
    "Ja, gänzlich oder teilweise | Nein | Nicht relevant",
  ].filter((value): value is string => !!value);

  expect(docText).toHaveStringsOrdered(expectedStrings, [
    testData.title,
    testData.participationFormats,
    testData.participationResults,
    testData.positiveReasoning,
    testData.negativeReasoning,
    testData.irrelevantReasoning,
  ]);
  expectDocumentToNotContainTags(docText);
});

test("redirects to answer page when navigating directly to erläuterung without an answer", async ({
  page,
}) => {
  const principlePageUrl = `${dokumentation.path}/digitale-angebote-fuer-alle-nutzbar-gestalten`;

  await page.goto(`${principlePageUrl}/erlaeuterung`);
  await expect(page).toHaveURL(principlePageUrl);
});

test.describe("with partial documentation started", () => {
  test.beforeEach(async ({ page }) => {
    await test.step("start documentation flow and fill the title", async () => {
      await startDocumentation(page);
      await page
        .getByLabel("Titel des Regelungsvorhabens")
        .fill(testData.title);
    });

    await test.step("go back to start page", async () => {
      await gotoStartPage(page);
    });
  });

  test("can resume", async ({ page }) => {
    await page
      .getByRole("link", {
        name: "Dokumentation fortsetzen",
      })
      .click();
    await page.waitForURL(assistent_dokumentation_regelungsvorhaben.path);
    await waitForHydration(page);
    await expect(page.getByLabel("Titel des Regelungsvorhabens")).toHaveValue(
      testData.title,
    );
  });

  test("can start over", async ({ page }, testInfo) => {
    const startOverButton = page.getByRole("button", {
      name: "Neue Dokumentation starten",
    });
    const dialog = page.getByRole("dialog");

    await test.step("open start-over dialog but cancel", async () => {
      await startOverButton.click();
      await expect(dialog.getByRole("heading")).toBeVisible();
      await dialog.getByRole("button", { name: "Abbrechen" }).click();
      await expect(page).toHaveURL(assistent_dokumentation.path);
      await expect(dialog).toBeHidden();
    });

    await test.step("open start-over dialog and download draft", async () => {
      await startOverButton.click();
      await expect(dialog.getByRole("heading")).toBeVisible();
      await expect(dialog.locator("astro-island[ssr]")).toHaveCount(0);

      const docText = await downloadDocumentAndGetText(
        page,
        dialog.getByRole("button", {
          name: "Zwischenstand herunterladen (.docx)",
        }),
        testInfo.outputPath("documentation-draft.docx"),
        fileName,
      );
      expect(docText).toHaveStringsOrdered([
        "Titel Ihres Regelungsvorhabens",
        testData.title,
      ]);
    });

    await test.step("confirm start over", async () => {
      await dialog
        .getByRole("link", { name: "Neue Dokumentation starten" })
        .click();
      await page.waitForURL(assistent_dokumentation_regelungsvorhaben.path);
      await waitForHydration(page);
      await expect(page.getByLabel("Titel des Regelungsvorhabens")).toBeEmpty();
    });
  });
});
