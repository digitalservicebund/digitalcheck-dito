import { MenuOpen, MenuOutlined } from "@digitalservicebund/icons/index";
import PhoneOutlined from "@digitalservicebund/icons/PhoneOutlined";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import Background from "~/components/Background.tsx";
import Breadcrumbs from "~/components/Breadcrumbs.tsx";
import DropdownMenu from "~/components/DropdownMenu.tsx";
import routes from "~/resources/allRoutes.ts";
import { header } from "~/resources/content/components/header.ts";
import { ROUTE_LANDING } from "~/resources/staticRoutes.ts";
import twMerge from "~/utils/tailwindMerge.ts";
import { isPathActive } from "~/utils/utilFunctions.ts";

interface SubItem {
  title: string;
  content?: string;
  href: string;
}

interface HeaderItem {
  text: string;
  overlayContent: SubItem[];
  hasSupport?: boolean;
  isList?: boolean;
}

const findActiveParentItemText = (
  currentPath: string,
  items: ReadonlyArray<HeaderItem>,
): string | null => {
  for (const item of items) {
    const isActive = item.overlayContent.some((subItem) => {
      return isPathActive(subItem.href, currentPath);
    });

    if (isActive) {
      return item.text;
    }
  }

  return null;
};

const PageHeader = ({
  includeBreadcrumbs = true,
}: {
  includeBreadcrumbs?: boolean;
}) => {
  const location = useLocation();
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Handle esc key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAll();
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

  // Close all open dropdowns
  const closeAll = () => {
    setActiveDropdownId(null);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    const isOpening = !mobileMenuOpen;
    setMobileMenuOpen(isOpening);
    if (isOpening) {
      const parentItemText = findActiveParentItemText(
        location.pathname,
        header.items,
      );
      setActiveDropdownId(parentItemText);
    } else {
      setActiveDropdownId(null);
    }
  };

  const showOverlay = activeDropdownId !== null || mobileMenuOpen;

  return (
    <>
      {showOverlay && (
        <div
          className="fixed inset-0 z-20 bg-[#282828] opacity-63"
          onClick={closeAll}
          aria-hidden="true"
        />
      )}
      <header className="relative" ref={headerRef}>
        <div className="relative">
          <div className="relative z-30 flex min-h-[72px] items-stretch justify-between bg-white pl-16 lg:px-16">
            {/* Logo and title */}
            <div className="flex items-center space-x-8">
              <Link to={ROUTE_LANDING.url}>
                <img
                  src="/logo/bund-logo.png"
                  alt="Logo des Bundes"
                  width={54}
                />
              </Link>
              <div className="ds-stack-0 ml-16 flex flex-col -space-y-4 max-lg:hidden">
                <p className="ds-stack-0 ds-label-01-bold text-xl">
                  {header.title}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="flex items-center max-lg:hidden">
              {header.items.map((item) => {
                return (
                  <DropdownMenu
                    key={item.text}
                    label={item.text}
                    hasSupport={item.hasSupport}
                    data={item.overlayContent}
                    isList={item.isList}
                    variant="desktop"
                    isExpanded={activeDropdownId === item.text}
                    onToggle={() => toggleDropdown(item.text)}
                    onItemClick={closeAll}
                    onMouseEnter={() => setActiveDropdownId(item.text)}
                    onMouseLeave={() => setActiveDropdownId(null)}
                  />
                );
              })}
            </nav>

            {/* Mobile View Controls */}
            <div className="flex items-center space-x-16 lg:hidden">
              <a
                className="border-b-[4px] border-transparent"
                href={`tel:${header.contact.number}`}
              >
                <PhoneOutlined />
              </a>
              <button
                className={twMerge(
                  "h-full cursor-pointer border-b-[4px] border-transparent px-16 hover:bg-blue-100 focus:border-b-[4px] focus:bg-blue-100",
                  mobileMenuOpen &&
                    "border-b-[4px] border-blue-800 bg-blue-100",
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
          <div
            id="mobile-menu"
            className={`absolute right-0 left-0 z-40 rounded-b-md border-t-1 border-gray-600 bg-white drop-shadow-[4px_4px_12px_rgba(0,0,0,0.06)] ${
              mobileMenuOpen ? "overflow-y-auto" : "invisible"
            }`}
            aria-hidden={!mobileMenuOpen}
          >
            {header.items.map((item) => {
              return (
                <DropdownMenu
                  key={item.text}
                  label={item.text}
                  hasSupport={item.hasSupport}
                  data={item.overlayContent}
                  isList={item.isList}
                  variant="mobile"
                  isExpanded={activeDropdownId === item.text}
                  onToggle={() => toggleDropdown(item.text)}
                  onItemClick={closeAll}
                />
              );
            })}
          </div>
        </div>

        {includeBreadcrumbs && (
          <Background backgroundColor="blue">
            <Breadcrumbs breadcrumbs={routes} useIconForHome />
          </Background>
        )}
      </header>
    </>
  );
};

export default PageHeader;
