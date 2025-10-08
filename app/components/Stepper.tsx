import { Link } from "react-router";
import { twJoin } from "tailwind-merge";

const Stepper = <T extends { url: string; title: string }>({
  elements,
  currentElementUrl,
}: {
  elements: (T[] | T)[];
  currentElementUrl: string;
}) => {
  const currentIndex = elements.findIndex((element) =>
    Array.isArray(element)
      ? element.map(({ url }) => url).includes(currentElementUrl)
      : element.url === currentElementUrl,
  );

  return (
    <div className="flex justify-center space-x-8">
      {elements.map((element, index) => {
        const el = Array.isArray(element) ? element[0] : element;

        return (
          <Link
            key={el.url}
            to={el.url}
            aria-label={el.title}
            className={twJoin(
              "h-6 flex-1 transition-all duration-300",
              index <= currentIndex ? "bg-blue-800" : "bg-blue-300",
            )}
          />
        );
      })}
    </div>
  );
};

export default Stepper;
