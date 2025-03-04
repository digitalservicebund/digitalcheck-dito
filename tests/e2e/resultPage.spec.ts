import { expect, type Page, test } from "@playwright/test";
import { preCheck } from "~/resources/content";
import {
  ROUTE_DOCUMENTATION,
  ROUTE_INTEROPERABILITY,
  ROUTE_METHODS,
  ROUTE_PRECHECK,
  ROUTE_RESULT,
} from "~/resources/staticRoutes";

const { questions } = preCheck;

const EMAIL_INPUT_ERROR = "email-error";
const TITLE_INPUT_ERROR = "title-error";
const NEGATIVE_REASONING_ERROR = "negativeReasoning-error";

async function registerMailInterceptionHandlerAndExpect(
  page: Page,
  expected?: {
    subject?: string;
    recipients?: string[];
    cc?: string[];
    body?: string[];
  },
  notExpected?: {
    recipients?: string[];
    body?: string[];
  },
) {
  await page.route("**", async (route) => {
    const response = await route.fetch();
    const status = response.headers()["x-remix-status"];
    const redirectUrl = response.headers()["x-remix-redirect"];

    if (status !== "302" || !redirectUrl?.startsWith("mailto:")) {
      await route.continue();
      return;
    }

    const mailTo = new URL(redirectUrl);
    if (expected?.subject)
      expect(mailTo.searchParams.get("subject")).toBe(expected?.subject);
    expected?.recipients?.forEach((expectedRecipient) =>
      expect(decodeURIComponent(mailTo.pathname)).toContain(expectedRecipient),
    );
    expected?.cc?.forEach((expectedCC) =>
      expect(mailTo.searchParams.get("cc")).toContain(expectedCC),
    );
    expected?.body?.forEach((expectedString) => {
      expect(mailTo.searchParams.get("body")).toContain(expectedString);
    });

    notExpected?.recipients?.forEach((notExpectedRecipient) =>
      expect(decodeURIComponent(mailTo.pathname)).not.toContain(
        notExpectedRecipient,
      ),
    );
    notExpected?.body?.forEach((notExpectedString) => {
      expect(mailTo.searchParams.get("body")).not.toContain(notExpectedString);
    });

    await route.abort();
  });
}

