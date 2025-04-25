import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
} from "@digitalservicebund/icons";
import type { DropdownItemProps } from "~/components/DrodownMenuItem.tsx";
import DropdownContentList from "~/components/DropdownContentList";
import { header } from "~/resources/content/components/header.ts";
import twMerge from "~/utils/tailwindMerge";

export type DropdownProps = {
  label?: string;
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
}: Readonly<DropdownProps>) {
  const isMobile = variant === "mobile";
  const elementId = `dropdown-${label}`;

  // Transparent borders to avoid layout shifts
  const buttonClasses = twMerge(
    "flex cursor-pointer items-center hover:bg-blue-100",
    !isMobile
      ? "ds-label-01-reg h-full border-b-[4px] border-transparent pr-8 pl-16 whitespace-nowrap"
      : "ds-label-01-bold w-full justify-between border-l-[4px] border-transparent p-16",
    isActiveParent && "border-blue-800 bg-blue-100",
    isExpanded && "bg-blue-100",
  );

  const panelClasses = !isMobile
    ? "absolute right-0 z-30 w-[512px] rounded-b-md border-t border-gray-600 bg-white pt-8 pb-16 drop-shadow-[4px_4px_12px_rgba(0,0,0,0.06)]"
    : "";

  const containerClasses = twMerge(
    "relative",
    isMobile ? "w-full" : "h-full max-lg:hidden",
    className,
  );

  const handleMouseEnter = () => {
    if (!isMobile && !isExpanded) {
      onToggle();
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && isExpanded) {
      onToggle();
    }
  };

  return (
    <div
      className={containerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
                {isMobile ? header.contact.msgMobile : header.contact.msg}
                <a
                  href={`tel:${header.contact.number}`}
                  className="plausible-event-name=Phone+Click plausible-event-position=header ds-link-02-reg ml-8"
                >
                  {header.contact.number}
                </a>
              </div>
              <div className="border-b-1 border-gray-600" />
            </div>
          )}
          <DropdownContentList
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
