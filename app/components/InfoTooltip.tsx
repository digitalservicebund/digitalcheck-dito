import { InfoOutlined } from "@digitalservicebund/icons";
import { useRef, useState } from "react";
import { twJoin } from "tailwind-merge";
import { useResize } from "~/hooks/deviceHook";
import { idFromText } from "~/utils/utilFunctions";

type InfoTooltipProps = {
  children: string;
};

type Position = "left" | "right";

const TOOLTIP_TEXT_WIDTH = 160;

export default function InfoTooltip({ children }: Readonly<InfoTooltipProps>) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>("right");
  const tooltipRef = useRef<HTMLButtonElement>(null);

  useResize(() => {
    const tooltipBtn = tooltipRef.current;
    if (!tooltipBtn) return;

    const { right } = tooltipBtn.getBoundingClientRect();
    const offsetRight = window.innerWidth - (right + 10);

    if (offsetRight > TOOLTIP_TEXT_WIDTH) setPosition("right");
    else setPosition("left");
  });

  const toggleOpen = () => setOpen((prevOpenState) => !prevOpenState);
  const id = idFromText(children, "tooltip");

  const classNamesArrowLeft =
    "top-1/2 -left-6 -translate-y-1/2 border-t-0 border-r-0";

  const classNamesArrowRight =
    "top-1/2 -right-6 -translate-y-1/2 border-b-0 border-l-0";

  return (
    <div className="relative mb-4 ml-4 inline-flex flex-row items-center align-middle">
      <button
        ref={tooltipRef}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={toggleOpen}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-describedby={id}
      >
        <InfoOutlined className="size-20" />
        <span className="sr-only">Info</span>
      </button>
      <div
        id={id}
        role="tooltip"
        className={twJoin(
          "ds-label-03-reg absolute w-160 rounded-sm border border-blue-300 bg-blue-100 px-12 py-8 text-gray-900 transition-opacity duration-300",
          position === "left" ? "right-full mr-10" : "left-full ml-10",
          open ? "opacity-100" : "opacity-0",
        )}
      >
        {/* Tooltip Arrow */}
        <span
          className={twJoin(
            "absolute h-12 w-12 rotate-45 border border-blue-300 bg-blue-100",
            position === "left" ? classNamesArrowRight : classNamesArrowLeft,
          )}
          aria-hidden
        ></span>

        {children}
      </div>
    </div>
  );
}
