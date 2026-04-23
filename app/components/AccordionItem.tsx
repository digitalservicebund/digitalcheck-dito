import { Add, Remove } from "@digitalservicebund/icons";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ReactNode } from "react";
import { useLocation } from "react-router";
import { twJoin } from "tailwind-merge";
import RichText from "~/components/RichText";
import { getPlausibleEventClassName } from "~/utils/plausibleUtils";
import twMerge from "~/utils/tailwindMerge";

export type AccordionItemProps = {
  headline: ReactNode;
  children?: ReactNode;
  id?: string;
  plausibleEventName?: string;
  className?: string;
};

/*
 * An expandable accordion item with top and bottom borders, used to build
 * FAQ lists.
 * */
export default function AccordionItem({
  headline,
  children,
  id,
  plausibleEventName,
  className,
}: Readonly<AccordionItemProps>) {
  const plausibleEvent = getPlausibleEventClassName(plausibleEventName);

  const location = useLocation();
  const defaultOpen = location.hash ? location.hash.slice(1) === id : false;

  return (
    <div
      className={twMerge(
        "border-t-2 border-blue-400 last-of-type:border-b-2",
        className,
      )}
      suppressHydrationWarning={
        true
      } /* if a hash is set, the panel will only be open client-side */
    >
      <Disclosure defaultOpen={defaultOpen}>
        <DisclosureButton
          className={twJoin(
            plausibleEvent,
            "group flex w-full items-center justify-between p-24 hover:bg-blue-200 focus-visible:bg-blue-200 focus-visible:outline-4 focus-visible:outline-blue-800 data-open:bg-blue-200",
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
          {typeof children === "string" ? (
            <RichText markdown={children} className="space-y-28" />
          ) : (
            children
          )}
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
