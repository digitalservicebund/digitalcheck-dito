import { ReactNode } from "react";
import twMerge from "~/utils/tailwindMerge.ts";

/**
 * A div that encloses main content elements with appropriate margins.
 * Not meant to be used for full width elements.
 *
 * It wraps children in a div with `container` class and vertical margin:
 * - 40px on narrow viewports
 * - 80px on lg and above
 *   - Reduces that back to 40px using negative margin for tab lists
 */
function ContentWrapper({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <div
      className={twMerge(
        "container my-40 space-y-40 lg:my-80 lg:[&>*>[role=tablist]]:-mt-40",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default ContentWrapper;
