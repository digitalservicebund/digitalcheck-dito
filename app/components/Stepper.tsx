import { Link } from "react-router";
import { twJoin } from "tailwind-merge";

const Stepper = <T extends { url: string; title: string }>({
  elements,
  currentElementUrl,
  firstUnansweredQuestionIndex,
}: {
  elements: T[];
  currentElementUrl: string;
  firstUnansweredQuestionIndex?: number;
}) => {
  const currentIndex = elements.findIndex(
    (element) => element.url === currentElementUrl,
  );

  return (
    <div className="flex justify-center space-x-8">
      {elements.map((el, index) => {
        const isReachable =
          index <= (firstUnansweredQuestionIndex ?? currentIndex);

        if (!isReachable)
          return (
            <div
              key={el.url}
              aria-label={el.title}
              aria-disabled="true"
              className={"h-6 flex-1 bg-blue-300 transition-all duration-300"}
            />
          );
        return (
          <Link
            key={el.url}
            to={el.url}
            aria-label={el.title}
            className={twJoin(
              "h-6 flex-1 transition-all duration-300",
              index <= currentIndex ? "bg-blue-800" : "bg-blue-600",
            )}
          />
        );
      })}
    </div>
  );
};

export default Stepper;
