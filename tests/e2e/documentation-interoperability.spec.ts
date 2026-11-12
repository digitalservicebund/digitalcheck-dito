import { type Page, test } from "@playwright/test";

import {
  assistent_dokumentation,
  assistent_dokumentation_abschliessen,
  assistent_dokumentation_euInteroperabilitaet,
  assistent_dokumentation_euInteroperabilitaet_organisatorisch,
  assistent_dokumentation_euInteroperabilitaet_rechtlich,
  assistent_dokumentation_euInteroperabilitaet_semantisch,
  assistent_dokumentation_euInteroperabilitaet_technisch,
  assistent_dokumentation_euInteroperabilitaet_verbindlicheAnforderungen,
  assistent_dokumentation_euInteroperabilitaet_veroeffentlichung,
  assistent_dokumentation_regelungsvorhaben,
  assistent_dokumentation_zusammenfassung,
} from "@/config/routes";
import {
  clickNext,
  downloadDocumentAndGetText,
  expect,
  expectDocumentToNotContainTags,
  waitForHydration,
} from "./helpers";

type Requirement = {
  title: string;
  rechtsgrundlage: string;
  dienste: string;
  bereiche: string[];
  betroffene: string;
};

const testData = {
  title: "E2E Titel des Regelungsvorhabens",
  organization: "E2E-Organisation",
  bezug: "Ja, Bezug zu EU-Interoperabilität ist vorhanden.",
  requirements: [
    {
      title: "Verbindliche Anforderung A",
      rechtsgrundlage: "Rechtsgrundlage A",
      dienste: "Dienst A1\nDienst A2",
      bereiche: ["Verteidigung", "Gesundheit", "Freizeit, Kultur und Religion"],
      betroffene: "Öffentliche Stellen und private Unternehmen",
    },
    {
      title: "Verbindliche Anforderung B",
      rechtsgrundlage: "Rechtsgrundlage B",
      dienste: "Dienst B1\nDienst B2",
      bereiche: ["Bildung", "Umweltschutz"],
      betroffene: "EU-Agentur",
    },
  ] satisfies Requirement[],
  levels: [
    {
      route: assistent_dokumentation_euInteroperabilitaet_rechtlich,
      answer: "Ja, gänzlich oder teilweise",
      detail: "Rechtliche Details",
    },
    {
      route: assistent_dokumentation_euInteroperabilitaet_organisatorisch,
      answer: "Nein",
      detail: "Organisatorische Details",
    },
    {
      route: assistent_dokumentation_euInteroperabilitaet_semantisch,
      answer: "Nicht relevant",
      detail: null,
    },
    {
      route: assistent_dokumentation_euInteroperabilitaet_technisch,
      answer: "Nein",
      detail: "Technische Details",
    },
  ],
  publicationStatus: "Die Veröffentlichung ist geplant am...",
  publicationDate: {
    label: "Voraussichtliches Veröffentlichungsdatum",
    value: "Q4",
  },
};

async function fillRequirement(
  page: Page,
  index: number,
  requirement: Requirement,
) {
  const container = page.locator(
    `[data-wizard-field="verbindliche-anforderungen.${index}"]`,
  );
  await container
    .getByRole("textbox", { name: "Kurzbeschreibung oder Titel" })
    .fill(requirement.title);
  await container
    .getByRole("textbox", { name: "Rechtsgrundlage" })
    .fill(requirement.rechtsgrundlage);
  await container
    .getByRole("textbox", {
      name: "Betroffene grenzüberschreitende digitale Verwaltungsdienste",
    })
    .fill(requirement.dienste);

  // A disclosure with checkboxes, which shows the selection when closed
  const bereiche = container.locator("details[data-multiselect]");
  await bereiche.locator("summary").click();
  for (const name of requirement.bereiche) {
    await bereiche.locator("label", { hasText: name }).click();
  }
  await bereiche.locator("summary").click();
  for (const name of requirement.bereiche) {
    await expect(bereiche.locator("summary")).toContainText(name);
  }

  await container
    .getByRole("textbox", {
      name: "Für wen gilt diese verbindliche Anforderung?",
    })
    .fill(requirement.betroffene);
}

