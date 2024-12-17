import Container from "@digitalcheck/shared/components/Container";
import { NumberedList } from "@digitalcheck/shared/components/List";
import { preCheck } from "resources/content";
import { PreCheckAnswers } from "routes/vorpruefung.$questionId/route";
import getReasoningText from "./getReasoningText";
import ResultForm from "./ResultForm";
import ResultHeader from "./ResultHeader";
import { ResultType, TResult } from "./TResult.tsx";

const { title, reasoningIntro, nextSteps } = preCheck.result.positive;

export default function ResultPositive({
  answers,
  result,
}: Readonly<{
  answers: PreCheckAnswers;
  result: TResult;
}>) {
  const positiveQuestions = Object.keys(answers).filter(
    (key) => answers[key] === "yes",
  );

  const reasonsText = getReasoningText(
    positiveQuestions,
    reasoningIntro,
    "positiveResult",
  );

  let titleInteroperability: string = "";
  if (result.interoperability === ResultType.POSITIVE) {
    titleInteroperability = preCheck.result.interoperability.positive.title;
  } else if (result.interoperability === ResultType.NEGATIVE) {
    titleInteroperability = preCheck.result.interoperability.negative.title;
  } else {
    titleInteroperability = preCheck.result.interoperability.unsure.title;
  }

  return (
    <>
      <ResultHeader
        resultType="positive"
        resultHeading={title + titleInteroperability}
        reasonsText={reasonsText}
        resultBackgroundColor="midBlue"
      >
        <ResultForm answers={answers} />
      </ResultHeader>
      <Container>
        <NumberedList
          heading={{
            text: nextSteps.title,
            tagName: "h2",
          }}
          items={nextSteps.steps}
        />
      </Container>
    </>
  );
}
