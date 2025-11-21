import { Outlet, useRouteLoaderData } from "react-router";
import Nav from "~/components/Nav";
import Stepper from "~/components/Stepper";
import { preCheck } from "~/resources/content/vorpruefung";
import { loader as preCheckQuestionLoader } from "./vorpruefung._preCheckNavigation.$questionId";
import { usePreCheckData } from "./vorpruefung/preCheckDataHook";

const { questions } = preCheck;

export default function LayoutWithPreCheckNavigation() {
  const { answers, firstUnansweredQuestionIndex } = usePreCheckData();

  const question = useRouteLoaderData<typeof preCheckQuestionLoader>(
    "routes/vorpruefung._preCheckNavigation.$questionId",
  )?.question;
  const showLinkBar = !!question;

  return (
    <div className="parent-bg-blue container flex max-w-none justify-center space-x-80 bg-blue-100 py-40 lg:py-80">
      <div className="hidden flex-none lg:block">
        <Nav ariaLabel="Alle Fragen" activeElementUrl={question?.url}>
          <Nav.Items>
            {questions.map(({ id, url, title }, i) => (
              <Nav.Item
                key={url}
                url={url}
                completed={answers.some(({ questionId }) => questionId === id)}
                disabled={i > (firstUnansweredQuestionIndex ?? 0)}
              >
                {title}
              </Nav.Item>
            ))}
          </Nav.Items>
        </Nav>
      </div>
      <div className="w-[51rem] space-y-40">
        {showLinkBar && (
          <div className="lg:hidden" data-testid="stepper">
            <Stepper
              currentElementUrl={question.url}
              elements={questions}
              firstUnansweredQuestionIndex={firstUnansweredQuestionIndex ?? 0}
            />
          </div>
        )}
        <section>
          <Outlet key={question?.url} />
        </section>
      </div>
    </div>
  );
}
