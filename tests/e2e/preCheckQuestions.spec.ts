import {
  assistent_vorpruefung,
  assistent_vorpruefung_ergebnis,
} from "@/config/routes";
import { preCheck } from "@/resources/content/vorpruefung";
import { expect, test } from "@playwright/test";
import { waitForHydration } from "./helpers";

const { questions } = preCheck;

const SIDEBAR_MIN_WIDTH = 900; // the sidebar is hidden below this width

test.describe("test questions form", () => {
  test("all answer options are submittable", async ({ page }) => {
    await page.goto(questions[0].path);
    const answerOptions = ["Ja", "Nein", "Ich bin unsicher"];
    for (let i = 0; i < questions.length; i++) {
      await page.waitForURL(questions[i].path);
      await waitForHydration(page);
      await page.getByLabel(answerOptions[i % answerOptions.length]).click();
      await page.getByRole("link", { name: "Weiter", exact: true }).click();
    }
    await expect(page).toHaveURL(assistent_vorpruefung_ergebnis.path);
  });

  test("clicking through pre-check works", async ({ page }) => {
    await page.goto(assistent_vorpruefung.path);
    await waitForHydration(page);
    await page.getByRole("link", { name: "Vorprüfung starten" }).click();
    for (const element of questions) {
      await page.waitForURL(element.path);
      await waitForHydration(page);
      await expect(page.getByRole("heading", { level: 1 })).not.toBeEmpty();
      await page.getByLabel("Ja").click();
      await page.getByRole("link", { name: "Weiter", exact: true }).click();
    }
    await expect(page).toHaveURL(assistent_vorpruefung_ergebnis.path);
  });

  test("questions can be skipped, but the result stays locked", async ({
    page,
  }) => {
    await page.goto(questions[0].path);
    await waitForHydration(page);
    for (let i = 0; i < questions.length - 1; i++) {
      await page.getByRole("link", { name: "Weiter", exact: true }).click();
      await page.waitForURL(questions[i + 1].path);
      await waitForHydration(page);
    }
    // "Weiter" opens a modal, which links the first unanswered question
    await page.getByLabel("Ja").click();
    await page.getByRole("button", { name: "Weiter", exact: true }).click();
    const modal = page.getByRole("dialog");
    await expect(modal).toContainText("Beantworten Sie bitte alle Fragen");
    await modal.getByRole("link", { name: "Zurück zur Vorprüfung" }).click();
    await expect(page).toHaveURL(questions[0].path);

    await page.goto(assistent_vorpruefung_ergebnis.path);
    await expect(page).toHaveURL(questions[0].path);
  });

  test("answers are kept when leaving via the sidebar", async ({
    page,
    viewport,
  }) => {
    test.skip(
      Boolean(viewport && viewport.width < SIDEBAR_MIN_WIDTH),
      "sidebar is hidden on small screens",
    );
    await page.goto(questions[0].path);
    await waitForHydration(page);
    await page.getByLabel("Nein").click();
    const sidebar = page.getByRole("navigation", {
      name: "Abschnittsnavigation",
    });
    await sidebar.getByRole("link", { name: questions[2].title }).click();
    await page.waitForURL(questions[2].path);
    await sidebar.getByRole("link", { name: questions[0].title }).click();
    await waitForHydration(page);
    await expect(page.getByLabel("Nein")).toBeChecked();
  });

  test("back button works", async ({ page }) => {
    await page.goto(questions[0].path);
    await waitForHydration(page);
    await page.getByRole("link", { name: "Zurück" }).click();
    await expect(page).toHaveURL(assistent_vorpruefung.path);
    await page.goto(questions[0].path);
    await waitForHydration(page);
    await page.getByLabel("Ja").click();
    await page.getByRole("link", { name: "Weiter", exact: true }).click();
    await expect(page).toHaveURL(questions[1].path);
    await page.getByRole("link", { name: "Zurück" }).click();
    await expect(page).toHaveURL(questions[0].path);
  });

  test("answers are saved when selected and persisted across navigations and reloads", async ({
    page,
  }) => {
    await page.goto(questions[0].path);
    await waitForHydration(page);
    await page.getByLabel("Ja").click();
    await page.getByRole("link", { name: "Weiter", exact: true }).click();
    await page.waitForURL(questions[1].path);
    await waitForHydration(page);
    await page.getByLabel("Nein").click();
    await page.getByRole("link", { name: "Weiter", exact: true }).click();
    await page.waitForURL(questions[2].path);
    await waitForHydration(page);
    await page.getByLabel("Ich bin unsicher").click();

    // saved without leaving the page
    await page.reload();
    await waitForHydration(page);
    await expect(page.getByLabel("Ich bin unsicher")).toBeChecked();

    await page.getByRole("link", { name: "Zurück" }).click();
    await page.waitForURL(questions[1].path);
    await waitForHydration(page);
    await expect(page.getByLabel("Nein")).toBeChecked();
    await page.getByRole("link", { name: "Zurück" }).click();
    await page.waitForURL(questions[0].path);
    await waitForHydration(page);
    await expect(page.getByLabel("Ja")).toBeChecked();

    // changing an answer overwrites it
    await page.getByLabel("Nein").click();
    await page.reload();
    await waitForHydration(page);
    await expect(page.getByLabel("Nein")).toBeChecked();
    await expect(page.getByLabel("Ja")).not.toBeChecked();

    await page.goto(questions[3].path);
    await waitForHydration(page);
    await expect(page.getByLabel("Ja")).not.toBeChecked();
    await expect(page.getByLabel("Nein")).not.toBeChecked();
    await expect(page.getByLabel("Ich bin unsicher")).not.toBeChecked();
  });

  test("pre-check continues at the first unanswered question", async ({
    page,
  }) => {
    await page.goto(questions[0].path);
    await waitForHydration(page);
    await page.getByLabel("Ja").click();
    await page.goto(questions[2].path);
    await waitForHydration(page);
    await page.getByLabel("Nein").click();

    await page.goto(assistent_vorpruefung.path);
    await waitForHydration(page);
    await page.getByRole("link", { name: "Vorprüfung fortsetzen" }).click();
    await expect(page).toHaveURL(questions[1].path);
  });

  test("starting over deletes the answers", async ({ page }) => {
    await page.goto(questions[0].path);
    await waitForHydration(page);
    await page.getByLabel("Ja").click();

    await page.goto(assistent_vorpruefung.path);
    await waitForHydration(page);
    await page.getByRole("button", { name: "Neue Vorprüfung starten" }).click();
    await page
      .getByRole("dialog")
      .getByRole("link", { name: "Neue Vorprüfung starten" })
      .click();
    await page.waitForURL(questions[0].path);
    await waitForHydration(page);
    await expect(page.getByLabel("Ja")).not.toBeChecked();
  });
});

