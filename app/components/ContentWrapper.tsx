import React, { ReactNode } from "react";
import Tabs from "~/components/Tabs/Tabs";
import twMerge from "~/utils/tailwindMerge.ts";

/**
 * A div that encloses main content elements with appropriate margins.
 * Not meant to be used for full width elements.
 *
 * It wraps children in a div with `container` class and vertical margin:
 * - 40 px on narrow viewports
 * - 80 px on lg and above
 *   - exception: if child is Tabs, set margin top to 40 px instead
 */
function ContentWrapper({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) {
  const firstChild = React.Children.toArray(children)[0];
  const isFirstChildTabs =
    React.isValidElement(firstChild) && firstChild.type === Tabs;

  return (
    <div
      className={twMerge(
        "container my-40 space-y-40 lg:my-80",
        isFirstChildTabs && "lg:mt-40",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default ContentWrapper;