test.describe("test positive result for digital and interoperability", () => {
  let page: Page;
  test.beforeAll(
    "answer all pre-check questions with yes and go to result page",
    async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(questions[0].url);
      for (const question of questions) {
        await page.waitForURL(question.url);
        await page.getByLabel("Ja").click();
        await page.getByRole("button", { name: "Übernehmen" }).click();
      }
    },
  );

  test.beforeEach("go to result page", async () => {
    await page.goto(ROUTE_RESULT.url);
  });

  test.afterAll("close page", async () => {
    await page.close();
  });

  test("page headline shows positive result for digital and interoperability", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Das Regelungsvorhaben hat einen Digitalbezug und enthält Anforderungen der Interoperabilität.",
    );
  });

  test("page contains all answers in positive form", async () => {
    await expect(page.getByRole("main")).toContainText(
      "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
    );
    await expect(page.getByRole("main")).toContainText(
      "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
    );
    for (const question of questions) {
      await expect(page.getByRole("main")).toContainText(
        question.positiveResult,
      );
    }
  });

  test("page contains link to interoperability landing page", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Erfahren Sie mehr über Interoperabilität",
    );
    await expect(
      page.getByRole("link", { name: "Mehr zu Interoperabilität" }),
    ).toBeVisible();
  });

  test("link to interoperability landing page leads to interoperability landing page", async () => {
    await page.getByRole("link", { name: "Mehr zu Interoperabilität" }).click();
    await page.waitForURL(ROUTE_INTEROPERABILITY.url);
  });

  test("email input is visible", async () => {
    await expect(page.getByLabel("Ihre E-Mail Adresse")).toBeVisible();
  });

  test("title input is visible", async () => {
    await expect(page.getByLabel("Arbeitstitel des Vorhabens")).toBeVisible();
  });

  test("negative reasoning input is not visible", async () => {
    await expect(page.getByLabel("Begründung")).not.toBeVisible();
  });

  test("error is shown if title is empty", async () => {
    // not filling title
    await registerMailInterceptionHandlerAndExpect(page);
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
    await expect(page.getByTestId(TITLE_INPUT_ERROR)).toBeVisible();
    await expect(page.locator("main")).toContainText(
      "Bitte geben Sie einen Titel für Ihr Vorhaben an.",
    );
  });

  test("error is shown if title is too long", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("A".repeat(101));
    await registerMailInterceptionHandlerAndExpect(page);
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
    await expect(page.getByTestId(TITLE_INPUT_ERROR)).toBeVisible();
    await expect(page.locator("main")).toContainText("kürzeren Titel");
  });

  test("no error is shown if optional email is empty", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    // not filling email
    await registerMailInterceptionHandlerAndExpect(page);
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
    await expect(page.getByTestId(EMAIL_INPUT_ERROR)).not.toBeVisible();
  });

  test("no error shown when email and title are filled", async () => {
    await page.getByLabel("Ihre E-Mail Adresse").fill("foo@bar.de");
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    await registerMailInterceptionHandlerAndExpect(page);
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
    await expect(page.getByTestId(EMAIL_INPUT_ERROR)).not.toBeVisible();
    await expect(page.getByTestId(TITLE_INPUT_ERROR)).not.toBeVisible();
  });

  test("email subject includes title", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");

    await registerMailInterceptionHandlerAndExpect(page, {
      subject: "Digitalcheck Vorprüfung: „Policy ABC“",
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });

  test("email recipients include nkr", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    await registerMailInterceptionHandlerAndExpect(page, {
      recipients: ["nkr@bmj.bund.de"],
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });

  test("email recipients include digitalcheck team if interoperability is positive", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    await registerMailInterceptionHandlerAndExpect(page, {
      recipients: ["interoperabel@digitalservice.bund.de"],
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });

  test("email cc includes email from email input", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    await page.getByLabel("Ihre E-Mail Adresse").fill("foo@bar.de");
    await registerMailInterceptionHandlerAndExpect(page, {
      cc: ["foo@bar.de"],
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });

  test("email body contains result title", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    await registerMailInterceptionHandlerAndExpect(page, {
      body: [
        "Das Regelungsvorhaben hat einen Digitalbezug und enthält Anforderungen der Interoperabilität.",
      ],
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });

  test("email body contains all answers in positive form", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    const bodyContains = [
      "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
      "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
    ];
    questions.forEach((question) => {
      bodyContains.push(question.positiveResult);
    });

    await registerMailInterceptionHandlerAndExpect(page, {
      body: bodyContains,
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });

  test("email body does not contain negative reasoning", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    await registerMailInterceptionHandlerAndExpect(page, undefined, {
      body: ["Begründung:"],
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });

  test("result page links to methods", async () => {
    await page.getByRole("link", { name: "Zu „Erarbeiten“" }).click();
    await expect(page).toHaveURL(ROUTE_METHODS.url);
  });

  test("result page links to documentation", async () => {
    await page.getByRole("link", { name: "Zu „Dokumentieren“" }).click();
    await expect(page).toHaveURL(ROUTE_DOCUMENTATION.url);
  });
});

test.describe("test positive result for digital and negative for interoperability", () => {
  let page: Page;
  test.beforeAll(
    "answer all digital questions with yes and all interoperability questions with no and go to result page",
    async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(questions[0].url);
      for (const question of questions) {
        await page.waitForURL(question.url);
        await page
          .getByLabel(question.interoperability ? "Nein" : "Ja")
          .click();
        await page.getByRole("button", { name: "Übernehmen" }).click();
      }
    },
  );

  test.beforeEach("go to result page", async () => {
    await page.goto(ROUTE_RESULT.url);
  });

  test.afterAll("close page", async () => {
    await page.close();
  });

  test("page headline shows positive result for digital and neagtive for interoperability", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Das Regelungsvorhaben hat einen Digitalbezug und keine Anforderungen der Interoperabilität.",
    );
  });

  test("page does not contains link to interoperability landing page", async () => {
    await expect(page.getByRole("main")).not.toContainText(
      "Erfahren Sie mehr über Interoperabilität",
    );
    await expect(
      page.getByRole("link", { name: "Mehr zu Interoperabilität" }),
    ).not.toBeVisible();
  });

  test("negative reasoning input is not visible", async () => {
    await expect(page.getByLabel("Begründung")).not.toBeVisible();
  });

  test("email recipients do not include digitalcheck team if interoperability is negative", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    // set expected to undefined to set notExpected
    await registerMailInterceptionHandlerAndExpect(page, undefined, {
      recipients: ["interoperabel@digitalservice.bund.de"],
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });

  test("email body contains result title", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    await registerMailInterceptionHandlerAndExpect(page, {
      body: [
        "Das Regelungsvorhaben hat einen Digitalbezug und keine Anforderungen der Interoperabilität.",
      ],
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });
});

test.describe("test positive result for digital and unsure for interoperability", () => {
  let page: Page;
  test.beforeAll(
    "answer all digital questions with yes and all interoperability questions with unsure and go to result page",
    async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(questions[0].url);
      for (const question of questions) {
        await page.waitForURL(question.url);
        await page
          .getByLabel(question.interoperability ? "Ich bin unsicher" : "Ja")
          .click();
        await page.getByRole("button", { name: "Übernehmen" }).click();
      }
    },
  );

  test.beforeEach("go to result page", async () => {
    await page.goto(ROUTE_RESULT.url);
  });

  test.afterAll("close page", async () => {
    await page.close();
  });

  test("page headline shows positive result for digital and unsure for interoperability", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Das Regelungsvorhaben hat einen Digitalbezug und keine eindeutigen Anforderungen der Interoperabilität.",
    );
  });

  test("page contains all answers for interoperability in unsure form", async () => {
    await expect(page.getByRole("main")).toContainText(
      "In Bezug auf Interoperabilität ist nicht sicher, ob Ihr Regelungsvorhaben zu Folgendem führt...",
    );
    for (const question of questions.filter(
      (question) => question.interoperability,
    )) {
      await expect(page.getByRole("main")).toContainText(
        question.positiveResult,
      );
    }
  });

  test("page contains hint regarding unsure interopoerability", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Das können Sie tun: Kontaktieren Sie uns unter",
    );
  });

  test("page contains link to interoperability landing page", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Erfahren Sie mehr über Interoperabilität",
    );
    await expect(
      page.getByRole("link", { name: "Mehr zu Interoperabilität" }),
    ).toBeVisible();
  });

  test("negative reasoning input is not visible", async () => {
    await expect(page.getByLabel("Begründung")).not.toBeVisible();
  });

  test("email recipients include digitalcheck team if interoperability is unsure", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    await registerMailInterceptionHandlerAndExpect(page, {
      recipients: ["interoperabel@digitalservice.bund.de"],
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });

  test("email body contains result title", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    await registerMailInterceptionHandlerAndExpect(page, {
      body: [
        "Das Regelungsvorhaben hat einen Digitalbezug und keine eindeutigen Anforderungen der Interoperabilität.",
      ],
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });

  test("email body contains all answers for interoperability in unsure form", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    const bodyContains = [
      "In Bezug auf Interoperabilität ist nicht sicher, ob Ihr Regelungsvorhaben zu Folgendem führt...",
    ];
    questions
      .filter((question) => question.interoperability)
      .forEach((question) => {
        bodyContains.push(question.positiveResult);
      });

    await registerMailInterceptionHandlerAndExpect(page, {
      body: bodyContains,
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });
});

test.describe("test negative result for digital and interoperability", () => {
  let page: Page;
  test.beforeAll(
    "answer all pre-check questions with no and go to result page",
    async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(questions[0].url);
      for (const question of questions) {
        await page.waitForURL(question.url);
        await page.getByLabel("Nein").click();
        await page.getByRole("button", { name: "Übernehmen" }).click();
      }
    },
  );

  test.beforeEach("go to result page", async () => {
    await page.goto(ROUTE_RESULT.url);
  });

  test.afterAll("close page", async () => {
    await page.close();
  });

  test("page headline shows negative result for digital and interoperability", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Das Regelungsvorhaben hat keinen Digitalbezug und keine Anforderungen der Interoperabilität.",
    );
  });

  test("page contains all answers in negative form", async () => {
    await expect(page.getByRole("main")).toContainText(
      "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
    );
    await expect(page.getByRole("main")).toContainText(
      "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
    );
    for (const question of questions) {
      await expect(page.getByRole("main")).toContainText(
        question.negativeResult,
      );
    }
  });

  test("page does not contains link to interoperability landing page", async () => {
    await expect(page.getByRole("main")).not.toContainText(
      "Erfahren Sie mehr über Interoperabilität",
    );
    await expect(
      page.getByRole("link", { name: "Mehr zu Interoperabilität" }),
    ).not.toBeVisible();
  });

  test("email input is visible", async () => {
    await expect(page.getByLabel("Ihre E-Mail Adresse")).toBeVisible();
  });

  test("title input is visible", async () => {
    await expect(page.getByLabel("Arbeitstitel des Vorhabens")).toBeVisible();
  });

  test("negative reasoning input is visible", async () => {
    await expect(page.getByLabel("Begründung")).toBeVisible();
  });

  test("error is shown if negative reasoning is empty", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    await registerMailInterceptionHandlerAndExpect(page);
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
    await expect(page.getByTestId(NEGATIVE_REASONING_ERROR)).toBeVisible();
    await expect(page.locator("main")).toContainText(
      "Bitte geben Sie eine Begründung für den fehlenden Digitalbezug an.",
    );
  });

  test("error is shown if negative reasoning is too long", async () => {
    await page.getByLabel("Begründung").fill("A".repeat(501));
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    await registerMailInterceptionHandlerAndExpect(page);
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
    await expect(page.getByTestId(NEGATIVE_REASONING_ERROR)).toBeVisible();
    await expect(page.locator("main")).toContainText("kürzere Begründung");
  });

  test("email body contains all answers in negative form", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    const bodyContains = [
      "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
      "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
    ];
    for (const question of questions) {
      bodyContains.push(question.negativeResult);
    }

    await registerMailInterceptionHandlerAndExpect(page, {
      body: bodyContains,
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });

  test("email body contains result title", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    await registerMailInterceptionHandlerAndExpect(page, {
      body: [
        "Das Regelungsvorhaben hat keinen Digitalbezug und keine Anforderungen der Interoperabilität.",
      ],
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });

  test("email body contains negative reasoning", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    await page
      .getByLabel("Begründung")
      .fill(
        "Dieses Vorhaben hat keinen Digitalbezug, weil es nicht relevant ist.",
      );
    await registerMailInterceptionHandlerAndExpect(page, {
      body: [
        "Begründung:",
        "Dieses Vorhaben hat keinen Digitalbezug, weil es nicht relevant ist.",
      ],
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });
});

test.describe("test negative result for digital and positive for interoperability", () => {
  let page: Page;
  test.beforeAll(
    "answer all digital questions with no and all interoperability questions with yes and go to result page",
    async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(questions[0].url);
      for (const question of questions) {
        await page.waitForURL(question.url);
        await page
          .getByLabel(question.interoperability ? "Ja" : "Nein")
          .click();
        await page.getByRole("button", { name: "Übernehmen" }).click();
      }
    },
  );

  test.beforeEach("go to result page", async () => {
    await page.goto(ROUTE_RESULT.url);
  });

  test.afterAll("close page", async () => {
    await page.close();
  });

  test("page headline shows negative result for digital and negative for interoperability", async () => {
    // no interoperability without digital
    await expect(page.getByRole("main")).toContainText(
      "Das Regelungsvorhaben hat keinen Digitalbezug und keine Anforderungen der Interoperabilität.",
    );
  });

  test("page shows warning that interoperability is not possible without digital", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Bitte beachten Sie: Wenn Ihr Vorhaben keinen Digitalbezug aufweist, können die Anforderungen der Interoperabilität nicht erfüllt werden",
    );
  });

  test("page contains link to interoperability landing page", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Erfahren Sie mehr über Interoperabilität",
    );
    await expect(
      page.getByRole("link", { name: "Mehr zu Interoperabilität" }),
    ).toBeVisible();
  });

  test("negative reasoning input is not visible", async () => {
    await expect(page.getByLabel("Begründung")).toBeVisible();
  });

  test("email body contains result title", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    await registerMailInterceptionHandlerAndExpect(page, {
      body: [
        "Das Regelungsvorhaben hat keinen Digitalbezug und keine Anforderungen der Interoperabilität.",
      ],
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });

  test("email body contains hint that interoperability is not possible if digital is negative", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    await registerMailInterceptionHandlerAndExpect(page, {
      body: [
        "Bitte beachten Sie: Wenn Ihr Vorhaben keinen Digitalbezug aufweist, können die Anforderungen der Interoperabilität nicht erfüllt werden",
      ],
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });
});

