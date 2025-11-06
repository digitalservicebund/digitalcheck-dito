import { ReactNode, useEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";
import RichText from "./RichText";

export type DetailsSummaryProps = {
  identifier?: string;
  title?: string;
  /**
   * @deprecated use children instead
   */
  content?: string | ReactNode;
  bold?: boolean;
  open?: boolean;
  showVerticalLine?: boolean;
  className?: string;
  children?: ReactNode;
};

export default function DetailsSummary({
  identifier,
  title,
  content,
  bold = true,
  open = false,
  showVerticalLine = true,
  className,
  children,
}: Readonly<DetailsSummaryProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const summaryRef = useRef<HTMLElement | null>(null);

  const summaryClasses = twJoin(
    "summary-content inline-flex focus:outline-hidden cursor-pointer bg-no-repeat pl-[24px] [&::-webkit-details-marker]:hidden",
    bold ? "ds-label-01-bold" : "ds-label-01-reg",
  );

  const contentWrapperClasses = twJoin(
    "block pt-4 pl-[24px] text-black",
    showVerticalLine && "relative",
  );

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (!identifier) return;

    const matchesHash = (hash: string) => {
      if (!hash) return false;
      try {
        return decodeURIComponent(hash.slice(1)) === identifier;
      } catch {
        return hash.slice(1) === identifier;
      }
    };

    const openIfMatches = (hash: string | null) => {
      if (!hash) return;
      if (matchesHash(hash)) {
        setIsOpen(true);

        window.requestAnimationFrame(() => {
          detailsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          summaryRef.current?.focus?.();
        });
      }
    };

    // initial check
    openIfMatches(window.location.hash);
  }, [identifier]);

  return (
    <details
      id={identifier}
      ref={detailsRef}
      onToggle={({ currentTarget }) => {
        setIsOpen(currentTarget.open);
      }}
      open={isOpen}
      className={twJoin(
        "details scroll-mt-64 text-blue-800 has-focus-visible:outline-4 has-focus-visible:outline-offset-4 has-focus-visible:outline-blue-800",
        className,
      )}
    >
      <summary ref={summaryRef} className={summaryClasses} tabIndex={0}>
        {title}
      </summary>

      <div className={contentWrapperClasses}>
        {showVerticalLine && (
          <div
            aria-hidden="true"
            className={twJoin(
              "absolute top-0 bottom-0 w-[1px] bg-blue-500",
              "left-[11px]",
            )}
          />
        )}
        {typeof content === "string" ? (
          <RichText markdown={content} />
        ) : (
          content
        )}
        {children}
      </div>
    </details>
  );
}
