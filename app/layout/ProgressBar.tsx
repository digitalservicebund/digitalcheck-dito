import { useLocation } from "react-router";
import { progress } from "~/resources/content/progress";
import twMerge from "~/utils/tailwindMerge";

export default function Progress() {
  const { pathname } = useLocation();
  return (
    <nav
      className="container mt-8 mb-16 flex justify-center py-0"
      aria-label={progress.ariaLabel}
    >
      <ol className="list-unstyled relative container flex w-full list-none justify-between gap-20 p-0 px-8 after:absolute after:top-[25px] after:left-0 after:-z-10 after:w-full after:border-b-2 after:border-blue-500 sm:gap-40 sm:px-14">
        {progress.items.map((item, index) => {
          const isActive = pathname.startsWith(item.prefix);
          return (
            <li
              key={item.label}
              aria-current={isActive ? "step" : undefined}
              className={twMerge(
                "ds-label-02-reg mb-0 flex flex-col gap-8 py-14",
                isActive && "font-bold",
              )}
            >
              <span
                className={twMerge(
                  "ds-label-02-bold mr-8 flex h-24 w-24 items-center justify-center rounded-full border-2 border-blue-800",
                  isActive
                    ? "bg-blue-800 text-white"
                    : "bg-white text-blue-800",
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
