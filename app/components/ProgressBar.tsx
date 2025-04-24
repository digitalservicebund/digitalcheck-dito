import { useLocation } from "react-router";
import { progress } from "~/resources/content/progress";
import twMerge from "~/utils/tailwindMerge";

export default function Progress() {
  const { pathname } = useLocation();
  return (
    <nav
      className="flex justify-center bg-blue-300 sm:gap-24"
      aria-label="Digitalcheck-Fortschritt"
    >
      <ol className="flex list-none">
        {progress.map((item, index) => {
          const isActive = pathname.startsWith(item.prefix);
          return (
            <li
              key={item.label}
              aria-current={isActive ? "step" : undefined}
              className={twMerge(
                "mb-0 flex px-12 pt-8 pb-4 text-blue-800 max-md:flex-col md:border-b-4",
                isActive ? "border-blue-800 font-bold" : "border-transparent",
              )}
            >
              <div
                className={twMerge(
                  "mr-8 flex h-24 w-24 items-center justify-center rounded-full border-2",
                  isActive
                    ? "border-blue-800 bg-blue-800 text-white"
                    : "border-white",
                )}
              >
                {index + 1}
              </div>
              <span className="hidden md:block">{item.label}</span>
              <span className="md:hidden">{item.labelShort}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
