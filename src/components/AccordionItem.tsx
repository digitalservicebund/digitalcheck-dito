import RichText from "@/components/RichText";
import twMerge from "@/utils/tailwindMerge";
import { Add, Remove } from "@digitalservicebund/icons";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import type { ReactNode } from "react";

export type AccordionItemProps = {
  headline: ReactNode;
  children?: ReactNode;
  id?: string;
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
  className,
}: Readonly<AccordionItemProps>) {
  return (
    <div className={twMerge("border-ds-blue-400 border-b-2", className)}>
      <Disclosure>
        <DisclosureButton
          className="group hover:bg-ds-blue-200 focus-visible:bg-ds-blue-200 focus-visible:outline-ds-blue-800 data-open:bg-ds-blue-200 flex w-full items-center justify-between p-24 focus-visible:outline-4"
          id={id}
        >
          <div className="text-ds-blue-800 pr-10 text-left font-bold">
            {headline}
          </div>
          <Add className="fill-ds-blue-800 size-24 shrink-0 group-data-open:hidden" />
          <Remove className="fill-ds-blue-800 hidden size-24 shrink-0 group-data-open:block" />
        </DisclosureButton>
        <DisclosurePanel className="flex w-full items-center justify-between p-24">
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
