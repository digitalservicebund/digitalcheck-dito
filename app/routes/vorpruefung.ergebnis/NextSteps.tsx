import NumberedList from "~/components/NumberedList";
import RichText from "~/components/RichText";
import { steps } from "~/resources/content/shared/naechste-schritte";
import type { Step, StepConditionProps } from "~/utils/contentTypes.ts";

function getNextSteps(props: StepConditionProps): Step[] {
  const satisfiesConditions = (step: Step) =>
    step.condition ? step.condition(props) : true;
  return [
    steps.preCheck.finished,
    steps.methodsBund,
    steps.methodsBundesland,
    steps.documentation,
    steps.pruefstelleBund,
    steps.pruefstelleBundesland,
  ].filter(satisfiesConditions);
}

export function NextSteps(props: Readonly<StepConditionProps>) {
  const nextSteps = getNextSteps(props);
  return (
    <>
      <h2>So machen Sie weiter</h2>
      <NumberedList>
        {nextSteps.map((item) => (
          <NumberedList.Item
            className="space-y-16"
            key={item.headline.text}
            disabled={item.isDisabled}
          >
            <p className="ds-heading-03-reg">{item.headline.text}</p>
            {"content" in item && (
              <RichText markdown={item.content as string} />
            )}
            {item.link && <a href={item.link.to}>{item.link.text}</a>}
          </NumberedList.Item>
        ))}
      </NumberedList>
    </>
  );
}
