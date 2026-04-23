import { type ReactNode } from "react";
import Nav from "~/components/Nav";
import Stepper from "~/components/Stepper";
import { preCheck } from "~/resources/content/vorpruefung";
import { useLocation } from "~/utils/routerCompat";
import { usePreCheckData } from "./vorpruefung/preCheckDataHook";

const { questions } = preCheck;

export default function LayoutWithPreCheckNavigation({
  children,
}: {
  children?: ReactNode;
}) {
  const { answers, firstUnansweredQuestionIndex } = usePreCheckData();

  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];
  const question = questions.find((q) => q.id === lastSegment);
  const showLinkBar = !!question;

  return (
    <div className="parent-bg-blue container flex max-w-none justify-center space-x-80 bg-blue-100 py-40 lg:py-80">
      <div className="hidden flex-none lg:block">
        <Nav
          ariaLabel="Alle Fragen"
          activeElementUrl={question?.url}
          testId="main-nav"
        >
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
          <Stepper
            className="lg:hidden"
            currentElementUrl={question.url}
            elements={questions}
            firstUnansweredQuestionIndex={firstUnansweredQuestionIndex ?? 0}
          />
        )}
        <main>{children}</main>
      </div>
    </div>
  );
}