test.describe("test negative result for digital and unsure for interoperability", () => {
  let page: Page;
  test.beforeAll(
    "answer all digital questions with no and all interoperability questions with unsure and go to result page",
    async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(questions[0].url);
      for (const question of questions) {
        await page.waitForURL(question.url);
        await page
          .getByLabel(question.interoperability ? "Ich bin unsicher" : "Nein")
          .click();
        await page.getByRole("button", { name: "Übernehmen" }).click();
      }
    },
  );

  test.beforeEach("go to result page", async () => {
    await page.goto(ROUTE_RESULT.url);
  });

  test.afterAll("close page", async () => {
    await page.close();
  });

  test("page headline shows negative result for digital and interoperability", async () => {
    // no interoperability without digital
    await expect(page.getByRole("main")).toContainText(
      "Das Regelungsvorhaben hat keinen Digitalbezug und keine Anforderungen der Interoperabilität.",
    );
  });

  test("page contains link to interoperability landing page", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Erfahren Sie mehr über Interoperabilität",
    );
    await expect(
      page.getByRole("link", { name: "Mehr zu Interoperabilität" }),
    ).toBeVisible();
  });

  test("negative reasoning input is not visible", async () => {
    await expect(page.getByLabel("Begründung")).toBeVisible();
  });

  test("email body contains result title", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    await registerMailInterceptionHandlerAndExpect(page, {
      body: [
        "Das Regelungsvorhaben hat keinen Digitalbezug und keine eindeutigen Anforderungen der Interoperabilität.",
      ],
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });
});

