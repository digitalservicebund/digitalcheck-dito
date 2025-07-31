import Check from "@digitalservicebund/icons/Check";
import { useId } from "react";
import { Link, Outlet, useLoaderData, useRouteLoaderData } from "react-router";
import { twJoin } from "tailwind-merge";
import Container from "~/components/Container";
import Stepper from "~/components/Stepper";
import { preCheck } from "~/resources/content/vorpruefung";
import { getAnswersFromCookie } from "~/utils/cookies.server";
import customTwMerge from "~/utils/tailwindMerge";
import type { Route } from "./+types/vorpruefung._preCheckNavigation";
import {
  loader as preCheckQuestionLoader,
  type PreCheckAnswers,
  type TQuestion,
} from "./vorpruefung._preCheckNavigation.$questionId";

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

  return (
    <div className="parent-bg-blue flex justify-center bg-blue-100 pt-32">
      <div className="hidden flex-none pl-32 lg:block">
        <PreCheckNavigation question={question} answers={answers ?? {}} />
      </div>
      <div className="w-[51rem]">
        {showLinkBar && (
          <Container className="pt-0 lg:hidden">
            <Stepper currentElementUrl={question.url} elements={questions} />
          </Container>
        )}
        <section>
          <Outlet />
        </section>
      </div>
    </div>
  );
}

type PreCheckNavigationProps = Readonly<{
  question?: TQuestion;
  answers?: PreCheckAnswers;
}>;

function PreCheckNavigation({ question, answers }: PreCheckNavigationProps) {
  const firstUnansweredQuestionIdx = answers ? Object.keys(answers).length : -1;
  const questions = preCheck.questions;

  return (
    <nav aria-label={preCheck.nav.ariaLabel}>
      <ul className="list-unstyled">
        {questions.map((q: TQuestion, idx) => {
          const isDone = !!answers && q.id in answers;
          const isCurrent = q.id === question?.id;
          const isDisabled = idx > firstUnansweredQuestionIdx;
          return (
            <NavItem
              key={q.id}
              url={q.url}
              label={q.title}
              isCurrent={isCurrent}
              isDone={isDone}
              isDisabled={isDisabled}
            />
          );
        })}
      </ul>
    </nav>
  );
}

export type NavItem = {
  url: string;
  label: string;
  isDisabled: boolean;
  isCurrent: boolean;
  isDone: boolean;
};

function NavItem({
  url,
  label,
  isDisabled,
  isCurrent,
  isDone,
}: Readonly<NavItem>) {
  const liClassNames = twJoin(
    "border-b-1 border-b-white border-l-4",
    isCurrent ? "border-l-blue-800 pointer-events-none" : "border-l-blue-100",
    isDisabled && "text-gray-800 pointer-events-none",
  );

  // Transparent left borders to avoid layout shifts
  const itemClassNames = customTwMerge(
    "bg-blue-100 w-full ds-label-02-reg p-16 flex gap-x-4 items-center hover:underline hover:bg-blue-300 active:bg-white focus-visible:shadow-[inset_0px_0px_0px_4px] focus:shadow-blue-800",
    isCurrent && "ds-label-02-bold bg-blue-400",
  );
  const iconId = useId();

  return (
    <li className={liClassNames}>
      <Link
        to={url}
        className={itemClassNames}
        aria-disabled={isDisabled || isCurrent}
        aria-current={isCurrent}
        aria-describedby={iconId}
      >
        {isDone && <Check id={iconId} className="shrink-0" />}
        <span
          title={label}
          className="after:ds-label-02-bold after:invisible after:block after:h-0 after:content-[attr(title)]" // Prevent shifting on navigation
        >
          {label}
        </span>
      </Link>
    </li>
  );
}
