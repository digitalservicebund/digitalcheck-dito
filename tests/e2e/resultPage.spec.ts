import { expect, type Page, test } from "@playwright/test";
import { preCheck } from "~/resources/content/vorpruefung";
import { preCheckResult } from "~/resources/content/vorpruefung-ergebnis.ts";
import {
  ROUTE_DOCUMENTATION,
  ROUTE_INTEROPERABILITY,
  ROUTE_METHODS,
  ROUTE_PRECHECK,
  ROUTE_PRECHECK_RESULT,
} from "~/resources/staticRoutes";
import type { TQuestion } from "~/routes/vorpruefung._preCheckNavigation.$questionId";

const { questions } = preCheck;

const EMAIL_INPUT_ERROR = "email-error";
const TITLE_INPUT_ERROR = "title-error";
const NEGATIVE_REASONING_ERROR = "negativeReasoning-error";

type ExpectedResult = {
  headline: string;
  showsInteropLink: boolean;
  showsNegativeReasoning: boolean;
  includesInterop: boolean;
  interopIsPositive?: boolean;
  warningInteropWithoutDigital?: boolean;
  showsUnsureHint?: boolean;
  formIsVisible?: boolean;
  linksAreVisible?: boolean;
  resultPrefixes?: {
    positivePrefix: string;
    negativePrefix: string;
    unsurePrefix: string;
  };
  emailBodyContains?: string[];
  allPositive?: boolean;
  allNegative?: boolean;
  dcPositiveIOunsure?: boolean;
  negativeReasoningText?: string;
};

interface TestScenario {
  name: string;
  answers: (question: TQuestion) => "Ja" | "Nein" | "Ich bin unsicher";
  expected: ExpectedResult;
}

const scenarios: TestScenario[] = [
  {
    name: "positive result for digital and interoperability",
    answers: () => "Ja",
    expected: {
      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und enthält Anforderungen der Interoperabilität.",
      showsInteropLink: true,
      showsNegativeReasoning: false,
      includesInterop: true,
      interopIsPositive: true,
      formIsVisible: true,
      linksAreVisible: true,
      emailBodyContains: [
        "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
        "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
      ],
      allPositive: true,
    },
  },
  {
    name: "positive result for digital and negative for interoperability",
    answers: (question) => (question.interoperability ? "Nein" : "Ja"),
    expected: {
      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und keine Anforderungen der Interoperabilität.",
      showsInteropLink: false,
      showsNegativeReasoning: false,
      includesInterop: false,
      interopIsPositive: false,
      formIsVisible: true,
      linksAreVisible: true,
    },
  },
  {
    name: "positive result for digital and unsure for interoperability",
    answers: (question) =>
      question.interoperability ? "Ich bin unsicher" : "Ja",
    expected: {
      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und keine eindeutigen Anforderungen der Interoperabilität.",
      showsInteropLink: true,
      showsNegativeReasoning: false,
      includesInterop: true,
      interopIsPositive: false,
      showsUnsureHint: true,
      formIsVisible: true,
      linksAreVisible: true,
      emailBodyContains: [
        "In Bezug auf Interoperabilität ist nicht sicher, ob Ihr Regelungsvorhaben zu Folgendem führt...",
      ],
      dcPositiveIOunsure: true,
    },
  },
  {
    name: "negative result for digital and interoperability",
    answers: () => "Nein",
    expected: {
      headline:
        "Das Regelungsvorhaben hat keinen Digitalbezug und keine Anforderungen der Interoperabilität.",
      showsInteropLink: false,
      showsNegativeReasoning: true,
      includesInterop: false,
      interopIsPositive: false,
      formIsVisible: true,
      linksAreVisible: false,
      emailBodyContains: [
        "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
        "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
      ],
      allNegative: true,
      negativeReasoningText:
        "Dieses Vorhaben hat keinen Digitalbezug, weil es nicht relevant ist.",
    },
  },
  {
    name: "negative result for digital and positive for interoperability",
    answers: (question) => (question.interoperability ? "Ja" : "Nein"),
    expected: {
      headline:
        "Das Regelungsvorhaben hat keinen Digitalbezug und keine Anforderungen der Interoperabilität.",
      showsInteropLink: true,
      showsNegativeReasoning: true,
      includesInterop: false,
      interopIsPositive: true,
      warningInteropWithoutDigital: true,
      formIsVisible: true,
      linksAreVisible: false,
    },
  },
  {
    name: "negative result for digital and unsure for interoperability",
    answers: (question) =>
      question.interoperability ? "Ich bin unsicher" : "Nein",
    expected: {
      headline:
        "Das Regelungsvorhaben hat keinen Digitalbezug und keine Anforderungen der Interoperabilität.",
      showsInteropLink: true,
      showsNegativeReasoning: true,
      includesInterop: false,
      formIsVisible: true,
      linksAreVisible: false,
    },
  },
  {
    name: "unsure result for digital and positive for interoperability",
    answers: (question) =>
      question.interoperability ? "Ja" : "Ich bin unsicher",
    expected: {
      headline:
        "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.",
      showsInteropLink: true,
      showsNegativeReasoning: false,
      includesInterop: false,
      warningInteropWithoutDigital: true,
      formIsVisible: false,
      linksAreVisible: true,
    },
  },
  {
    name: "unsure result for digital and negative for interoperability",
    answers: (question) =>
      question.interoperability ? "Nein" : "Ich bin unsicher",
    expected: {
      headline:
        "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.",
      showsInteropLink: false,
      showsNegativeReasoning: false,
      includesInterop: false,
      formIsVisible: false,
      linksAreVisible: true,
    },
  },
  {
    name: "unsure result for digital and unsure for interoperability",
    answers: () => "Ich bin unsicher",
    expected: {
      headline:
        "Sie haben mehrere Aussagen mit „Ich bin unsicher“ beantwortet.",
      showsInteropLink: true,
      showsNegativeReasoning: false,
      includesInterop: false,
      formIsVisible: false,
      linksAreVisible: true,
    },
  },
  {
    name: "mixed answers result",
    answers: (question) => {
      if (questions.indexOf(question) === 0) return "Nein";
      if (questions.indexOf(question) === 1) return "Ich bin unsicher";
      return "Ja";
    },
    expected: {
      headline:
        "Das Regelungsvorhaben hat einen Digitalbezug und enthält Anforderungen der Interoperabilität.",
      showsInteropLink: true,
      showsNegativeReasoning: false,
      includesInterop: true,
      formIsVisible: true,
      resultPrefixes: {
        positivePrefix: "+",
        negativePrefix: "-",
        unsurePrefix: "?",
      },
    },
  },
];

