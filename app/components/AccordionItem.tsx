import { Add, Remove } from "@digitalservicebund/icons";
import { ReactNode } from "react";
import { twJoin } from "tailwind-merge";
import RichText from "~/components/RichText";
import { getPlausibleEvent } from "~/utils/plausibleUtils";

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
  const plausibleEvent = getPlausibleEvent(plausibleEventName);

  return (
    <details className="group border-t-2 border-t-blue-800" id={id}>
      <summary
        className={twJoin(
          plausibleEvent,
          "flex w-full cursor-pointer items-center justify-between p-24 group-open:bg-blue-200 hover:bg-blue-200 focus-visible:bg-blue-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-blue-800 [&::-webkit-details-marker]:hidden",
        )}
      >
        <div className="pr-10 text-left font-bold text-blue-800">
          {headline}
        </div>
        <Add className="size-24 shrink-0 fill-blue-800 group-open:hidden" />
        <Remove className="hidden size-24 shrink-0 fill-blue-800 group-open:block" />
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
