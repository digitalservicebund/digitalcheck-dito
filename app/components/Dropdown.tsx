import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
} from "@digitalservicebund/icons";
import { useRef } from "react";
import type { DropdownItemProps } from "~/components/DrodownItem.tsx";
import DropdownSupportItem from "~/components/DropdownSupportItem";
import twMerge from "~/utils/tailwindMerge";
import DropdownContentList from "./DropdownContentList";

export type DropdownProps = {
  label?: string;
  className?: string;
  data: DropdownItemProps[];
  hasSupport?: boolean;
  isList?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  isActiveParent?: boolean;
  variant?: "desktop" | "mobile";
  isExpanded: boolean;
  onToggle: () => void;
  onItemClick: () => void;
};

export default function Dropdown({
  className,
  label,
  data,
  hasSupport = false,
  isList = false,
  isActiveParent = false,
  variant = "desktop",
  isExpanded,
  onToggle,
  onItemClick,
}: Readonly<DropdownProps>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = variant === "mobile";

  const elementId = `dropdown-${label?.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div
      className={twMerge(
        // Base styling
        "relative",
        // Variant-specific styling
        isMobile ? "w-full" : "h-full max-lg:hidden",
        className,
      )}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={onToggle}
        className={twMerge(
          // Base styles for button
          "flex cursor-pointer items-center hover:bg-blue-100",
          // Desktop-specific styles
          !isMobile &&
            "ds-label-01-reg h-full border-b-[4px] border-transparent px-16 whitespace-nowrap",
          // Mobile-specific styles
          isMobile &&
            "ds-label-01-bold w-full justify-between border-l-[4px] border-transparent p-16",
          // Active navigation item
          isActiveParent && "border-blue-800 bg-blue-100",
          // Active selection
          isExpanded && "bg-blue-100",
        )}
        id={`${elementId}-button`}
        aria-haspopup={!isMobile ? "listbox" : undefined}
        aria-expanded={isExpanded}
        aria-controls={`${elementId}-content`}
      >
        {label} {isExpanded ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
      </button>

      {isExpanded && (
        <div
          id={`${elementId}-content`}
          className={twMerge(
            // Desktop-specific content styles
            !isMobile &&
              "absolute right-0 z-30 w-[512px] rounded-b-md border-t-1 border-gray-600 bg-white pt-8 pb-16 drop-shadow-[4px_4px_12px_rgba(0,0,0,0.06)]",
          )}
          role={!isMobile ? "listbox" : "region"}
          aria-labelledby={`${elementId}-button`}
        >
          {hasSupport && <DropdownSupportItem mobile={isMobile} />}

          <div className={isMobile ? "p-16" : ""}>
            <DropdownContentList
              data={data}
              isList={isList}
              onItemClick={onItemClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}
