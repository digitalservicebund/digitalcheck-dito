import { Outlet, useLoaderData, useRouteLoaderData } from "react-router";
import Nav from "~/components/Nav";
import Stepper from "~/components/Stepper";
import { preCheck } from "~/resources/content/vorpruefung";
import { getAnswersFromCookie } from "~/utils/cookies.server";
import type { Route } from "./+types/vorpruefung._preCheckNavigation";
import { loader as preCheckQuestionLoader } from "./vorpruefung._preCheckNavigation.$questionId";

const { questions } = preCheck;

export async function loader({ request }: Route.LoaderArgs) {
  const { answers } = await getAnswersFromCookie(request);
  return { answers };
}

export default function LayoutWithPreCheckNavigation() {
  const { answers } = useLoaderData<typeof loader>();
  const question = useRouteLoaderData<typeof preCheckQuestionLoader>(
    "routes/vorpruefung._preCheckNavigation.$questionId",
  )?.question;
  const showLinkBar = !!question;
  const firstUnansweredQuestionIndex = answers
    ? Object.keys(answers).length
    : -1;

  return (
    <div className="parent-bg-blue container flex max-w-none justify-center space-x-80 bg-blue-100 py-40 lg:py-80">
      <div className="hidden flex-none lg:block">
        <Nav ariaLabel="Alle Fragen" activeElementUrl={question?.url}>
          <Nav.Items>
            {questions.map(({ id, url, title }, i) => (
              <Nav.Item
                key={url}
                url={url}
                completed={id in answers}
                disabled={i > firstUnansweredQuestionIndex}
              >
                {title}
              </Nav.Item>
            ))}
          </Nav.Items>
        </Nav>
      </div>
      <div className="w-[51rem] space-y-40">
        {showLinkBar && (
          <div className="lg:hidden">
            <Stepper currentElementUrl={question.url} elements={questions} />
          </div>
        )}
        <section>
          <Outlet />
        </section>
      </div>
    </div>
  );
}
