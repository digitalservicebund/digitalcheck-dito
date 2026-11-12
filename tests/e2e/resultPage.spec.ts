import { assistent_vorpruefung_ergebnis } from "@/config/routes";
import { preCheck } from "@/resources/content/vorpruefung";
import { resultRows } from "@/wizard/vorpruefungResult";
import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers";

const { questions } = preCheck;

const emailContent = [
  "Das Vorhaben hat einen Digitalbezug.",
  "Das Vorhaben hat einen Bezug zur EU-Interoperabilität.",
  ...Object.values(resultRows).map(({ summary }) => summary),
];

test.describe("Vorprüfung Ergebnis happy path", () => {
  test.describe.configure({ mode: "default" });

  let page: Page;

  test.beforeAll("answer all questions with yes", async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(questions[0].path);
    for (const question of questions) {
      await page.waitForURL(question.path);
      await waitForHydration(page);
      await page.getByLabel("Ja").click();
      await page.getByRole("link", { name: "Weiter", exact: true }).click();
    }
  });

  test.beforeEach("go to result page", async () => {
    if (page.url() !== assistent_vorpruefung_ergebnis.path) {
      await page.goto(assistent_vorpruefung_ergebnis.path);
    }
    await page.waitForURL(assistent_vorpruefung_ergebnis.path);
    await waitForHydration(page);
  });

  test.afterAll("close shared page for test iteration", async () => {
    if (page) {
      await page.close();
    }
  });

  test("page headline shows expected result", async () => {
    await expect(
      page.getByRole("heading", { name: "Ergebnis Ihrer Vorprüfung" }),
    ).toBeVisible();
    await expect(
      page.getByText("Ihr Vorhaben hat einen Digitalbezug.", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Ihr Vorhaben hat einen Bezug zur EU-Interoperabilität.", {
        exact: true,
      }),
    ).toBeVisible();
  });

  test("answer overview shows all answers", async () => {
    const table = page.getByRole("table");
    for (const question of questions) {
      const row = table.getByRole("row", { name: question.title });
      await expect(
        row.getByRole("cell", { name: "Ja", exact: true }),
      ).toBeVisible();
      await expect(
        row.getByRole("link", { name: `Bearbeiten : ${question.title}` }),
      ).toHaveAttribute("href", question.path);
    }
  });

  test("title input is visible", async () => {
    await expect(page.getByLabel("Arbeitstitel des Vorhabens")).toBeVisible();
  });

  test("negative reasoning input is not visible", async () => {
    await expect(page.getByLabel("Begründung")).toBeHidden();
  });

  test("email contains title and result", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Vorhaben ABC");

    const mailLink = page.getByRole("link", { name: "E-Mail-Programm öffnen" });
    const mailUri = decodeURIComponent(
      (await mailLink.getAttribute("href")) ?? "",
    );

    expect(mailUri).toContain("Digitalcheck Vorprüfung: „Vorhaben ABC“");
    expect(mailUri).toContain("poststelle@nkr.bund.de");
    expect(mailUri).toContain("interoperabel@digitalservice.bund.de");
    for (const text of emailContent) {
      expect(mailUri).toContain(text);
    }
  });

  test("email text can be previewed", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Vorhaben ABC");

    const previewButton = page.getByRole("button", {
      name: "E-Mail-Text anzeigen",
    });
    await previewButton.click();
    await expect(previewButton).toHaveAttribute("aria-expanded", "true");

    const previewId = await previewButton.getAttribute("aria-controls");
    const preview = page.locator(`[id="${previewId}"]`);
    await expect(preview).toBeVisible();
    await expect(preview).toContainText("Vorhaben ABC");
    for (const text of emailContent) {
      await expect(preview).toContainText(text);
    }
  });
});
