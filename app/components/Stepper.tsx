import { twJoin } from "tailwind-merge";
import { Link } from "~/utils/routerCompat";

const Stepper = <T extends { path: string; title: string }>({
  elements,
  currentElementUrl,
  firstUnansweredQuestionIndex,
  className,
}: {
  elements: T[];
  currentElementUrl: string;
  firstUnansweredQuestionIndex?: number;
  className?: string;
}) => {
  const currentIndex = elements.findIndex(
    (element) => element.path === currentElementUrl,
  );

  return (
    <nav
      className={twJoin("flex justify-center space-x-8", className)}
      data-testid="stepper"
    >
      {elements.map((el, index) => {
        const isReachable =
          index <= (firstUnansweredQuestionIndex ?? currentIndex);

        if (!isReachable)
          return (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              role="link"
              key={el.path}
              aria-disabled="true"
              className={"h-6 flex-1 bg-blue-300 transition-all duration-300"}
            >
              <span className="sr-only">{el.title}</span>
            </a>
          );
        return (
          <Link
            key={el.path}
            to={el.path}
            className={twJoin(
              "h-6 flex-1 transition-all duration-300",
              index <= currentIndex ? "bg-blue-800" : "bg-blue-600",
            )}
          >
            <span className="sr-only">{el.title}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Stepper;
