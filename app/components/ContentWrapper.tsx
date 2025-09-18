import { ReactNode } from "react";

/**
 * Meant to ensure correct spacing for main content, below Hero sections and above full width elements.
 *
 * Wraps children in a div with `container` class and vertical padding:
 * - 40px
 * - 80px on lg
 *   - Reduces that back to 40px using negative margin for tab lists
 */
function ContentWrapper({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="container my-40 space-y-40 lg:my-80 lg:[&>[role=tablist]]:-mt-40">
      {children}
    </div>
  );
}

export default ContentWrapper;
