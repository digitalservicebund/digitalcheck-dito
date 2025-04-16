import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
} from "@digitalservicebund/icons";
import { useEffect, useRef, useState } from "react";
import { type DropdownItemProps } from "~/components/DrodownItem.tsx";
import DropdownSupportItem from "~/components/DropdownSupportItem.tsx";
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
};

export default function Dropdown({
  className,
  label,
  data,
  hasSupport = false,
  onOpenChange,
  isList = false,
  isActiveParent = false,
}: Readonly<DropdownProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (onOpenChange) onOpenChange(!isOpen);
  };
  console.log(label);
  console.log(isActiveParent);
  const handleItemClick = () => {
    setIsOpen(false);
    if (onOpenChange) onOpenChange(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (onOpenChange) onOpenChange(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  const listboxId = `dropdown-listbox-${label}`;
  const buttonId = `dropdown-button-${label}`;

  const activeClasses = "border-b-[4px] bg-blue-100 border-blue-800";

  return (
    <div
      className={twMerge("relative h-full max-lg:hidden", className)}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={toggleDropdown}
        className={twMerge(
          "ds-label-01-reg z-20 inline-flex h-full cursor-pointer items-center border-b-[4px] border-transparent px-16 whitespace-nowrap hover:bg-blue-100 focus:border-blue-800 focus:bg-blue-100",
          isActiveParent && activeClasses,
        )}
        id={buttonId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
      >
        {label} {isOpen ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-30 w-[512px] rounded-b-md border-1 border-gray-600 bg-white pt-8 pb-16 drop-shadow-[4px_4px_12px_rgba(0,0,0,0.06)]"
          role="listbox"
          id={listboxId}
          aria-labelledby={buttonId}
        >
          {hasSupport && (
            <DropdownSupportItem mobile={false}></DropdownSupportItem>
          )}
          <DropdownContentList
            data={data}
            isList={isList}
            onItemClick={handleItemClick}
          />
        </div>
      )}
    </div>
  );
}
