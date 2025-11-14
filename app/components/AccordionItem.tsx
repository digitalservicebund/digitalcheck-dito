import { Add, Remove } from "@digitalservicebund/icons";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
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
    <Disclosure>
      <DisclosureButton
        className={twJoin(
          plausibleEvent,
          "group flex w-full items-center justify-between border-t-2 border-blue-800 p-24 hover:bg-blue-200 focus-visible:bg-blue-200 focus-visible:outline-4 focus-visible:outline-blue-800 data-open:bg-blue-200",
        )}
        id={id}
      >
        <div className="pr-10 text-left font-bold text-blue-800">
          {headline}
        </div>
        <Add className="size-24 shrink-0 fill-blue-800 group-data-open:hidden" />
        <Remove className="hidden size-24 shrink-0 fill-blue-800 group-data-open:block" />
      </DisclosureButton>
      <DisclosurePanel
        className={twJoin(
          plausibleEvent,
          "flex w-full items-center justify-between p-24",
        )}
      >
        {typeof content === "string" ? (
          <RichText markdown={content} className="space-y-28" />
        ) : (
          content
        )}
      </DisclosurePanel>
    </Disclosure>
  );
}
