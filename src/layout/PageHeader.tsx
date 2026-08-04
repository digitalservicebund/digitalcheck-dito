import Container from "@/components/Container";
import { Kopfzeile } from "@/components/kern-preview/Kopfzeile.tsx";
import RichText from "@/components/RichText";
import { home, methoden, methoden_fuenfPrinzipien } from "@/config/routes";
import { useResize } from "@/hooks/deviceHook";
import DropdownMenu from "@/layout/DropdownMenu.tsx";
import { header } from "@/resources/content/shared/header.ts";
import {
  MenuOpen,
  MenuOutlined,
  PhoneOutlined,
} from "@digitalservicebund/icons";
import { useEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";

import { normalizePathname, withBase } from "@/utils/path";
import twMerge from "@/utils/tailwindMerge.ts";

interface SubItem {
  title: string;
  content?: string;
  href: string;
}

interface HeaderItem {
  text: string;
  href?: string;
  overlayContent: SubItem[];
  hasSupport?: boolean;
  isOrderedList?: boolean;
}

const isFlatHeaderItem = (
  item: HeaderItem,
): item is HeaderItem & { href: string } => typeof item.href === "string";

type responsiveOptions = "desktop" | "mobile";

// Check if an item href matches the current path
const isParentItemActive = (item: HeaderItem, path: string): boolean => {
  // Items without dropdown
  if (item.href) {
    const normalizedItemPath = normalizePathname(item.href);
    const normalizedCurrentPath = normalizePathname(path);
    return normalizedCurrentPath.startsWith(normalizedItemPath);
  }

  // Items with dropdown
  return item.overlayContent.some((subItem) => {
    const normalizedItemPath = normalizePathname(subItem.href);
    const normalizedCurrentPath = normalizePathname(path);

    if (
      "activeBehavior" in subItem &&
      subItem.activeBehavior === "exactMatch"
    ) {
      return normalizedCurrentPath === normalizedItemPath;
    }

    // TODO: remove once we've split the 5 Prinzipien page again
    // prevents two active elements in the header for this page
    if (
      normalizedCurrentPath.startsWith(methoden_fuenfPrinzipien.path) &&
      normalizedItemPath == methoden.path
    ) {
      return false;
    }

    return normalizedCurrentPath.startsWith(normalizedItemPath);
  });
};

const PageHeader = ({ currentPath }: { currentPath: string }) => {
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Close any open dropdown and menu
  const closeOpenDropdowns = () => {
    setActiveDropdownId(null);
    setMobileMenuOpen(false);
  };

  // Handle escape key, to close open dropdowns
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOpenDropdowns();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Reset states on navigation or viewport changes
  useResize(() => {
    setActiveDropdownId(null);
    setMobileMenuOpen(false);
  }, false);

  // Toggle dropdown state
  const toggleDropdown = (itemText: string) => {
    setActiveDropdownId((current) => (current === itemText ? null : itemText));
  };

  // Opens and closes mobile menu
  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      closeOpenDropdowns();
    } else {
      setMobileMenuOpen(true);
      const parentItemText = header.items.find((item) =>
        isParentItemActive(item, location.pathname),
      )?.text;
      setActiveDropdownId(parentItemText ?? null);
    }
  };

  const renderDropdownItem = (item: HeaderItem, variant: responsiveOptions) => (
    <DropdownMenu
      key={`${item.text}-${variant}`}
      label={item.text}
      hasSupport={item.hasSupport}
      data={item.overlayContent}
      isOrderedList={item.isOrderedList}
      variant={variant}
      currentPath={currentPath}
      isActiveParent={isParentItemActive(item, currentPath)}
      isExpanded={activeDropdownId === item.text}
      onToggle={() => toggleDropdown(item.text)}
      onItemClick={closeOpenDropdowns}
    />
  );

  const renderFlatItem = (
    item: HeaderItem & { href: string },
    variant: responsiveOptions,
  ) => {
    const isMobile = variant === "mobile";
    const isActive = isParentItemActive(item, currentPath);

    return (
      <a
        key={`${item.text}-${variant}`}
        href={item.href}
        onClick={closeOpenDropdowns}
        className={twMerge(
          "link-unstyled flex items-center hover:bg-blue-100",
          isMobile
            ? "ds-label-01-bold w-full border-l-4 border-transparent p-16"
            : "ds-label-01-reg h-full border-y-4 border-transparent px-16 whitespace-nowrap",
          isActive && "border-blue-800 border-t-transparent bg-blue-100",
        )}
      >
        {item.text}
      </a>
    );
  };

  const renderNavItem = (item: HeaderItem, variant: "desktop" | "mobile") => {
    if (isFlatHeaderItem(item)) {
      return renderFlatItem(item, variant);
    } else {
      return renderDropdownItem(item, variant);
    }
  };

  const showOverlay = activeDropdownId !== null || mobileMenuOpen;

  return (
    <>
      {showOverlay && (
        <div
          className="fixed inset-0 z-20 bg-black/60"
          onClick={closeOpenDropdowns}
          aria-hidden="true"
        />
      )}
      <header
        className="relative z-30 border-b-2 border-blue-300 bg-white"
        ref={headerRef}
      >
        <Kopfzeile className="relative" />
        <div className="relative flex h-[70px] justify-between pl-16 lg:container">
          {/* Logo and title */}
          <a
            href={home.path}
            className="link-unstyled flex items-center space-x-8"
          >
            <img
              src={withBase("/logo/bund-logo.png")}
              alt="Logo des Bundes"
              width={54}
              className="forced-colors:dark:hidden"
            />
            <img
              src={withBase("/logo/bund-logo-white.svg")}
              alt="Logo des Bundes"
              width={54}
              className="hidden forced-colors:dark:block"
            />
            <p className="ds-label-01-bold ml-16 flex flex-col text-xl max-lg:hidden">
              {header.title}
            </p>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="flex items-center max-lg:hidden"
            data-testid="desktop-nav"
          >
            {header.items.map((item) => renderNavItem(item, "desktop"))}
          </nav>

          {/* Mobile View Controls */}
          <div className="flex items-center space-x-16 lg:hidden">
            <a
              className="link-unstyled border-y-4 border-transparent"
              href={`tel:${header.contactTel.number.replaceAll(/\s/g, "")}`}
              aria-label={header.contactTel.msg}
            >
              <PhoneOutlined />
            </a>
            <button
              type="button"
              className={twMerge(
                "h-full cursor-pointer border-y-4 border-transparent px-16 hover:bg-blue-100",
                mobileMenuOpen &&
                  "border-blue-800 border-t-transparent bg-blue-100",
              )}
              onClick={toggleMobileMenu}
              aria-label="Menü öffnen/schließen"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              tabIndex={0}
            >
              {mobileMenuOpen ? <MenuOpen /> : <MenuOutlined />}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        <nav
          id="mobile-menu"
          className={twJoin(
            "absolute right-0 left-0 z-40 rounded-b-md border-t border-gray-600 bg-white drop-shadow-[4px_4px_12px_rgba(0,0,0,0.06)]",
            mobileMenuOpen ? "overflow-y-auto" : "invisible",
          )}
          aria-hidden={!mobileMenuOpen}
        >
          {header.items.map((item) => renderNavItem(item, "mobile"))}
        </nav>
        <noscript>
          <div className="bg-yellow-200">
            <Container className="py-4">
              <RichText markdown={header.noscript.text} />
            </Container>
          </div>
        </noscript>
      </header>
    </>
  );
};

export default PageHeader;
