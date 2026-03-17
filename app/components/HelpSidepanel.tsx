import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
} from "@digitalservicebund/icons";
import { useEffect, useRef } from "react";
import { twJoin } from "tailwind-merge";
import { useHelpPanel } from "~/contexts/HelpPanelContext";
import { useElResize, useScroll } from "~/hooks/deviceHook";
import customTwMerge from "~/utils/tailwindMerge";
import RichText from "./RichText";

function ToggleTabButton({
  onClick,
  ariaLabel,
  className,
  children,
}: Readonly<{
  onClick: () => void;
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
}>) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={twJoin(
        "flex h-40 w-40 items-center justify-center rounded-l-full border border-r-0 border-blue-300 bg-white text-blue-800 lg:rounded-full",
        "hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function HelpSidepanel() {
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
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

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

  useEffect(() => {
    if (isOpen && !window.matchMedia("(min-width: 1024px)").matches) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile: backdrop when open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={closePanel}
          aria-hidden="true"
        />
      )}

      {/* Mobile: trigger button when closed */}
      {!isOpen && (
        <ToggleTabButton
          ariaLabel="Hilfe-Panel öffnen"
          className="fixed top-224 right-0 z-40 -translate-y-1/2 lg:hidden"
          onClick={() => openPanel()}
        >
          <ChevronLeftOutlined className="h-20 w-20" />
        </ToggleTabButton>
      )}

      {/* Main panel — desktop: grid item; mobile: fixed overlay */}
      <div
        className={customTwMerge(
          // Base (desktop grid)
          "help border-l border-blue-300 bg-white",
          !isOpen && "w-32 justify-self-end",
          // Mobile overlay (overrides grid behavior)
          "max-lg:fixed max-lg:inset-y-0 max-lg:right-0 max-lg:z-50 max-lg:w-[280px] max-lg:shadow-2xl",
          !isOpen && "max-lg:hidden",
        )}
      >
        <div
          className={twJoin(
            "sticky top-0",
            "before:pointer-events-none before:absolute before:top-0 before:right-16 before:left-0 before:h-40 before:bg-[linear-gradient(to_bottom,white,transparent)] before:blur-xs before:content-['']",
            "after:pointer-events-none after:absolute after:right-16 after:bottom-0 after:left-0 after:h-40 after:bg-[linear-gradient(to_top,white,transparent)] after:blur-xs after:content-['']",
          )}
        >
          {/* Toggle tab — desktop only */}
          <ToggleTabButton
            ariaLabel={isOpen ? "Hilfe-Panel schließen" : "Hilfe-Panel öffnen"}
            className="absolute top-40 -left-20 self-start max-lg:hidden"
            onClick={() => (isOpen ? closePanel() : openPanel())}
          >
            {isOpen ? (
              <ChevronRightOutlined className="h-20 w-20" />
            ) : (
              <ChevronLeftOutlined className="h-20 w-20" />
            )}
          </ToggleTabButton>

          {/* Panel content */}
          {isOpen ? (
            <div
              ref={scrollableRef}
              className="max-h-screen overflow-x-hidden overflow-y-hidden py-40 wrap-break-word [scrollbar-gutter:stable] hover:overflow-y-auto max-lg:overflow-y-auto max-lg:[scrollbar-gutter:auto]"
            >
              <div className="w-full space-y-32 pr-16 pl-32">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    id={`help-section-${section.id}`}
                    className="scroll-mt-40"
                  >
                    <h3 className="ds-subhead mb-8 font-bold text-blue-800">
                      {section.title}
                    </h3>
                    {typeof section.content === "string" ? (
                      <RichText markdown={section.content} />
                    ) : (
                      <div className="space-y-8">{section.content}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-160 text-blue-800 lg:block">
              <span className="vertical-text">Hilfe</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
