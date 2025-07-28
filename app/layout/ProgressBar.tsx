import { useLocation } from "react-router";
import { progress } from "~/resources/content/progress";
import twMerge from "~/utils/tailwindMerge";

export default function Progress() {
  const { pathname } = useLocation();
  return (
    <nav
      className="bg-ds-mid-blue flex justify-center"
      aria-label="Digitalcheck-Fortschritt"
    >
      <ol className="list-unstyled flex list-none gap-20 sm:gap-40">
        {progress.map((item, index) => {
          const isActive = pathname.startsWith(item.prefix);
          return (
            <li
              key={item.label}
              aria-current={isActive ? "step" : undefined}
              className={twMerge(
                "text-ds-dark-blue mb-0 flex items-center py-14 max-md:flex-col",
                isActive && "font-bold",
              )}
            >
              <span
                className={twMerge(
                  "ds-label-02-reg mr-8 flex h-24 w-24 items-center justify-center rounded-full border-2",
                  isActive
                    ? "bg-ds-dark-blue border-ds-dark-blue font-bold text-white"
                    : "border-white",
                )}
              >
                {index + 1}
              </span>
              <span className="hidden md:block">{item.label}</span>
              <span className="md:hidden">{item.labelShort}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
