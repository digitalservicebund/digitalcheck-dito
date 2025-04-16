import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
} from "@digitalservicebund/icons";
import React, { useEffect, useRef } from "react";
import type { DropdownItemProps } from "~/components/DrodownItem.tsx";
import DropdownContentList from "~/components/DropdownContentList";
import DropdownSupportItem from "~/components/DropdownSupportItem";
import twMerge from "~/utils/tailwindMerge";

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
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
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

  const buttonClasses = twMerge(
    "flex cursor-pointer items-center hover:bg-blue-100",
    !isMobile &&
      "ds-label-01-reg h-full border-b-[4px] border-transparent px-16 whitespace-nowrap",
    isMobile &&
      "ds-label-01-bold w-full justify-between border-l-[4px] border-transparent p-16",
    isActiveParent && "border-blue-800 bg-blue-100",
    isExpanded && "bg-blue-100",
  );

  const panelClasses = !isMobile
    ? "absolute right-0 z-30 w-[512px] rounded-b-md border-t border-gray-600 bg-white pt-8 pb-16 drop-shadow-[4px_4px_12px_rgba(0,0,0,0.06)]" // Assuming border-t (1px)
    : "";

  const innerPanelPadding = isMobile ? "p-16" : "";

  const containerClasses = twMerge(
    "relative",
    isMobile ? "w-full" : "h-full max-lg:hidden",
    className, // User override
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isExpanded) {
        onToggle();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded, onToggle]);

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
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={onToggle}
        className={buttonClasses}
        id={`${elementId}-button`}
        aria-haspopup="true"
        aria-expanded={isExpanded}
        aria-controls={`${elementId}-content`}
      >
        {label} {isExpanded ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
      </button>

      {isExpanded && (
        <div
          className={panelClasses}
          id={`${elementId}-content`}
          role={!isMobile ? "listbox" : "region"}
          aria-labelledby={`${elementId}-button`}
        >
          {hasSupport && <DropdownSupportItem mobile={isMobile} />}

          <div className={innerPanelPadding}>
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
