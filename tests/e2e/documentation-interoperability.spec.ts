import { expect, type Page, test } from "@playwright/test";
import { digitalDocumentation } from "~/resources/content/dokumentation";

import {
  dokumentation,
  dokumentation_euInteroperabilitaetsbezug,
  dokumentation_regelungsvorhabenTitel,
} from "@/config/routes";
import { expectAndSkipNotice, waitForHydration } from "./helpers";

const testData = {
  title: "E2E V2 Titel des Regelungsvorhabens",
  organization: "E2E-Organisation",
  bezug: "Ja, Bezug zu EU-Interoperabilität ist vorhanden.",
  requirementA: {
    title: {
      label: "Kurzbeschreibung oder Titel",
      value: "Verbindliche Anforderung A",
    },
    rechtsgrundlage: {
      label: "Rechtsgrundlage für die verbindliche Anforderung",
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
  },
  requirementB: {
    title: {
      label: "Kurzbeschreibung oder Titel",
      value: "Verbindliche Anforderung B",
    },
    rechtsgrundlage: {
      label: "Rechtsgrundlage für die verbindliche Anforderung",
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
  },
};

async function clickNext(page: Page) {
  await page.getByText("Weiter", { exact: true }).click();
}

test("interoperability documentation happy path", async ({
  page,
}, testInfo) => {
  // test.setTimeout(60_000);

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

  await test.step("fill binding requirements", async () => {
    await page
      .getByRole("textbox", { name: testData.requirementA.title.label })
      .fill(testData.requirementA.title.value);
    await page
      .getByRole("textbox", {
        name: testData.requirementA.rechtsgrundlage.label,
      })
      .fill(testData.requirementA.rechtsgrundlage.value);
    await page
      .getByRole("textbox", { name: testData.requirementA.dienste.label })
      .fill(testData.requirementA.dienste.value);
    await page
      .getByRole("combobox", { name: testData.requirementA.bereiche.label })
      .click();
    for (const name of testData.requirementA.bereiche.values) {
      await page.getByRole("option", { name }).click();
    }
    await page
      .getByRole("combobox", { name: testData.requirementA.betroffene.label })
      .click();
    for (const name of testData.requirementA.betroffene.values) {
      await page.getByRole("option", { name }).click();
    }
  });
});
