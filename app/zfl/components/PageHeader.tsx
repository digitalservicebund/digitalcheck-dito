import { MenuOpen, MenuOutlined } from "@digitalservicebund/icons";
import PhoneOutlined from "@digitalservicebund/icons/PhoneOutlined";
import { useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { twJoin } from "tailwind-merge";
import Container from "~/components/Container";
import RichText from "~/components/RichText";
import { useResize } from "~/hooks/deviceHook";
import twMerge from "~/utils/tailwindMerge.ts";
import { ZFL_EMAIL, ZFL_PHONE, ZFL_TITLE } from "../constants";
import {
  ROUTE_ZFL_BEGLEITUNGEN,
  ROUTE_ZFL_LANDING,
  ROUTE_ZFL_TRAININGS,
} from "../routes";

const headerItems = [ROUTE_ZFL_BEGLEITUNGEN, ROUTE_ZFL_TRAININGS];

const PageHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Reset states on navigation or viewport changes
  useResize(() => {
    setMobileMenuOpen(false);
  }, false);

  // Opens and closes mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const basicLinkClasses = "flex items-center hover:bg-blue-100";
  const activeClasses = "border-blue-800 bg-blue-100";

  return (
    <header className="relative" ref={headerRef}>
      <div className="relative z-30 flex h-[72px] justify-between border-b-2 border-blue-300 bg-white pl-16 md:px-16">
        {/* Logo and title */}
        <Link
          to={ROUTE_ZFL_LANDING.url}
          className="flex items-center space-x-8"
        >
          <img src="/logo/bund-logo.png" alt="Logo des Bundes" width={54} />
          <p className="ds-label-01-bold ml-16 flex flex-col text-xl max-lg:hidden">
            {ZFL_TITLE}
          </p>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="flex items-center max-md:hidden"
          data-testid="desktop-nav"
        >
          {headerItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={twMerge(
                basicLinkClasses,
                "ds-label-01-reg relative h-full border-b-[4px] border-transparent px-16 whitespace-nowrap",
                currentPath === item.url && activeClasses,
              )}
            >
              {item.title}
            </Link>
          ))}
          <div className="ds-label-01-reg px-16 text-gray-800">
            Kontakt:{" "}
            <a href={ZFL_EMAIL.url} className="ds-link-01-reg">
              {ZFL_EMAIL.display}
            </a>
          </div>
        </nav>

        {/* Mobile View Controls */}
        <div className="flex items-center space-x-16 md:hidden">
          <a
            href={ZFL_PHONE.url}
            className="border-b-4 border-transparent"
            aria-label={ZFL_PHONE.display}
          >
            <PhoneOutlined />
          </a>
          <button
            className={twMerge(
              "h-full border-b-4 border-transparent px-16 hover:bg-blue-100",
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
          "absolute right-0 left-0 z-40 bg-white drop-shadow-[4px_4px_12px_rgba(0,0,0,0.06)]",
          mobileMenuOpen ? "overflow-y-auto" : "invisible",
        )}
        aria-hidden={!mobileMenuOpen}
      >
        {headerItems.map((item) => (
          <Link
            to={item.url}
            className={twMerge(
              basicLinkClasses,
              "ds-label-01-reg border-l-[4px] border-transparent p-16",
              currentPath === item.url && activeClasses,
            )}
            key={item.title}
          >
            {item.title}
          </Link>
        ))}
        <div className="ds-label-01-reg ml-4 p-16 text-gray-800">
          Kontakt:{" "}
          <a href={ZFL_EMAIL.url} className="ds-link-01-reg">
            {ZFL_EMAIL.display}
          </a>
        </div>
      </nav>
      <noscript>
        <div className="bg-yellow-200">
          <Container className="py-4">
            <RichText markdown="**Menü funktioniert nicht?** Erlauben Sie JavaScript in den Browsereinstellungen oder navigieren Sie über den [Footer](#footer)." />
          </Container>
        </div>
      </noscript>
    </header>
  );
};

export default PageHeader;