type Mail = {
  subject: string;
  body: string;
  recipients: string;
  cc: string;
};

async function interceptMail(page: Page): Promise<Mail> {
  const routeToIntercept = "**/vorpruefung/ergebnis.data";

  // Create a promise that will be resolved when the interception completes
  let interceptionResolve: (value: Mail | PromiseLike<Mail>) => void;
  const interceptionPromise = new Promise<Mail>((resolve) => {
    interceptionResolve = resolve;
  });

  // First wait for the route to be registered
  await page.route(
    routeToIntercept,
    async (route) => {
      const response = await route.fetch();
      const location = response.headers()["location"];
      await route.abort();
      const mailTo = new URL(location);

      interceptionResolve({
        subject: mailTo.searchParams.get("subject") as string,
        body: mailTo.searchParams.get("body") as string,
        recipients: decodeURIComponent(mailTo.pathname),
        cc: mailTo.searchParams.get("cc") as string,
      });
    },
    { times: 1 },
  );

  await page.getByRole("button", { name: "E-Mail erstellen" }).click();
  return interceptionPromise;
}

async function getEmailPreviewBodyFromPage(page: Page): Promise<string> {
  const summaryElement = page.getByText(preCheckResult.form.previewLabel);
  await expect(summaryElement).toBeVisible();
  await summaryElement.click();
  const emailPreviewContent = page.getByTestId("emailPreview");
  await expect(emailPreviewContent).toBeVisible();
  const textContent = await emailPreviewContent.textContent();
  return textContent?.trim() ?? "";
}

