import { expect, test } from "@playwright/test";
import { extractRawText } from "mammoth";
import { documentationDocument } from "~/resources/content/documentation-document";
import { digitalDocumentation } from "~/resources/content/dokumentation";
import {
  ROUTE_DOCUMENTATION_SEND,
  ROUTE_DOCUMENTATION_TITLE,
} from "~/resources/staticRoutes";

const { introduction, principle } = documentationDocument;

test.describe("documentation absenden page", () => {
  test("downloading filled documentation works", async ({ page }, testInfo) => {
    const titleValue = "E2E Titel des Regelungsvorhabens";
    const participationFormats = "E2E Formate Input";
    const participationResults = "E2E Ergebnisse Input";
    const yesAnswer = digitalDocumentation.principlePages.radioOptions[0];

    // Fill title
    await page.goto(ROUTE_DOCUMENTATION_TITLE.url);
    await page
      .getByLabel(digitalDocumentation.info.inputTitle.label)
      .fill(titleValue);
    await page.getByRole("button", { name: "Weiter" }).click();

    // Fill participation (two text areas labeled "Antwort")
    const answers = page.getByLabel("Antwort");
    await answers.nth(0).fill(participationFormats);
    await answers.nth(1).fill(participationResults);
    await page.getByRole("button", { name: "Weiter" }).click();

    // Answer first principle positively and fill one aspect
    await page.getByLabel(yesAnswer).click();
    const form = page.locator("form");
    await form.getByRole("checkbox").first().check();
    await form.getByLabel("Paragrafen").fill("123");
    await form
      .getByLabel(
        "Begründung mit Textreferenz (empfohlen für bessere Zuordnung)",
      )
      .fill("E2E Begründung 1");
    await page.getByRole("button", { name: "Weiter" }).click();

    // Answer second principle positively and fill one aspect
    await page.getByLabel(yesAnswer).click();
    const form2 = page.locator("form");
    await form2.getByRole("checkbox").first().check();
    await form2.getByLabel("Paragrafen").fill("456");
    await form2
      .getByLabel(
        "Begründung mit Textreferenz (empfohlen für bessere Zuordnung)",
      )
      .fill("E2E Begründung 2");
    await page.getByRole("button", { name: "Weiter" }).click();

    // Go to Absenden and download
    await page.goto(ROUTE_DOCUMENTATION_SEND.url);

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

    const parLabel = "Paragrafen";
    const explLabel = "Erläuterung";
    const yesOccurrences = [...docText.matchAll(new RegExp(yesAnswer, "g"))]
      .length;
    expect(yesOccurrences).toBe(2);

    // Check that texts occur in the right order
    const textOrder = [
      introduction.projectTitle.heading,
      titleValue,
      introduction.participationFormats.heading,
      participationFormats,
      participationResults,
      "Digitale Angebote",
      yesAnswer,
      parLabel,
      "§123",
      explLabel,
      "E2E Begründung 1",
      "Datenwiederverwendung",
      yesAnswer,
      parLabel,
      "§456",
      explLabel,
      "E2E Begründung 2",
      "Etablierte Technologien",
    ];
    let lastIdx = -1;
    for (const searchText of textOrder) {
      const searchIdx = docText.indexOf(searchText, lastIdx);
      expect(searchIdx).toBeGreaterThan(lastIdx);
      lastIdx = searchIdx;
    }
  });
});
