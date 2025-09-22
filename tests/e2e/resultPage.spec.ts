import { expect, type Page, test } from "@playwright/test";
import { preCheck } from "~/resources/content/vorpruefung";
import { ROUTE_PRECHECK_RESULT } from "~/resources/staticRoutes";
import { mailtoPrefix } from "~/routes/vorpruefung.ergebnis/buildMailtoRedirectUri";

const { questions } = preCheck;

type Mail = {
  subject: string;
  body: string;
  recipients: string;
  cc: string;
};

async function interceptMail(page: Page): Promise<Mail> {
  await page.getByRole("button", { name: "E-Mail erstellen" }).click();

  await page.waitForURL(mailtoPrefix + "mailto:**");

  const mailTo = new URL(page.url().substring(mailtoPrefix.length));

  return {
    subject: mailTo.searchParams.get("subject") as string,
    body: mailTo.searchParams.get("body") as string,
    recipients: decodeURIComponent(mailTo.pathname),
    cc: mailTo.searchParams.get("cc") as string,
  };
}

const positiveResultContent = [
  "einer Anpassung oder Neuentwicklung einer IT-Lösung.",
  "einer Festlegung von Mitwirkungspflichten für Akteure.",
  "einem Austausch von Daten.",
  "einer Interaktion zwischen Behörden und Bürger:innen/Unternehmen.",
  "einer Verbesserung der Umsetzung der Regelung durch die Automatisierung von Schritten.",
  "einem Daten- und Informationsaustausch zwischen EU-Mitgliedsstaaten.",
];

test.describe("Vorprüfung Ergebnis happy path", () => {
  test.describe.configure({ mode: "default" });

  let page: Page;
  test.beforeAll("answer all questions with yes", async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(questions[0].url);
    for (const question of questions) {
      await page.waitForURL(question.url);
      await page.getByLabel("Ja").click();
      await page.getByRole("button", { name: "Übernehmen" }).click();
    }
  });

  test.beforeEach("go to result page", async () => {
    if (page.url() !== ROUTE_PRECHECK_RESULT.url) {
      await page.goto(ROUTE_PRECHECK_RESULT.url);
    }
    await page.waitForURL(ROUTE_PRECHECK_RESULT.url);
  });

  test.afterAll("close shared page for test iteration", async () => {
    if (page) {
      await page.close();
    }
  });

  test("page headline shows expected result", async () => {
    await expect(
      page.getByRole("heading", { name: "Das Regelungsvorhaben hat" }),
    ).toContainText(
      "Das Regelungsvorhaben hat einen Digitalbezug und enthält Anforderungen der Interoperabilität.",
    );
  });

  test("details summary shows correct content", async () => {
    const summaryElement = page.getByText("Aufschlüsselung Ihres Ergebnisses", {
      exact: true,
    });
    await expect(summaryElement).toBeVisible();
    await summaryElement.click();

    await expect(
      page.getByText(
        "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
        { exact: true },
      ),
    ).toBeVisible();

    await expect(
      page.getByText(
        "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
        { exact: true },
      ),
    ).toBeVisible();

    for (const resultText of positiveResultContent) {
      await expect(
        page.getByText(resultText, {
          exact: true,
        }),
      ).toBeVisible();
    }
  });

  test("title input is visible", async () => {
    await expect(page.getByLabel("Arbeitstitel des Vorhabens")).toBeVisible();
  });

  test("negative reasoning input is not visible", async () => {
    await expect(page.getByLabel("Begründung")).toBeHidden();
  });

  test("email body contains title and reasoning", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Vorhaben ABC");
    const { subject, body, recipients } = await interceptMail(page);

    expect(subject).toBe("Digitalcheck Vorprüfung: „Vorhaben ABC“");

    expect(recipients).toContain("nkr@bmj.bund.de");
    expect(recipients).toContain("interoperabel@digitalservice.bund.de");

    expect(body).toContain(
      "Das Regelungsvorhaben hat einen Digitalbezug und enthält Anforderungen der Interoperabilität.",
    );
    expect(body).toContain(
      "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
    );
    expect(body).toContain(
      "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
    );

    for (const resultText of positiveResultContent) {
      expect(body).toContain(resultText);
    }
  });

  // only run on chromium because clipboard permissions don't work with firefox / safari
  // https://github.com/microsoft/playwright/issues/13037
  test("can copy email address to clipboard", async ({ browserName }) => {
    if (
      browserName === "webkit" ||
      browserName === "firefox" ||
      test.info().project.name === "Desktop Edge"
    ) {
      test.skip(
        true,
        "Skipping clipboard test on WebKit, Firefox, and Desktop Edge.",
      );
    }
    const copyAddressButton = page.getByRole("button", {
      name: "Empfängeradresse kopieren",
    });
    await expect(copyAddressButton).toBeVisible();
    await copyAddressButton.click();

    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText(),
    );
    expect(clipboardText).toBe(
      "nkr@bmj.bund.de, interoperabel@digitalservice.bund.de",
    );
  });

  // only run on chromium because clipboard permissions don't work with firefox / safari
  // https://github.com/microsoft/playwright/issues/13037
  test("can copy email content to clipboard", async ({ browserName }) => {
    if (
      browserName === "webkit" ||
      browserName === "firefox" ||
      test.info().project.name === "Desktop Edge"
    ) {
      test.skip(
        true,
        "Skipping clipboard test on WebKit, Firefox, and Desktop Edge.",
      );
    }

    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Test title");

    const copyContentButton = page.getByRole("button", {
      name: "E-Mail-Text kopieren",
    });
    await expect(copyContentButton).toBeVisible();
    await copyContentButton.click();

    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText(),
    );

    expect(clipboardText).toContain(
      "Das Regelungsvorhaben hat einen Digitalbezug und enthält Anforderungen der Interoperabilität.",
    );
    expect(clipboardText).toContain(
      "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
    );
    expect(clipboardText).toContain(
      "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
    );

    for (const resultText of positiveResultContent) {
      expect(clipboardText).toContain(resultText);
    }
  });
});
