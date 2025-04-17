import { MenuOpen, MenuOutlined } from "@digitalservicebund/icons/index";
import PhoneOutlined from "@digitalservicebund/icons/PhoneOutlined";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import Background from "~/components/Background.tsx";
import Breadcrumbs from "~/components/Breadcrumbs.tsx";
import Dropdown from "~/components/Dropdown.tsx";
import routes from "~/resources/allRoutes.ts";
import { header } from "~/resources/content/components/header.ts";
import { ROUTE_LANDING } from "~/resources/staticRoutes.ts";
import twMerge from "~/utils/tailwindMerge.ts";
import { normalizePathname } from "~/utils/utilFunctions.ts";

const findActiveParentItemText = (
  pathname: string,
  items: typeof header.items,
): string | null => {
  const cleanPathname = normalizePathname(pathname);

  for (const item of items) {
    if (item.overlayContent) {
      for (const subItem of item.overlayContent) {
        const cleanHref = normalizePathname(subItem.href);
        if (cleanHref && cleanHref === cleanPathname) {
          return item.text;
        }
      }
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
  const currentPathname = location.pathname;
  const cleanPathname = normalizePathname(currentPathname);
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

  // Toggle visibility of mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevOpen) => {
      const isOpening = !prevOpen;
      if (isOpening) {
        const parentItemText = findActiveParentItemText(
          currentPathname,
          header.items,
        );
        setActiveDropdownId(parentItemText);
      } else {
        setActiveDropdownId(null);
      }
      return isOpening;
    });
  };

  const showOverlay = activeDropdownId !== null || mobileMenuOpen;

  const getParentActive = (items: { href: string; allHrefs?: string[] }[]) => {
    return items.some((subItem) => {
      const hrefs =
        subItem.allHrefs && subItem.allHrefs.length > 0
          ? subItem.allHrefs
          : [subItem.href];
      return hrefs.some((href) => normalizePathname(href) === cleanPathname);
    });
  };

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
          <div className="relative z-30 flex min-h-[72px] items-stretch justify-between bg-white px-16">
            {/* Logo and title */}
            <div className="flex items-center space-x-8">
              <Link to={ROUTE_LANDING.url}>
                <img
                  src="/logo/bund-logo.png"
                  alt="Logo des Bundes"
                  width={54}
                />
              </Link>
              <div className="ds-stack-0 ml-24 flex flex-col -space-y-4 max-lg:hidden">
                <p className="ds-stack-0 ds-label-01-bold">{header.title}</p>
                <p className="ds-label-01 text-gray-900">{header.subTitle}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="flex items-center max-lg:hidden">
              {header.items.map((item) => {
                const isParentActive = getParentActive(item.overlayContent);
                return (
                  <Dropdown
                    key={item.text}
                    label={item.text}
                    hasSupport={item.hasSupport}
                    data={item.overlayContent}
                    isList={item.isList}
                    isActiveParent={isParentActive}
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
              <a href={`tel:${header.contact.number}`}>
                <PhoneOutlined />
              </a>
              <button
                className={twMerge(
                  "h-full cursor-pointer border-blue-800 px-16 hover:bg-blue-100 focus:border-b-[4px] focus:bg-blue-100",
                  mobileMenuOpen && "border-b-[4px] bg-blue-100",
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
            className={`absolute right-0 left-0 z-40 rounded-b-md border-t-1 border-gray-600 bg-white drop-shadow-[4px_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300 ${
              mobileMenuOpen ? "overflow-y-auto" : "invisible"
            }`}
            aria-hidden={!mobileMenuOpen}
          >
            {header.items.map((item) => {
              const isParentActive = getParentActive(item.overlayContent);
              return (
                <Dropdown
                  key={item.text}
                  label={item.text}
                  hasSupport={item.hasSupport}
                  data={item.overlayContent}
                  isList={item.isList}
                  isActiveParent={isParentActive}
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