test.describe("test question navigation", () => {
  test.beforeEach("skip tests on small screens", ({ viewport }) => {
    test.skip(
      Boolean(viewport && viewport.width < SIDEBAR_MIN_WIDTH),
      "Skipping because sidebar navigation is not visible on small screen",
    );
  });

  test("navigation leads to correct pages", async ({ page }) => {
    // answer all questions with "Ja", except for the last one (which would quit the wizard)
    await page.goto(questions[0].path);
    for (let i = 0; i < questions.length - 1; i++) {
      await page.waitForURL(questions[i].path);
      await waitForHydration(page);
      await page.getByLabel("Ja").click();
      await page.getByRole("link", { name: "Weiter", exact: true }).click();
    }
    // wait for last question to show
    await page.waitForURL(questions.at(-1)!.path);
    await waitForHydration(page);

    // Click on each question link and verify it leads to the correct page
    for (const question of questions) {
      await page.getByRole("link", { name: question.title }).click();
      await expect(page).toHaveURL(question.path);
    }
  });

  test("all questions are reachable, the result only once all are answered", async ({
    page,
  }) => {
    await page.goto(questions[0].path);
    await waitForHydration(page);
    const navigation = page.getByRole("navigation", {
      name: "Abschnittsnavigation",
    });
    for (const question of questions) {
      await expect(
        navigation.getByRole("link", { name: question.title }),
      ).toHaveAttribute("href", question.path);
    }

    // The result opens a modal, which links the first unanswered question
    await navigation
      .getByRole("button", { name: assistent_vorpruefung_ergebnis.title })
      .click();
    const modal = page.getByRole("dialog");
    await expect(modal).toContainText("Beantworten Sie bitte alle Fragen");
    await modal.getByRole("link", { name: "Zurück zur Vorprüfung" }).click();
    await expect(page).toHaveURL(questions[0].path);

    for (const question of questions) {
      await page.goto(question.path);
      await waitForHydration(page);
      await page.getByLabel("Ja").click();
    }
    await navigation
      .getByRole("link", { name: assistent_vorpruefung_ergebnis.title })
      .click();
    await expect(page).toHaveURL(assistent_vorpruefung_ergebnis.path);
  });

  test("current page has aria-current", async ({ page }) => {
    await page.goto(questions[0].path);
    await waitForHydration(page);

    const navigation = page.getByRole("navigation", {
      name: "Abschnittsnavigation",
    });
    await expect(
      navigation.getByRole("link", { name: questions[0].title }),
    ).toHaveAttribute("aria-current", "page");

    // Navigate to the second question
    await page.getByLabel("Ja").click();
    await page.getByRole("link", { name: "Weiter", exact: true }).click();
    await page.waitForURL(questions[1].path);

    await expect(
      navigation.getByRole("link", { name: questions[1].title }),
    ).toHaveAttribute("aria-current", "page");
    await expect(
      navigation.getByRole("link", { name: questions[0].title }),
    ).not.toHaveAttribute("aria-current");
  });

  test("answered question have check mark icon", async ({ page }) => {
    await page.goto(questions[0].path);
    await waitForHydration(page);
    await page.getByLabel("Ja").click();
    await page.getByRole("link", { name: "Weiter", exact: true }).click();

    // Check if the first question has a check mark icon
    await expect(
      page
        .getByRole("link", { name: questions[0].title })
        .getByTestId("CheckIcon"),
    ).toBeVisible();

    // Check second question is not checked
    await expect(
      page
        .getByRole("link", { name: questions[1].title })
        .getByTestId("CheckIcon"),
    ).toBeHidden();

    // Answer the second question
    await page.getByLabel("Ja").click();
    await page.getByRole("link", { name: "Weiter", exact: true }).click();

    // Check if the second question has a check mark icon
    await expect(
      page
        .getByRole("link", { name: questions[1].title })
        .getByTestId("CheckIcon"),
    ).toBeVisible();
  });
});
