import { expect, type Locator, type Page, test } from "@playwright/test";
import { digitalDocumentation } from "~/resources/content/dokumentation";

import {
  dokumentation,
  dokumentation_absenden,
  dokumentation_bewertungOrganisatorisch,
  dokumentation_bewertungRechtlich,
  dokumentation_bewertungSemantisch,
  dokumentation_bewertungTechnisch,
  dokumentation_euInteroperabilitaetsbezug,
  dokumentation_regelungsvorhabenTitel,
  dokumentation_verbindlicheAnforderungen,
  dokumentation_veroeffentlichung,
  dokumentation_zusammenfassung,
} from "@/config/routes";
import {
  downloadDocumentAndGetText,
  expectAndSkipNotice,
  expectDocumentToNotContainTags,
  expectStringsOrderedInText,
  waitForHydration,
} from "./helpers";

type Answer = {
  label: string;
  value?: string;
  values?: string[];
};
const testData = {
  title: "E2E V2 Titel des Regelungsvorhabens",
  organization: "E2E-Organisation",
  bezug: "Ja, Bezug zu EU-Interoperabilität ist vorhanden.",
  requirementA: {
    testId: "requirement-0",
    addNext: true,
    answers: {
      title: {
        label: "Kurzbeschreibung oder Titel",
        value: "Verbindliche Anforderung A",
      },
      rechtsgrundlage: {
        label: "Rechtsgrundlage",
        value: "Rechtsgrundlage A",
      },
      dienste: {
        label: "Betroffene transeuropäische Dienste",
        value: "Dienst A1\nDienst A2",
      },
      bereiche: {
        label: "Für welche Bereiche sind diese Dienste relevant?",
        values: ["Verteidigung", "Gesundheit", "Freizeit, Kultur und Religion"],
      },
      betroffene: {
        label: "Für wen gilt diese verbindliche Anforderung?",
        values: ["Öffentliche Stelle (Bund / national)", "Private Unternehmen"],
      },
    } satisfies Record<string, Answer>,
  },
  requirementB: {
    testId: "requirement-1",
    addNext: false,
    answers: {
      title: {
        label: "Kurzbeschreibung oder Titel",
        value: "Verbindliche Anforderung B",
      },
      rechtsgrundlage: {
        label: "Rechtsgrundlage",
        value: "Rechtsgrundlage B",
      },
      dienste: {
        label: "Betroffene transeuropäische Dienste",
        value: "Dienst B1\nDienst B2",
      },
      bereiche: {
        label: "Für welche Bereiche sind diese Dienste relevant?",
        values: ["Bildung", "Umweltschutz"],
      },
      betroffene: {
        label: "Für wen gilt diese verbindliche Anforderung?",
        values: ["EU-Agentur"],
      },
    } satisfies Record<string, Answer>,
  },
  levels: [
    {
      route: dokumentation_bewertungRechtlich,
      answer: "Ja, gänzlich oder teilweise",
      detail: "Rechliche Details",
    },
    {
      route: dokumentation_bewertungOrganisatorisch,
      answer: "Nein",
      detail: "Organisatorische Details",
    },
    {
      route: dokumentation_bewertungSemantisch,
      answer: "nicht relevant",
      detail: null,
    },
    {
      route: dokumentation_bewertungTechnisch,
      answer: "Nein",
      detail: "Technische Details",
    },
  ],
  publicationStatus: {
    label: "Wann soll der",
    value: "Die Veröffentlichung ist geplant am...",
    shortValue: "geplant",
  },
  publicationDate: {
    label: "Voraussichtliches Veröffentlichungsdatum",
    value: "Q4",
  },
};

async function clickNext(page: Page) {
  await page.getByText("Weiter", { exact: true }).click();
}

