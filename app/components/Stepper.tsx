import { Link } from "react-router";
import { twJoin } from "tailwind-merge";

const Stepper = <T extends { url: string; title: string }>({
  elements,
  currentElementUrl,
}: {
  elements: T[];
  currentElementUrl: string;
}) => {
  const currentIndex = elements.findIndex(
    (element) => element.url === currentElementUrl,
  );

  return (
    <div className="flex justify-center space-x-8">
      {elements.map((element, index) => (
        <Link
          key={element.url}
          to={element.url}
          aria-label={element.title}
          className={twJoin(
            "h-6 flex-1 transition-all duration-300",
            index <= currentIndex ? "bg-ds-dark-blue" : "bg-ds-mid-blue",
          )}
        />
      ))}
    </div>
  );
};

export default Stepper;
