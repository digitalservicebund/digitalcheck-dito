import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";
import RichText from "~/components/RichText.tsx";

export type DetailsSummaryProps = ComponentProps<"details"> & {
  identifier?: string;
  title?: string;
  bold?: boolean;
  showVerticalLine?: boolean;
  className?: string;
  /**
   * @deprecated Use children instead
   */
  content?: string;
  children?: ReactNode;
};

export default function DetailsSummary({
  identifier,
  title,
  bold = true,
  showVerticalLine = true,
  className,
  children,
  content,
  ...rest
}: Readonly<DetailsSummaryProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const summaryRef = useRef<HTMLElement | null>(null);

  const summaryClasses = twJoin(
    "summary-content inline-flex focus:outline-hidden cursor-pointer bg-no-repeat pl-[24px] [&::-webkit-details-marker]:hidden",
    bold ? "ds-label-01-bold" : "ds-label-01-reg",
  );

  const contentWrapperClasses = twJoin(
    "block pt-4 pl-[24px] text-black",
    showVerticalLine &&
      "relative before:absolute before:top-0 before:bottom-0 before:w-px before:bg-blue-500 before:left-[11px]",
  );

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
      {...rest}
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
        {children}
        {content && <RichText markdown={content} />}
      </div>
    </details>
  );
}
