import OpenInNewIconBase from "@digitalservicebund/icons/OpenInNew";
import { renderToString } from "react-dom/server";
import { general } from "~/resources/content/shared/general.ts";

/**
 * Renders an icon with an associated accessibility message for screen readers,
 * indicating that a new window or tab will open.
 */
export const OpenInNewIcon = () => (
  <>
    <OpenInNewIconBase
      height="1.2em"
      width="1.2em"
      className="ml-2 fill-current"
      aria-hidden
    />
    {/*  The extra space is added to ensure the label is not announced together with the previous text node. */}
    <span className="sr-only"> {general.a11yMessageNewWindow}</span>
  </>
);

export const openInNewIconString = renderToString(OpenInNewIcon());
