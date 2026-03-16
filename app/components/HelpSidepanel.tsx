import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
} from "@digitalservicebund/icons";
import { useEffect, useRef } from "react";
import { twJoin } from "tailwind-merge";
import { useHelpPanel } from "~/contexts/HelpPanelContext";
import { useElResize, useScroll } from "~/hooks/deviceHook";
import customTwMerge from "~/utils/tailwindMerge";

type HelpSidepanelProps = {
  className?: string;
};

export default function HelpSidepanel({
  className,
}: Readonly<HelpSidepanelProps>) {
  const { isOpen, sections, activeSection, openPanel, closePanel } =
    useHelpPanel();
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && activeSection && scrollableRef.current) {
      const target = scrollableRef.current.querySelector<HTMLElement>(
        `#help-section-${activeSection}`,
      );
      if (target) {
        const containerTop = scrollableRef.current.getBoundingClientRect().top;
        const targetTop = target.getBoundingClientRect().top;
        scrollableRef.current.scrollTo({
          top:
            scrollableRef.current.scrollTop + (targetTop - containerTop) - 16,
          behavior: "smooth",
        });
      }
    }
  }, [isOpen, activeSection]);

  const adjustSize = () => {
    const parent = document.getElementsByTagName("main")[0];
    if (!parent) return;

    const el = scrollableRef.current;
    if (!el) return;

    const rect = parent.getBoundingClientRect();
    const visibleHeight = Math.max(
      0,
      Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top),
    );

    el.style.maxHeight = `${visibleHeight}px`;
  };

  useScroll(adjustSize);
  useElResize("main", adjustSize, true);

  return (
    <div
      className={customTwMerge(
        "help border-l border-blue-300 bg-white",
        !isOpen && "w-32 justify-self-end",
        className,
      )}
    >
      <div
        className={twJoin(
          "sticky top-0",
          "before:pointer-events-none before:absolute before:top-0 before:right-16 before:left-0 before:h-40 before:bg-[linear-gradient(to_bottom,white,transparent)] before:blur-xs before:content-['']",
          "after:pointer-events-none after:absolute after:right-16 after:bottom-0 after:left-0 after:h-40 after:bg-[linear-gradient(to_top,white,transparent)] after:blur-xs after:content-['']",
        )}
      >
        {/* Toggle tab */}
        <button
          type="button"
          aria-label={isOpen ? "Hilfe-Panel schließen" : "Hilfe-Panel öffnen"}
          className={twJoin(
            "absolute top-40 -left-20 flex h-40 w-40 items-center justify-center self-start rounded-full border border-r-0 border-blue-300 bg-white text-blue-800",
            "hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800",
          )}
          onClick={() => (isOpen ? closePanel() : openPanel())}
        >
          {isOpen ? (
            <ChevronRightOutlined className="h-20 w-20" />
          ) : (
            <ChevronLeftOutlined className="h-20 w-20" />
          )}
        </button>

        {/* Panel content */}
        {isOpen ? (
          <div
            ref={scrollableRef}
            className="max-h-screen overflow-y-hidden py-40 [scrollbar-gutter:stable] hover:overflow-y-auto"
          >
            <div className="w-full space-y-32 pr-16 pl-32">
              {sections.map((section) => (
                <div
                  key={section.id}
                  id={`help-section-${section.id}`}
                  className="scroll-mt-40"
                >
                  <h3 className="ds-label-02-bold mb-8 text-blue-800">
                    {section.title}
                  </h3>
                  <p className="ds-body-02-reg">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-160 text-blue-800">
            <span className="vertical-text">Hilfe</span>
          </div>
        )}
      </div>
    </div>
  );
}
