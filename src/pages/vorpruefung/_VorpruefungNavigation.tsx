import type { ReactNode } from "react";
import Nav from "~/components/Nav";
import Stepper from "~/components/Stepper";
import { preCheck } from "~/resources/content/vorpruefung";
import { usePreCheckData } from "~/routes/vorpruefung/preCheckDataHook";

const { questions } = preCheck;

export default function VorpruefungNavigation({
  children,
  pathname,
}: Readonly<{
  children: ReactNode;
  pathname: string;
}>) {
  const { answers, firstUnansweredQuestionIndex } = usePreCheckData();

  return (
    <div className="parent-bg-blue container flex max-w-none justify-center space-x-80 bg-blue-100 py-40 lg:py-80">
      <div className="hidden w-[265px] flex-none lg:block">
        <Nav
          ariaLabel="Alle Fragen"
          activeElementUrl={pathname}
          testId="main-nav"
        >
          <Nav.Items>
            {questions.map(({ id, path, title }, i) => (
              <Nav.Item
                key={path}
                url={path}
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
        {pathname && (
          <Stepper
            className="lg:hidden"
            currentElementUrl={pathname}
            elements={questions}
            firstUnansweredQuestionIndex={firstUnansweredQuestionIndex ?? 0}
          />
        )}
        <main>{children}</main>
      </div>
    </div>
  );
}
