import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
} from "@digitalservicebund/icons";
import { PointerEvent } from "react";
import DropdownContentList from "~/components/DropdownContentList";
import type { DropdownItemProps } from "~/components/DropdownContentList.tsx";
import { header } from "~/resources/content/shared/header.ts";
import { getPlausibleEventClassName } from "~/utils/plausibleUtils";
import twMerge from "~/utils/tailwindMerge";

export type DropdownProps = {
  label: string;
  className?: string;
  data: DropdownItemProps[];
  hasSupport?: boolean;
  isOrderedList?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  variant?: "desktop" | "mobile";
  isExpanded: boolean;
  onToggle: () => void;
  onItemClick: () => void;
  isActiveParent: boolean;
  plausibleEventName: string;
};

export default function DropdownMenu({
  className,
  label,
  data,
  hasSupport = false,
  isOrderedList = false,
  variant = "desktop",
  isExpanded,
  onToggle,
  onItemClick,
  isActiveParent,
  plausibleEventName,
}: Readonly<DropdownProps>) {
  const isMobile = variant === "mobile";
  const elementId = `dropdown-${encodeURIComponent(label)}-${variant}`;
  const plausibleTrackingClass = getPlausibleEventClassName(
    `Nav+Bar.${plausibleEventName}.Open+Close`,
  );

  // Transparent borders to avoid layout shifts
  const buttonClasses = twMerge(
    "flex cursor-pointer items-center hover:bg-blue-100",
    !isMobile
      ? "ds-label-01-reg h-full border-b-[4px] border-transparent pr-8 pl-16 whitespace-nowrap"
      : "ds-label-01-bold w-full justify-between border-l-[4px] border-transparent p-16",
    isActiveParent && "border-blue-800 bg-blue-100",
    isExpanded && "bg-blue-100",
    plausibleTrackingClass,
  );

  const panelClasses = !isMobile
    ? "absolute right-0 z-30 w-[512px] rounded-b-md border-t border-gray-600 bg-white pt-8 pb-16 drop-shadow-[4px_4px_12px_rgba(0,0,0,0.06)]"
    : "";

  const containerClasses = twMerge(
    "relative",
    isMobile ? "w-full" : "h-full max-lg:hidden",
    className,
  );

  const handlePointerEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;

    if (!isMobile && !isExpanded) {
      onToggle();
    }
  };

  const handlePointerLeave = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;

    if (!isMobile && isExpanded) {
      onToggle();
    }
  };

  return (
    <div
      className={containerClasses}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <button
        type="button"
        onClick={onToggle}
        className={buttonClasses}
        id={`${elementId}-button`}
        aria-haspopup="menu"
        aria-expanded={isExpanded}
        aria-controls={`${elementId}-inhalt`}
      >
        {label} {isExpanded ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
      </button>
      {isExpanded && (
        <div
          className={panelClasses}
          id={`${elementId}-inhalt`}
          aria-labelledby={`${elementId}-button`}
        >
          {hasSupport && (
            <div className="px-16 lg:px-56">
              <div className="ds-label-02-reg px-16 pt-8 pb-16 text-gray-900 lg:px-8 lg:pt-16 lg:pb-24">
                {isMobile ? header.contactTel.msgMobile : header.contactTel.msg}
                <a
                  href={`tel:${header.contactTel.number.replace(/\s/g, "")}`}
                  className="plausible-event-name=Nav+Bar.Kontakt+Support+Layer.Link+Telefon ds-link-02-reg ml-8"
                >
                  {header.contactTel.number}
                </a>{" "}
                {header.contactMail.msg}{" "}
                <a
                  className="plausible-event-name=Nav+Bar.Kontakt+Support+Layer.Link+Email ds-link-02-reg"
                  href={header.contactMail.url}
                >
                  {header.contactMail.text}
                </a>
              </div>
              <div className="border-b-1 border-gray-600" />
            </div>
          )}
          <DropdownContentList
            parentPlausibleEvent={plausibleEventName}
            data={data}
            isOrderedList={isOrderedList}
            onItemClick={onItemClick}
            isMobile={isMobile}
          />
        </div>
      )}
    </div>
  );
}
