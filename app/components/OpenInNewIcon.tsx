import { OpenInNew as OpenInNewIconBase } from "@digitalservicebund/icons";
import { general } from "~/resources/content/shared/general.ts";
import twMerge from "~/utils/tailwindMerge";

/**
 * Renders an icon with an associated accessibility message for screen readers,
 * indicating that a new window or tab will open.
 */
export const OpenInNewIcon = ({ className }: { className?: string }) => (
  <>
    <OpenInNewIconBase
      height="1.4em"
      width="1.4em"
      className={twMerge("ml-2 inline pb-2", className)}
      aria-hidden
    />
    {/*  The extra space is added to ensure the label is not announced together with the previous text node. */}
    <span className="sr-only"> {general.a11yMessageNewWindow}</span>
  </>
);