test.describe("test positive result with mixed answers", () => {
  let page: Page;
  test.beforeAll("Go to assessment page", async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(questions[0].url);
    await page.getByLabel("Nein").click();
    await page.getByRole("button", { name: "Übernehmen" }).click();
    await page.waitForURL(questions[1].url);
    await page.getByLabel("Ich bin unsicher").click();
    await page.getByRole("button", { name: "Übernehmen" }).click();
    for (const question of questions.slice(2)) {
      await page.waitForURL(question.url);
      await page.getByLabel("Ja").click();
      await page.getByRole("button", { name: "Übernehmen" }).click();
    }
    await page.waitForURL(ROUTE_RESULT.url);
  });

  test.beforeEach("go to result page", async () => {
    await page.goto(ROUTE_RESULT.url);
  });

  test.afterAll("close page", async () => {
    await page.close();
  });

  test("answers in email body are prefixed by a special character indicating the type of answer", async () => {
    await page.getByLabel("Arbeitstitel des Vorhabens").fill("Policy ABC");
    const bodyContains = [
      `- ${questions[0].negativeResult}`,
      `? ${questions[1].positiveResult}`,
      `+ ${questions[2].positiveResult}`,
    ];
    await registerMailInterceptionHandlerAndExpect(page, {
      body: bodyContains,
    });
    await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  });
});

