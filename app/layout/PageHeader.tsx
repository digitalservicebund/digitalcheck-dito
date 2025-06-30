import { MenuOpen, MenuOutlined } from "@digitalservicebund/icons";
import PhoneOutlined from "@digitalservicebund/icons/PhoneOutlined";
import { useEffect, useRef, useState } from "react";
import { Link, type UIMatch, useLocation, useMatches } from "react-router";
import { twJoin } from "tailwind-merge";
import Banner, { type BannerProps } from "~/layout/Banner";
import Breadcrumbs from "~/layout/Breadcrumbs.tsx";
import DropdownMenu from "~/layout/DropdownMenu.tsx";
import ProgressBar from "~/layout/ProgressBar";
import { header } from "~/resources/content/shared/header.ts";
import {
  ROUTE_LANDING,
  ROUTE_METHODS,
  ROUTE_PROTOTYPE_HESSEN_METHODS,
} from "~/resources/staticRoutes.ts";
import { matchHasHandle, MatchWithHandle } from "~/utils/handles";
import twMerge from "~/utils/tailwindMerge.ts";
import { normalizePathname } from "~/utils/utilFunctions.ts";

interface SubItem {
  title: string;
  content?: string;
  href: string;
  plausibleEventName: string;
}

interface HeaderItem {
  text: string;
  plausibleEventName: string;
  overlayContent: SubItem[];
  hasSupport?: boolean;
  isOrderedList?: boolean;
}

// Check if an item href matches the current path
const isParentItemActive = (item: HeaderItem, path: string): boolean => {
  return item.overlayContent.some((subItem) => {
    const normalizedItemPath = normalizePathname(subItem.href);
    const normalizedCurrentPath = normalizePathname(path);

    if (
      "activeBehavior" in subItem &&
      subItem.activeBehavior === "exactMatch"
    ) {
      return normalizedCurrentPath === normalizedItemPath;
    }

    return normalizedCurrentPath.startsWith(normalizedItemPath);
  });
};

// Check if a feature on a handle is enabled for a match
const getFeatureForMatches = (
  matches: UIMatch[],
  feature: keyof MatchWithHandle["handle"],
) =>
  matches.some(
    (match) =>
      matchHasHandle(match) && feature in match.handle && match.handle[feature],
  );

const PageHeader = ({
  includeBreadcrumbs = true,
  banner,
}: {
  includeBreadcrumbs?: boolean;
  banner?: BannerProps;
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Handle esc key
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
  useEffect(() => {
    const handleResize = () => {
      setActiveDropdownId(null);
      setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Toggle dropdown state
  const toggleDropdown = (itemText: string) => {
    setActiveDropdownId((current) => (current === itemText ? null : itemText));
  };

  // Close any open dropdown and menu
  const closeOpenDropdowns = () => {
    setActiveDropdownId(null);
    setMobileMenuOpen(false);
  };

  // Opens and closes mobile menu
  const toggleMobileMenu = () => {
    if (!mobileMenuOpen) {
      setMobileMenuOpen(true);
      const parentItemText = header.items.find((item) =>
        isParentItemActive(item, location.pathname),
      )?.text;
      setActiveDropdownId(parentItemText ?? null);
    } else {
      closeOpenDropdowns();
    }
  };

  const renderDropdownItem = (
    item: HeaderItem,
    variant: "desktop" | "mobile",
  ) => (
    <DropdownMenu
      key={`${item.text}-${variant}`}
      label={item.text}
      plausibleEventName={item.plausibleEventName}
      hasSupport={item.hasSupport}
      data={item.overlayContent}
      isOrderedList={item.isOrderedList}
      variant={variant}
      isActiveParent={isParentItemActive(item, currentPath)}
      isExpanded={activeDropdownId === item.text}
      onToggle={() => toggleDropdown(item.text)}
      onItemClick={closeOpenDropdowns}
    />
  );

  const showOverlay = activeDropdownId !== null || mobileMenuOpen;

  const matches = useMatches();
  const showProgressBar = getFeatureForMatches(matches, "hasProgressBar");
  const hideBreadcrumbs = getFeatureForMatches(matches, "hideBreadcrumbs");
  const showBreadcrumbs = includeBreadcrumbs && !hideBreadcrumbs;

  const { pathname } = useLocation();
  const isHessen = pathname.startsWith("/prototyp/hessen/");

  return (
    <>
      {showOverlay && (
        <div
          className="fixed inset-0 z-20 bg-[#282828] opacity-63"
          onClick={closeOpenDropdowns}
          aria-hidden="true"
        />
      )}
      <header className="relative" ref={headerRef}>
        <div className="relative z-30 flex h-[72px] justify-between bg-white pl-16 lg:px-16">
          {/* Logo and title */}
          {isHessen ? (
            <Link
              to={ROUTE_LANDING.url}
              className="plausible-event-name=Nav+Bar.Home flex items-center space-x-8"
            >
              <img
                src="/logo/hessen-logo.png"
                alt="Logo des Bundes"
                width={54}
              />
              <p className="ds-label-01-bold ml-16 flex flex-col text-xl max-lg:hidden">
                Digitalcheck Hessen
              </p>
            </Link>
          ) : (
            <Link
              to={ROUTE_LANDING.url}
              className="plausible-event-name=Nav+Bar.Home flex items-center space-x-8"
            >
              <img src="/logo/bund-logo.png" alt="Logo des Bundes" width={54} />
              <p className="ds-label-01-bold ml-16 flex flex-col text-xl max-lg:hidden">
                {header.title}
              </p>
            </Link>
          )}

          {/* Desktop Navigation */}
          <nav className="flex items-center max-lg:hidden">
            {header.items.map((item) => renderDropdownItem(item, "desktop"))}
            {renderDropdownItem(
              {
                isOrderedList: false,
                text: isHessen ? "Hessen" : "Bund",
                overlayContent: [
                  {
                    plausibleEventName: "foo",
                    title: "Bund",
                    content: "",
                    href: ROUTE_METHODS.url,
                  },
                  {
                    plausibleEventName: "bar",
                    title: "Hessen",
                    content: "",
                    href: ROUTE_PROTOTYPE_HESSEN_METHODS.url,
                  },
                ],
              },
              "desktop",
            )}
          </nav>

          {/* Mobile View Controls */}
          <div className="flex items-center space-x-16 lg:hidden">
            <a
              className="plausible-event-name=Nav+Bar.Mobile+Phone+Icon border-b-[4px] border-transparent"
              href={`tel:${header.contactTel.number}`}
              aria-label={header.contactTel.msg}
            >
              <PhoneOutlined />
            </a>
            <button
              className={twMerge(
                "h-full cursor-pointer border-b-[4px] border-transparent px-16 hover:bg-blue-100",
                mobileMenuOpen && "border-blue-800 bg-blue-100",
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
            "plausible-event-name=Nav+Bar.Burger+Menu+Icon+Mobile.Open+Close absolute right-0 left-0 z-40 rounded-b-md border-t-1 border-gray-600 bg-white drop-shadow-[4px_4px_12px_rgba(0,0,0,0.06)]",
            mobileMenuOpen ? "overflow-y-auto" : "invisible",
          )}
          aria-hidden={!mobileMenuOpen}
        >
          {header.items.map((item) => renderDropdownItem(item, "mobile"))}
        </nav>
        {banner && <Banner {...banner} />}
        {showProgressBar && <ProgressBar />}
        {showBreadcrumbs && <Breadcrumbs />}
      </header>
    </>
  );
};

export default PageHeader;
