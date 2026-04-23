import { progress } from "~/resources/content/progress";
import { useLocation } from "~/utils/routerCompat";
import twMerge from "~/utils/tailwindMerge";

export default function Progress() {
  const { pathname } = useLocation();
  return (
    <nav
      className="relative container mt-8 mb-16 flex justify-center"
      aria-label={progress.ariaLabel}
    >
      <div // line between first and last circle
        aria-hidden="true"
        className="absolute top-[calc(anchor(--progress-start_center)-1px)] right-[anchor(--progress-end_center)] left-[anchor(--progress-start_center)] -z-10 h-[2px] bg-blue-500"
      />
      <ol className="list-unstyled container flex w-full list-none justify-between gap-20 px-8 sm:gap-40 sm:px-14">
        {progress.items.map((item, index) => {
          const isActive = pathname.startsWith(item.prefix);
          const isFirst = index === 0;
          const isLast = index === progress.items.length - 1;
          return (
            <li
              key={item.label}
              aria-current={isActive ? "step" : undefined}
              className={twMerge(
                "ds-label-02-reg mb-0 flex flex-col items-center gap-8 py-14",
                isActive && "font-bold",
              )}
            >
              <span
                className={twMerge(
                  "ds-label-02-bold mr-8 flex h-24 w-24 items-center justify-center rounded-full border-2 border-blue-800",
                  isFirst && "[anchor-name:--progress-start]",
                  isLast && "[anchor-name:--progress-end]",
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