// Generate tests for each scenario
for (const scenario of scenarios) {
  test.describe(`test ${scenario.name}`, () => {
    test.describe.configure({ mode: "default" });

    let page: Page;
    test.beforeAll(
      `answer questions according to scenario and go to result page`,
      async ({ browser }) => {
        page = await browser.newPage();
        await page.goto(questions[0].url);
        for (const question of questions) {
          await page.waitForURL(question.url);
          await page.getByLabel(scenario.answers(question)).click();
          await page.getByRole("button", { name: "Übernehmen" }).click();
        }
      },
    );

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
      await expect(page.getByRole("main")).toContainText(
        scenario.expected.headline,
      );
    });

    if (scenario.expected.showsInteropLink) {
      test("details contain link to interoperability landing page and leads to interoperability landing page", async () => {
        const summaryText = preCheckResult.detailsTitle;
        const summaryElement = page.getByText(summaryText, { exact: true });

        // Ensure the summary element itself is visible (it always should be)
        await expect(summaryElement).toBeVisible();
        await summaryElement.click();
        const detailsElement = page.locator("details", {
          hasText: summaryText,
        });
        await expect(detailsElement).toHaveAttribute("open", "");
        await expect(
          page.getByRole("link", { name: "Übersichtsseite" }),
        ).toBeVisible();
        await page.getByRole("link", { name: "Übersichtsseite" }).click();
        await expect(page).toHaveURL(ROUTE_INTEROPERABILITY.url);
      });
    } else {
      test("page does not contain link to interoperability landing page", async () => {
        await expect(page.getByRole("main")).not.toContainText(
          "Erfahren Sie mehr über Interoperabilität",
        );
        await expect(
          page.getByRole("link", { name: "Mehr zu Interoperabilität" }),
        ).toBeHidden();
      });
    }

    if (scenario.expected.formIsVisible) {
      test("title input is visible", async () => {
        await expect(
          page.getByLabel("Arbeitstitel des Vorhabens"),
        ).toBeVisible();
      });

      if (scenario.expected.showsNegativeReasoning) {
        test("negative reasoning input is visible", async () => {
          await expect(page.getByLabel("Begründung")).toBeVisible();
        });

        test("error is shown if negative reasoning is empty", async () => {
          await page
            .getByLabel("Arbeitstitel des Vorhabens")
            .fill("Vorhaben ABC");
          await page.getByRole("button", { name: "E-Mail erstellen" }).click();
          await expect(
            page.getByTestId(NEGATIVE_REASONING_ERROR),
          ).toBeVisible();
          await expect(page.locator("main")).toContainText(
            "Bitte geben Sie eine Begründung für den fehlenden Digitalbezug an.",
          );
        });
      } else {
        test("negative reasoning input is not visible", async () => {
          await expect(page.getByLabel("Begründung")).toBeHidden();
        });

        test("email body does not contain negative reasoning", async () => {
          await page
            .getByLabel("Arbeitstitel des Vorhabens")
            .fill("Vorhaben ABC");
          const { body } = await interceptMail(page);
          expect(body).not.toContain("Begründung:");
        });
      }

      test("no error shown when email and title are filled", async () => {
        await page
          .getByLabel("Arbeitstitel des Vorhabens")
          .fill("Vorhaben ABC");
        if (scenario.expected.showsNegativeReasoning) {
          await page
            .getByLabel("Begründung")
            .fill("Darum brauchen wir das nicht.");
        }
        await interceptMail(page);
        await expect(page.getByTestId(EMAIL_INPUT_ERROR)).toBeHidden();
        await expect(page.getByTestId(TITLE_INPUT_ERROR)).toBeHidden();
      });

      test("error is shown if title is empty", async () => {
        await page.getByRole("button", { name: "E-Mail erstellen" }).click();
        await expect(page.getByTestId(TITLE_INPUT_ERROR)).toBeVisible();
        await expect(page.locator("main")).toContainText(
          "Bitte geben Sie einen Titel für Ihr Vorhaben an.",
        );
      });

      test("error is shown if title is too long", async () => {
        await page
          .getByLabel("Arbeitstitel des Vorhabens")
          .fill("A".repeat(101));
        await page.getByRole("button", { name: "E-Mail erstellen" }).click();
        await expect(page.getByTestId(TITLE_INPUT_ERROR)).toBeVisible();
        await expect(page.locator("main")).toContainText("kürzeren Titel");
      });

      test("email subject includes title", async () => {
        await page
          .getByLabel("Arbeitstitel des Vorhabens")
          .fill("Vorhaben ABC");
        if (scenario.expected.showsNegativeReasoning) {
          await page
            .getByLabel("Begründung")
            .fill("Darum brauchen wir das nicht.");
        }
        const { subject } = await interceptMail(page);
        expect(subject).toBe("Digitalcheck Vorprüfung: „Vorhaben ABC“");
      });

      test("email recipients include nkr", async () => {
        await page
          .getByLabel("Arbeitstitel des Vorhabens")
          .fill("Vorhaben ABC");
        if (scenario.expected.showsNegativeReasoning) {
          await page
            .getByLabel("Begründung")
            .fill("Darum brauchen wir das nicht.");
        }
        const { recipients } = await interceptMail(page);
        expect(recipients).toContain("nkr@bmj.bund.de");
      });

      if (scenario.expected.includesInterop) {
        test("email recipients include digitalcheck team", async () => {
          await page
            .getByLabel("Arbeitstitel des Vorhabens")
            .fill("Vorhaben ABC");
          if (scenario.expected.showsNegativeReasoning) {
            await page
              .getByLabel("Begründung")
              .fill("Darum brauchen wir das nicht.");
          }
          const { recipients } = await interceptMail(page);
          expect(recipients).toContain("interoperabel@digitalservice.bund.de");
        });
      } else {
        test("email recipients do not include digitalcheck team", async () => {
          await page
            .getByLabel("Arbeitstitel des Vorhabens")
            .fill("Vorhaben ABC");
          if (scenario.expected.showsNegativeReasoning) {
            await page
              .getByLabel("Begründung")
              .fill("Darum brauchen wir das nicht.");
          }
          const { recipients } = await interceptMail(page);
          expect(recipients).not.toContain(
            "interoperabel@digitalservice.bund.de",
          );
        });
      }

      test("email body contains result title", async () => {
        await page
          .getByLabel("Arbeitstitel des Vorhabens")
          .fill("Vorhaben ABC");
        if (scenario.expected.showsNegativeReasoning) {
          await page
            .getByLabel("Begründung")
            .fill("Darum brauchen wir das nicht.");
        }
        const { body } = await interceptMail(page);
        expect(body).toContain(scenario.expected.headline);
      });

      if (scenario.expected.warningInteropWithoutDigital) {
        test("email body contains warning about interoperability requiring digital", async () => {
          await page
            .getByLabel("Arbeitstitel des Vorhabens")
            .fill("Vorhaben ABC");
          if (scenario.expected.showsNegativeReasoning) {
            await page
              .getByLabel("Begründung")
              .fill("Darum brauchen wir das nicht.");
          }
          const { body } = await interceptMail(page);
          expect(body).toContain(
            "Bitte beachten Sie: Wenn Ihr Vorhaben keinen Digitalbezug aufweist, können die Anforderungen der Interoperabilität nicht erfüllt werden",
          );
        });
      }
    } else {
      test("form is not shown", async () => {
        await expect(page.getByTestId("result-form")).toBeHidden();
      });
    }

    if (scenario.expected.showsUnsureHint) {
      test("page contains hint regarding unsure interoperability", async () => {
        await expect(page.getByRole("main")).toContainText(
          "Das können Sie tun: Kontaktieren Sie uns unter",
        );
      });
    }

    if (scenario.expected.resultPrefixes) {
      test("answers in email body are prefixed by a special character indicating the type of answer", async () => {
        await page
          .getByLabel("Arbeitstitel des Vorhabens")
          .fill("Vorhaben ABC");
        const bodyContains = [
          `- ${questions[0].negativeResult}`,
          `? ${questions[1].positiveResult}`,
          `+ ${questions[2].positiveResult}`,
        ];
        const { body } = await interceptMail(page);
        bodyContains.forEach((containedString) => {
          expect(body).toContain(containedString);
        });
      });
    }

    if (
      scenario.expected.formIsVisible !== false &&
      scenario.expected.linksAreVisible !== false &&
      !scenario.expected.headline.includes("Sie haben mehrere Aussagen mit")
    ) {
      test("result page links to methods", async () => {
        await page.getByRole("link", { name: "Zu „Erarbeiten“" }).click();
        await expect(page).toHaveURL(ROUTE_METHODS.url);
      });

      test("result page links to documentation", async () => {
        await page.getByRole("link", { name: "Zu „Dokumentieren“" }).click();
        await expect(page).toHaveURL(ROUTE_DOCUMENTATION.url);
      });
    }

    if (scenario.expected.allPositive) {
      test("email body contains all answers in positive form", async () => {
        await page
          .getByLabel("Arbeitstitel des Vorhabens")
          .fill("Vorhaben ABC");
        const bodyContains = [
          "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
          "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
        ];

        questions.forEach((question) => {
          bodyContains.push(question.positiveResult);
        });

        const { body } = await interceptMail(page);
        bodyContains.forEach((containedString) => {
          expect(body).toContain(containedString);
        });
      });
    }

    if (scenario.expected.allNegative) {
      test("email body contains all answers in negative form", async () => {
        await page
          .getByLabel("Arbeitstitel des Vorhabens")
          .fill("Vorhaben ABC");
        await page
          .getByLabel("Begründung")
          .fill("Darum brauchen wir das nicht.");
        const bodyContains = [
          "In Bezug auf digitale Aspekte führt ihr Regelungsvorhaben zu...",
          "In Bezug auf Interoperabilität führt ihr Regelungsvorhaben zu...",
        ];

        for (const question of questions) {
          bodyContains.push(question.negativeResult);
        }

        const { body } = await interceptMail(page);
        bodyContains.forEach((containedString) => {
          expect(body).toContain(containedString);
        });
      });
    }

    if (scenario.expected.dcPositiveIOunsure) {
      test("email body contains all answers for interoperability in unsure form", async () => {
        await page
          .getByLabel("Arbeitstitel des Vorhabens")
          .fill("Vorhaben ABC");
        const bodyContains = [
          "In Bezug auf Interoperabilität ist nicht sicher, ob Ihr Regelungsvorhaben zu Folgendem führt...",
        ];

        questions
          .filter((question) => question.interoperability)
          .forEach((question) => {
            bodyContains.push(question.positiveResult);
          });

        const { body } = await interceptMail(page);
        bodyContains.forEach((containedString) => {
          expect(body).toContain(containedString);
        });
      });
    }

    if (scenario.expected.emailBodyContains) {
      test("email body contains expected content", async () => {
        await page
          .getByLabel("Arbeitstitel des Vorhabens")
          .fill("Vorhaben ABC");
        if (scenario.expected.showsNegativeReasoning) {
          await page
            .getByLabel("Begründung")
            .fill("Darum brauchen wir das nicht.");
        }
        const { body } = await interceptMail(page);
        scenario.expected.emailBodyContains?.forEach((containedString) => {
          expect(body).toContain(containedString);
        });
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
          name: preCheckResult.form.copyAddressButton.text,
        });
        await expect(copyAddressButton).toBeVisible();
        await copyAddressButton.click();

        await expect(
          page.getByRole("button", {
            name: preCheckResult.form.copyAddressButton.text,
          }),
        ).toBeVisible();

        let expectedClipboardText = preCheckResult.form.emailTemplate.toNkr;
        if (scenario.expected.interopIsPositive) {
          const interopEmail = preCheckResult.form.emailTemplate.toDC;

          expectedClipboardText += `, ${interopEmail}`;
        }

        const clipboardText = await page.evaluate(() =>
          navigator.clipboard.readText(),
        );
        expect(clipboardText).toBe(expectedClipboardText);
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
        const titleInputLocator = page.getByLabel("Arbeitstitel des Vorhabens");
        const reasoningInputLocator = page.getByLabel("Begründung");

        if (await titleInputLocator.isVisible()) {
          await titleInputLocator.fill("Test title");
        }
        if (
          scenario.expected.showsNegativeReasoning &&
          (await reasoningInputLocator.isVisible())
        ) {
          await reasoningInputLocator.fill("Test Begründung");
        }

        const expectedEmailBodyFromUI = await getEmailPreviewBodyFromPage(page);

        const copyContentButton = page.getByRole("button", {
          name: preCheckResult.form.copyMailButton.text,
        });
        await expect(copyContentButton).toBeVisible();
        await copyContentButton.click();

        await expect(
          page.getByRole("button", {
            name: preCheckResult.form.copyMailButton.textCopied,
          }),
        ).toBeVisible();
        const clipboardText = await page.evaluate(() =>
          navigator.clipboard.readText(),
        );
        expect(clipboardText).toBe(expectedEmailBodyFromUI);
      });
    }

    if (scenario.expected.negativeReasoningText) {
      test("email body contains negative reasoning", async () => {
        const reasoningText = scenario.expected.negativeReasoningText ?? "";
        await page
          .getByLabel("Arbeitstitel des Vorhabens")
          .fill("Vorhaben ABC");
        await page.getByLabel("Begründung").fill(reasoningText);

        const { body } = await interceptMail(page);
        expect(body).toContain("Begründung:");
        expect(body).toContain(reasoningText);
      });
    }
  });
}

test.describe("test redirect to pre-check in case of missing answers", () => {
  test.describe.configure({ mode: "default" });

  test("result page redirects to pre-check landing page if no question was answered", async ({
    page,
  }) => {
    await page.goto(ROUTE_PRECHECK_RESULT.url);
    await expect(page).toHaveURL(ROUTE_PRECHECK.url);
  });

  test("result page redirects to first unanswered question if not all questions have been answered", async ({
    page,
  }) => {
    await page.goto(preCheck.questions[0].url);
    await page.getByLabel("Nein").click();
    await page.getByRole("button", { name: "Übernehmen" }).click();
    await page.goto(ROUTE_PRECHECK_RESULT.url);
    await expect(page).toHaveURL(ROUTE_PRECHECK.url);
  });
});