test.describe("test unsure result for digital and positive for interoperability", () => {
  let page: Page;
  test.beforeAll(
    "answer all digital questions with unsure and all interoperability questions with yes and go to result page",
    async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(questions[0].url);
      for (const question of questions) {
        await page.waitForURL(question.url);
        await page
          .getByLabel(question.interoperability ? "Ja" : "Ich bin unsicher")
          .click();
        await page.getByRole("button", { name: "Übernehmen" }).click();
      }
    },
  );

  test.beforeEach("go to result page", async () => {
    await page.goto(ROUTE_RESULT.url);
  });

  test.afterAll("close page", async () => {
    await page.close();
  });

  test("page headline shows unsure result", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.",
    );
  });

  test("page shows section for next step", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Sie können auch ohne positive Vorprüfung die Digitaltauglichkeit Ihres Regelungsvorhabens sicherstellen.",
    );
  });

  test("page shows warning that interoperability is not possible without digital", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Bitte beachten Sie: Wenn Ihr Vorhaben keinen Digitalbezug aufweist, können die Anforderungen der Interoperabilität nicht erfüllt werden",
    );
  });

  test("page contains link to interoperability landing page", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Erfahren Sie mehr über Interoperabilität",
    );
    await expect(
      page.getByRole("link", { name: "Mehr zu Interoperabilität" }),
    ).toBeVisible();
  });

  test("form is not shown", async () => {
    await expect(page.getByTestId("result-form")).not.toBeVisible();
  });
});

