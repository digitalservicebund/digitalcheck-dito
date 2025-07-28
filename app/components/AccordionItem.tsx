import { Add, Remove } from "@digitalservicebund/icons";
import { ReactNode } from "react";
import { twJoin } from "tailwind-merge";
import RichText from "~/components/RichText";
import { getPlausibleEventClassName } from "~/utils/plausibleUtils";

export type AccordionItemProps = {
  headline: string;
  content?: string | ReactNode;
  id?: string;
  plausibleEventName?: string;
};

export default function AccordionItem({
  headline,
  content,
  id,
  plausibleEventName,
}: Readonly<AccordionItemProps>) {
  const plausibleEvent = getPlausibleEventClassName(plausibleEventName);

  return (
    <details className="group border-t-ds-dark-blue border-t-2" id={id}>
      <summary
        className={twJoin(
          plausibleEvent,
          "flex w-full cursor-pointer items-center justify-between p-24 group-open:bg-blue-200 hover:bg-blue-200 focus-visible:bg-blue-200 focus-visible:outline-4 focus-visible:outline-blue-800 [&::-webkit-details-marker]:hidden",
        )}
      >
        <div className="text-ds-dark-blue pr-10 text-left font-bold">
          {headline}
        </div>
        <Add className="fill-ds-dark-blue size-24 shrink-0 group-open:hidden" />
        <Remove className="fill-ds-dark-blue hidden size-24 shrink-0 group-open:block" />
      </summary>
      <div className="p-24">
        {typeof content === "string" ? (
          <RichText markdown={content} className="ds-stack ds-stack-28" />
        ) : (
          content
        )}
      </div>
    </details>
  );
}
