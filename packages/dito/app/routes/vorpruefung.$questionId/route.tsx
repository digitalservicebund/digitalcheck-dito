import Button from "@digitalcheck/shared/components/Button";
import ButtonContainer from "@digitalcheck/shared/components/ButtonContainer";
import Container from "@digitalcheck/shared/components/Container";
import InlineNotice from "@digitalcheck/shared/components/InlineNotice";
import Question from "@digitalcheck/shared/components/Question";
import {
  ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Form,
  MetaFunction,
  redirect,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { preCheck, siteMeta } from "resources/content";
import { PATH_PRECHECK } from "resources/staticRoutes";
import {
  getAnswersFromCookie,
  getHeaderFromCookie,
} from "utils/cookies.server";
import PreCheckNavigation from "./PreCheckNavigation";

const { questions, answerOptions, nextButton } = preCheck;

export const meta: MetaFunction = () => {
  return [{ title: `${preCheck.start.title} — ${siteMeta.title}` }];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { answers } = await getAnswersFromCookie(request);
  const questionIdx = questions.findIndex((q) => q.id === params.questionId);
  // return 404 if the question is not found
  if (questionIdx === -1) {
    throw new Response("Question not found", {
      status: 404,
      statusText: "Not Found",
    });
  }
  // if the user accesses a question where they haven't answered the previous questions, redirect them to the first unanswered question
  const firstUnansweredQuestionIdx = Object.keys(answers).length;
  if (questionIdx > firstUnansweredQuestionIdx) {
    return redirect(questions[firstUnansweredQuestionIdx].url, {
      status: 302,
    });
  }

  return json({ questionIdx, question: questions[questionIdx], answers });
}

export async function action({ request }: ActionFunctionArgs) {
  const cookie = await getAnswersFromCookie(request);
  const formData = await request.formData();
  const { answer, questionId } = Object.fromEntries(formData);
  if (typeof questionId !== "string") {
    return redirect("/vorpruefung", { status: 400 });
  }
  cookie.answers[questionId] = answer as Option["value"];
  const nextLink =
    questions.find((q) => q.id === questionId)?.nextLink ?? PATH_PRECHECK;

  return redirect(nextLink, await getHeaderFromCookie(cookie));
}

export type TQuestion = {
  id: string;
  title: string;
  question: string;
  positiveResult: string;
  negativeResult: string;
  text?: string;
  url: string;
  prevLink: string;
  nextLink: string;
  hint?: {
    title: string;
    text: string;
  };
};

export type Option = {
  value: "yes" | "no" | "unsure";
  text: string;
};

export type Answers = {
  [x: string]: Option["value"];
};

export default function Index() {
  const { question, answers } = useLoaderData<typeof loader>();
  const existingAnswer = answers?.[question.id];
  const fetcher = useFetcher();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [selectedOption, setSelectedOption] = useState<
    Option["value"] | undefined
  >(existingAnswer);

  useEffect(() => {
    setSelectedOption(existingAnswer);
    // needed to keep data in sync with the form
    setValue("answer", existingAnswer);
    setValue("questionId", question.id);
  }, [question.id, existingAnswer, setValue]);

  const onSubmit = (data: Record<string, string>) => {
    fetcher.submit(data, { method: "post" });
  };

  const options: Option[] = Object.entries(answerOptions).map(
    ([value, text]) => ({ value: value as Option["value"], text }),
  );

  return (
    <div className="flex bg-blue-100">
      <div className="hidden lg:block flex-none pt-32 pl-32">
        <PreCheckNavigation question={question} answers={answers ?? {}} />
      </div>
      <section>
        <Form className="pt-32" method="post" onSubmit={handleSubmit(onSubmit)}>
          {/* This is needed if JavaScript is disabled */}
          <input type="hidden" name="questionId" value={question.id} />
          <Question
            paddingBottom="32"
            box={{
              heading: {
                text: question.question,
                tagName: "h1",
                look: "ds-heading-02-reg",
              },
              content: question.text ? { markdown: question.text } : undefined,
            }}
            radio={{
              name: "answer",
              options: options,
              selectedValue: selectedOption,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedOption(e.target.value as Option["value"]),
              formRegister: register,
              error: errors[question.id],
            }}
          />
          <Container paddingTop="0">
            <ButtonContainer>
              <Button
                id="preCheck-next-button"
                text={nextButton}
                size="large"
                type="submit"
              ></Button>
              <Button
                id="preCheck-back-button"
                text="Zurück"
                href={question.prevLink}
                size="large"
                look="tertiary"
              ></Button>
            </ButtonContainer>
          </Container>
        </Form>
        {question.hint && (
          <Container paddingTop="0">
            <InlineNotice
              look="tips"
              title={question.hint.title}
              tagName="h2"
              content={question.hint.text}
            ></InlineNotice>
          </Container>
        )}
        <Container paddingTop="0" additionalClassNames="lg:hidden">
          <PreCheckNavigation question={question} answers={answers ?? {}} />
        </Container>
      </section>
    </div>
  );
}