test("interoperability documentation happy path", async ({
  page,
}, testInfo) => {
  test.setTimeout(60_000);

  await test.step("start documentation flow from landing page", async () => {
    await page.goto(assistent_dokumentation.path);
    await waitForHydration(page);
    await page.getByRole("link", { name: "Dokumentation starten" }).click();
  });

  await test.step("fill title page and skip to EU-Bezug", async () => {
    await page.waitForURL(assistent_dokumentation_regelungsvorhaben.path);
    await waitForHydration(page);
    await page.getByLabel("Titel des Regelungsvorhabens").fill(testData.title);
    await page
      .getByLabel("Ministerium / Organisation")
      .fill(testData.organization);

    await page.goto(assistent_dokumentation_euInteroperabilitaet.path);
    await waitForHydration(page);
  });

  await test.step("select EU-Bezug", async () => {
    await page.getByRole("radio", { name: testData.bezug }).check();
    await clickNext(page);
    await page.waitForURL(
      assistent_dokumentation_euInteroperabilitaet_verbindlicheAnforderungen.path,
    );
    await waitForHydration(page);
  });

  await test.step("fill binding requirements", async () => {
    for (const [index, requirement] of testData.requirements.entries()) {
      if (index > 0) {
        await page
          .getByRole("button", { name: "Verbindliche Anforderung hinzufügen" })
          .click();
      }
      await fillRequirement(page, index, requirement);
    }
    await clickNext(page);
  });

  await test.step("fill interoperability rating", async () => {
    for (const { route, answer, detail } of testData.levels) {
      await page.waitForURL(route.path);
      await waitForHydration(page);
      await page.getByRole("radio", { name: answer }).check();
      if (detail) {
        await page.getByRole("textbox", { name: "Erklärung" }).fill(detail);
      } else {
        await expect(
          page.getByRole("textbox", { name: "Erklärung" }),
        ).toBeHidden();
      }
      await clickNext(page);
    }
  });

  await test.step("fill publication details", async () => {
    await page.waitForURL(
      assistent_dokumentation_euInteroperabilitaet_veroeffentlichung.path,
    );
    await waitForHydration(page);
    await page.getByRole("radio", { name: testData.publicationStatus }).check();
    await page
      .getByRole("textbox", { name: testData.publicationDate.label })
      .fill(testData.publicationDate.value);
    await clickNext(page);
  });

  await test.step("view summary", async () => {
    await page.waitForURL(assistent_dokumentation_zusammenfassung.path);
    await waitForHydration(page);
    const main = page.getByRole("main");
    await expect(main).toContainText(testData.title);
    await expect(
      main
        .getByRole("term")
        .filter({
          hasText: "Ergab die Vorprüfung Bezug zu EU-Interoperabilität?",
        })
        .locator("+ dd"),
    ).toHaveText("Ja");

    for (const requirement of testData.requirements) {
      await expect(main).toContainText(requirement.title);
      await expect(main).toContainText(requirement.rechtsgrundlage);
      for (const dienst of requirement.dienste.split("\n")) {
        await expect(main).toContainText(dienst);
      }
      for (const bereich of requirement.bereiche) {
        await expect(main).toContainText(bereich);
      }
      await expect(main).toContainText(requirement.betroffene);
    }

    for (const level of testData.levels) {
      await expect(main).toContainText(level.answer);
      if (level.detail) {
        await expect(main).toContainText(level.detail);
      }
    }

    await expect(main).toContainText(testData.publicationStatus);
    await expect(main).toContainText(testData.publicationDate.value);
  });

  await test.step("download assessment", async () => {
    // The Prinzipien are left out, so the Dokumentation can't be completed:
    // download the Zwischenstand instead
    await expect(
      page
        .getByRole("main")
        .getByRole("button", { name: "Weiter", exact: true }),
    ).toBeVisible();
    await expect(page).not.toHaveURL(assistent_dokumentation_abschliessen.path);

    const docText = await downloadDocumentAndGetText(
      page,
      page.getByRole("button", { name: "Zwischenstand herunterladen" }),
      testInfo.outputPath("interoperability-assessment.docx"),
      "Dokumentation_der_Digitaltauglichkeit.docx",
    );
    expect(docText).toHaveStringsOrdered([
      testData.title,
      testData.organization,
      "enthaltene verbindliche Anforderungen",
      ...testData.requirements.flatMap((requirement) => [
        requirement.title,
        requirement.rechtsgrundlage,
        ...requirement.dienste.split("\n"),
        ...requirement.bereiche,
        requirement.betroffene,
      ]),
      ...testData.levels.flatMap((level) => [level.answer, level.detail ?? ""]),
      "Die Veröffentlichung ist geplant",
      testData.publicationDate.value,
    ]);
    expectDocumentToNotContainTags(docText);
  });
});
