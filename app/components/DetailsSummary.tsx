import { ReactNode } from "react";
import { twJoin } from "tailwind-merge";
import RichText from "./RichText";

export type DetailsSummaryProps = {
  identifier?: string;
  title?: string;
  content?: string | ReactNode;
  bold?: boolean;
  open?: boolean;
  showVerticalLine?: boolean;
  className?: string;
};

export default function DetailsSummary({
  title,
  content,
  bold = true,
  open = false,
  showVerticalLine = true,
  className,
}: Readonly<DetailsSummaryProps>) {
  const summaryClasses = twJoin(
    "summary-content inline-flex focus:outline-hidden cursor-pointer bg-no-repeat pl-[24px] [&::-webkit-details-marker]:hidden",
    bold ? "ds-label-01-bold" : "ds-label-01-reg",
  );

  const contentWrapperClasses = twJoin(
    "block pt-4 pl-[24px] text-black",
    showVerticalLine && "relative",
  );

  return (
    <details
      open={open}
      className={twJoin(
        "details text-blue-800 has-focus-visible:outline-4 has-focus-visible:outline-offset-4 has-focus-visible:outline-blue-800",
        className,
      )}
    >
      <summary className={summaryClasses}>{title}</summary>
      <div className={contentWrapperClasses}>
        {showVerticalLine && (
          <div
            aria-hidden="true"
            className={twJoin(
              "absolute top-0 bottom-0 w-[1px] bg-blue-500",
              "left-[11px]",
            )}
          ></div>
        )}
        {typeof content === "string" ? (
          <RichText markdown={content} />
        ) : (
          content
        )}
      </div>
    </details>
  );
}