test.describe("test unsure result for digital and negative for interoperability", () => {
  let page: Page;
  test.beforeAll(
    "answer all digital questions with unsure and all interoperability questions with no and go to result page",
    async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(questions[0].url);
      for (const question of questions) {
        await page.waitForURL(question.url);
        await page
          .getByLabel(question.interoperability ? "Nein" : "Ich bin unsicher")
          .click();
        await page.getByRole("button", { name: "Übernehmen" }).click();
      }
    },
  );

  test.beforeEach("go to result page", async () => {
    await page.goto(ROUTE_RESULT.url);
  });

  test.afterAll("close page", async () => {
    await page.close();
  });

  test("page headline shows unsure result", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.",
    );
  });

  test("page does not contains link to interoperability landing page", async () => {
    await expect(page.getByRole("main")).not.toContainText(
      "Erfahren Sie mehr über Interoperabilität",
    );
    await expect(
      page.getByRole("link", { name: "Mehr zu Interoperabilität" }),
    ).not.toBeVisible();
  });

  test("form is not shown", async () => {
    await expect(page.getByTestId("result-form")).not.toBeVisible();
  });
});

test.describe("test unsure result for digital and unsure for interoperability", () => {
  let page: Page;
  test.beforeAll(
    "answer all digital questions with unsure and go to result page",
    async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(questions[0].url);
      for (const question of questions) {
        await page.waitForURL(question.url);
        await page.getByLabel("Ich bin unsicher").click();
        await page.getByRole("button", { name: "Übernehmen" }).click();
      }
    },
  );

  test.beforeEach("go to result page", async () => {
    await page.goto(ROUTE_RESULT.url);
  });

  test.afterAll("close page", async () => {
    await page.close();
  });

  test("page headline shows unsure result", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.",
    );
  });

  test("page contains all answers in unsure form", async () => {
    await expect(page.getByRole("main")).toContainText(
      "In Bezug auf digitale Aspekte ist nicht sicher, ob Ihr Regelungsvorhaben zu Folgendem führt...",
    );
    await expect(page.getByRole("main")).toContainText(
      "In Bezug auf Interoperabilität ist nicht sicher, ob Ihr Regelungsvorhaben zu Folgendem führt...",
    );
    for (const question of questions) {
      await expect(page.getByRole("main")).toContainText(
        question.positiveResult,
      );
    }
  });

  test("page contains link to interoperability landing page", async () => {
    await expect(page.getByRole("main")).toContainText(
      "Erfahren Sie mehr über Interoperabilität",
    );
    await expect(
      page.getByRole("link", { name: "Mehr zu Interoperabilität" }),
    ).toBeVisible();
  });

  test("form is not shown", async () => {
    await expect(page.getByTestId("result-form")).not.toBeVisible();
  });
});

test.describe("test redirect to pre-check in case of missing answers", () => {
  test("result page redirects to pre-check landing page if no question was answered", async ({
    page,
  }) => {
    await page.goto(ROUTE_RESULT.url);
    await expect(page).toHaveURL(ROUTE_PRECHECK.url);
  });

  test("result page redirects to first unanswered question if not all questions have been answered", async ({
    page,
  }) => {
    await page.goto(preCheck.questions[0].url);
    await page.getByLabel("Nein").click();
    await page.getByRole("button", { name: "Übernehmen" }).click();
    await page.goto(ROUTE_RESULT.url);
    await expect(page).toHaveURL(ROUTE_PRECHECK.url);
  });
});
