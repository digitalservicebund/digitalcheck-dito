import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
} from "@digitalservicebund/icons";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import DropdownItem, {
  type DropdownItemProps,
} from "~/components/DrodownItem.tsx";
import { header } from "~/resources/content/components/header.ts";
import twMerge from "~/utils/tailwindMerge";

export type DropdownProps = {
  label?: string;
  className?: string;
  data: DropdownItemProps[];
  hasSupport?: boolean;
  isList?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

// TODO: check a11y
export default function Dropdown({
  className,
  label,
  data,
  hasSupport = false,
  onOpenChange,
  isList = false,
}: Readonly<DropdownProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (onOpenChange) onOpenChange(!isOpen);
  };

  const handleSelectOption = () => {
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

  return (
    <>
      <div
        className={twMerge("relative h-full max-lg:hidden", className)}
        ref={dropdownRef}
      >
        <button
          type="button"
          onClick={toggleDropdown}
          className="ds-label-01-reg z-20 inline-flex h-full cursor-pointer items-center border-blue-800 px-16 whitespace-nowrap hover:bg-blue-100 focus:border-b-3 focus:bg-blue-100"
          id={buttonId}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
        >
          {label} {isOpen ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
        </button>

        {isOpen && (
          <>
            <div
              className="absolute right-0 z-30 w-[512px] rounded-b-md border-1 border-gray-600 bg-white pt-8 pb-16 drop-shadow-[4px_4px_12px_rgba(0,0,0,0.06)]"
              role="listbox"
              id={listboxId}
              aria-labelledby={buttonId}
            >
              {hasSupport && (
                <div className="px-56">
                  <div className="ds-label-02-reg pt-16 pb-24 text-left text-gray-900">
                    {header.contact.msg}
                    <a
                      href={`tel:${header.contact.number}`}
                      className="plausible-event-name=Phone+Click plausible-event-position=header ds-link-02-reg ml-8"
                    >
                      {header.contact.number}
                    </a>
                  </div>
                  <div className="border-b-1 border-gray-900"></div>
                </div>
              )}
              {data.map((option, index) => (
                <Link
                  key={option.title}
                  to={option.href!}
                  role="option"
                  onClick={handleSelectOption}
                  aria-selected={false}
                  aria-label={option.title}
                >
                  <DropdownItem
                    number={isList ? index + 1 : 0}
                    newContent={option.newContent}
                    key={option.title}
                    title={option.title}
                    content={option.content}
                    isNewTitle={option.isNewTitle}
                  />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="lg:hidden"></div>
    </>
  );
}