test("interoperability documentation happy path", async ({
  page,
}, testInfo) => {
  test.setTimeout(60_000);

  await test.step("start documentation flow from landing page", async () => {
    await page.goto(dokumentation.path);
    await expect(page).toHaveURL(dokumentation.path);
    await waitForHydration(page);

    await page.getByRole("link", { name: "Dokumentation starten" }).click();
  });

  await test.step("see the notice, confirm, and continue", async () => {
    await expectAndSkipNotice(page);
  });

  await test.step("fill title page and skip to Bezug", async () => {
    await expect(page).toHaveURL(dokumentation_regelungsvorhabenTitel.path);
    await waitForHydration(page);
    await page
      .getByLabel(digitalDocumentation.info.inputTitle.label)
      .fill(testData.title);
    await page
      .getByLabel("Ministerium / Organisation")
      .fill(testData.organization);

    if (await page.getByTestId("stepper").isVisible()) {
      let previousUrl = page.url();
      while (
        !page.url().includes(dokumentation_euInteroperabilitaetsbezug.path)
      ) {
        await clickNext(page);
        await page.waitForURL((url) => url.href !== previousUrl, {
          timeout: 5_000,
        });
        previousUrl = page.url();
        await waitForHydration(page);
      }
    } else {
      // open the interoperability group
      await page.getByRole("button", { name: "EU-Interoperabilität" }).click();
      await page
        .getByRole("link", { name: "Interoperabilitäts-Bezug" })
        .click();
    }

    await expect(page).toHaveURL(dokumentation_euInteroperabilitaetsbezug.path);
  });

  await test.step("select bezug", async () => {
    await page.getByRole("radio", { name: testData.bezug }).check();
    await clickNext(page);
  });

  for (const requirement of [testData.requirementA, testData.requirementB]) {
    await test.step("fill binding requirements", async () => {
      const container = page.getByTestId(requirement.testId);
      await container
        .getByRole("textbox", { name: requirement.answers.title.label })
        .fill(requirement.answers.title.value);
      await container
        .getByRole("textbox", {
          name: requirement.answers.rechtsgrundlage.label,
        })
        .fill(requirement.answers.rechtsgrundlage.value);
      await container
        .getByRole("textbox", { name: requirement.answers.dienste.label })
        .fill(requirement.answers.dienste.value);
      const areasCombobox = container.getByRole("combobox", {
        name: requirement.answers.bereiche.label,
      });
      await areasCombobox.click();
      for (const name of requirement.answers.bereiche.values) {
        await page.getByRole("option", { name }).click();
      }
      await page.keyboard.press("Escape");
      await expect(areasCombobox).toHaveValue(
        requirement.answers.bereiche.values.join(", "),
      );
      const affectedCombobox = container.getByRole("combobox", {
        name: requirement.answers.betroffene.label,
      });
      await affectedCombobox.click();
      for (const name of requirement.answers.betroffene.values) {
        await page.getByRole("option", { name }).click();
      }
      await page.keyboard.press("Escape");
      await expect(affectedCombobox).toHaveValue(
        requirement.answers.betroffene.values.join(", "),
      );
      if (requirement.addNext) {
        await page
          .getByRole("button", { name: "Verbindliche Anforderung" })
          .click();
      }
    });
  }
  await clickNext(page);

  await test.step("fill interoperability rating", async () => {
    for (const { route, answer, detail } of testData.levels) {
      await expect(page).toHaveURL(route.path);
      await page.getByRole("radio", { name: answer }).check();
      if (detail) {
        await page.getByRole("textbox", { name: "Erklärung" }).fill(detail);
      }
      await clickNext(page);
    }
  });

  await test.step("fill publication details", async () => {
    await expect(
      page.getByRole("heading", { name: "Veröffentlichung" }),
    ).toBeVisible();
    await page
      .getByRole("radio", { name: testData.publicationStatus.value })
      .check();
    await page
      .getByRole("textbox", {
        name: testData.publicationDate.label,
      })
      .fill(testData.publicationDate.value);
    await page.getByRole("link", { name: "Weiter" }).click();
  });

  await test.step("view summary", async () => {
    await expect(page).toHaveURL(dokumentation_zusammenfassung.path);
    await expect(
      page.getByTestId(dokumentation_regelungsvorhabenTitel.path),
    ).toContainText(testData.title);
    await expect(
      page.getByTestId(dokumentation_euInteroperabilitaetsbezug.path),
    ).toContainText("Ja");

    const requirements = page.getByTestId(
      dokumentation_verbindlicheAnforderungen.path,
    );
    for (const answer of Object.values(testData.requirementA.answers)) {
      await expectLabelAndValue(requirements, answer);
    }
    for (const answer of Object.values(testData.requirementB.answers)) {
      await expectLabelAndValue(requirements, answer);
    }

    for (const level of testData.levels) {
      const locator = page.getByTestId(level.route.path);
      await expect(locator).toContainText(level.answer);
      if (level.detail) {
        await expect(locator).toContainText(level.detail);
      }
    }

    await expectLabelAndValue(
      page.getByTestId(dokumentation_veroeffentlichung.path),
      testData.publicationStatus,
    );
    await expectLabelAndValue(
      page.getByTestId(dokumentation_veroeffentlichung.path),
      testData.publicationDate,
    );

    await clickNext(page);
  });

  await test.step("download assessment", async () => {
    await expect(page).toHaveURL(dokumentation_absenden.path);
    const docText = await downloadDocumentAndGetText(
      page,
      page.getByRole("button", { name: "Bewertung herunterladen (.docx)" }),
      testInfo.outputPath("interoperability-assessment.docx"),
      "Interoperabilitaetsbewertung.docx",
    );
    expectStringsOrderedInText(
      docText,
      [
        testData.title,
        testData.organization,
        testData.publicationStatus.shortValue,
        testData.publicationDate.value,
        "Verbindliche Anforderung",
        testData.requirementA.answers.title.value,
        testData.requirementA.answers.rechtsgrundlage.value,
        ...testData.requirementA.answers.dienste.value.split("\n"),
        ...testData.requirementA.answers.bereiche.values,
        ...testData.requirementA.answers.betroffene.values,
        testData.requirementB.answers.title.value,
        testData.requirementB.answers.rechtsgrundlage.value,
        ...testData.requirementB.answers.dienste.value.split("\n"),
        ...testData.requirementB.answers.bereiche.values,
        ...testData.requirementB.answers.betroffene.values,
        ...testData.levels.flatMap((level) => [
          level.answer,
          level.detail ?? "",
        ]),
      ],
      [],
    );
    expectDocumentToNotContainTags(docText);
  });
});

async function expectLabelAndValue(locator: Locator, answer: Answer) {
  await expect(locator).toContainText(answer.label);
  if (answer.value) {
    await expect(locator).toContainText(answer.value);
  }
  if (answer.values) {
    for (const value of answer.values) {
      await expect(locator).toContainText(value);
    }
  }
}
