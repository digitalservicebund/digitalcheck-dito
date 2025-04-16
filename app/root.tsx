import { marked, type Tokens } from "marked";
import React, { type ReactNode, useEffect, useRef, useState } from "react";
import {
  type HeadersFunction,
  isRouteErrorResponse,
  Link,
  Links,
  type LinksFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useRouteError,
  useRouteLoaderData,
} from "react-router";

import {
  ExpandLessOutlined,
  ExpandMoreOutlined,
  MenuOpen,
  MenuOutlined,
} from "@digitalservicebund/icons";
import PhoneOutlined from "@digitalservicebund/icons/PhoneOutlined";
import { twMerge } from "tailwind-merge";
import Background from "~/components/Background";
import Breadcrumbs from "~/components/Breadcrumbs";
import Button from "~/components/Button";
import Container from "~/components/Container";
import Dropdown from "~/components/Dropdown.tsx";
import DropdownContentList from "~/components/DropdownContentList.tsx";
import Footer from "~/components/Footer";
import Heading from "~/components/Heading";
import RichText from "~/components/RichText";
import routes from "~/resources/allRoutes";
import { header } from "~/resources/content/components/header";
import { siteMeta } from "~/resources/content/shared/meta";
import {
  ROUTE_A11Y,
  ROUTE_IMPRINT,
  ROUTE_LANDING,
  ROUTE_PRIVACY,
  ROUTE_SITEMAP,
} from "~/resources/staticRoutes";
import sharedStyles from "~/styles.css?url";
import {
  PLAUSIBLE_DOMAIN as CLIENT_PLAUSIBLE_DOMAIN,
  PLAUSIBLE_SCRIPT as CLIENT_PLAUSIBLE_SCRIPT,
} from "~/utils/constants";
import { PLAUSIBLE_DOMAIN, PLAUSIBLE_SCRIPT } from "~/utils/constants.server";
import { getFeatureFlags } from "~/utils/featureFlags.server";
import { useNonce } from "~/utils/nonce";
import { normalizePathname } from "~/utils/utilFunctions.ts";
import type { Route } from "./+types/root";

export function loader({ request }: Route.LoaderArgs) {
  const featureFlags = getFeatureFlags();

  const requestUrl = new URL(request.url);
  const BASE_URL = requestUrl.origin.replace(
    "http://",
    process.env.NODE_ENV === "production" ? "https://" : "http://",
  );

  return {
    BASE_URL,
    PLAUSIBLE_DOMAIN,
    PLAUSIBLE_SCRIPT,
    trackingDisabled: process.env.TRACKING_DISABLED === "true",
    featureFlags,
  };
}

export const meta: Route.MetaFunction = ({ data, location, error }) => {
  const title = error ? `Fehler — ${siteMeta.title}` : siteMeta.title;

  const baseMeta = [
    { title },
    {
      name: "title",
      property: "title",
      content: title,
    },
    {
      name: "og:title",
      property: "og:title",
      content: title,
    },
    {
      name: "twitter:title",
      property: "twitter:title",
      content: title,
    },
  ];

  if (error || !data) {
    return baseMeta;
  }

  const { BASE_URL } = data;
  const url = `${BASE_URL}${location.pathname}`;
  const ogImage = `${BASE_URL}/images/og-image.png`;

  return [
    ...baseMeta,
    {
      name: "description",
      property: "description",
      content: siteMeta.description,
    },
    {
      name: "og:description",
      property: "og:description",
      content: siteMeta.description,
    },
    {
      name: "twitter:description",
      property: "twitter:description",
      content: siteMeta.description,
    },
    {
      name: "og:url",
      property: "og:url",
      content: url,
    },
    {
      name: "twitter:url",
      property: "twitter:url",
      content: url,
    },
    {
      name: "og:image",
      property: "og:image",
      content: ogImage,
    },
    {
      name: "twitter:image",
      property: "twitter:image",
      content: ogImage,
    },
    {
      name: "og:type",
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      property: "twitter:card",
      content: "summary_large_image",
    },
  ];
};

export const headers: HeadersFunction = () => ({
  // "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "geolocation=(), midi=(), sync-xhr=(), microphone=(), camera=(), magnetometer=(), gyroscope=(), fullscreen=(self), payment=(), usb=()",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: sharedStyles },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  {
    rel: "icon",
    href: "/favicon_32.png",
    type: "image/png",
    sizes: "32x32",
  },
  {
    rel: "icon",
    href: "/favicon_64.png",
    type: "image/png",
    sizes: "64x64",
  },
];

/**
 * Ensures the page scrolls to the top and moves focus to an invisible element
 * when navigating between pages.
 *
 */
export function ScrollAndFocus() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => {
      mainRef.current?.focus();
    });
  }, [pathname]);

  return (
    <div
      ref={mainRef}
      tabIndex={-1}
      className="absolute top-0 left-0 outline-hidden"
    />
  );
}

// Override the link renderer for the whole application (works because this renderer is used in <RichText />)
const renderer = new marked.Renderer();
marked.use({
  renderer: {
    link(token: Tokens.Link) {
      const { href } = token;
      const linkHtml = renderer.link.call(this, token);

      if (href.startsWith("mailto")) {
        return linkHtml.replace(
          /^<a /,
          `<a class="plausible-event-name=Mail+Click font-bold" `,
        );
      }

      if (href.startsWith("tel")) {
        return linkHtml.replace(
          /^<a /,
          `<a class="plausible-event-name=Phone+Click font-bold" `,
        );
      }

      return linkHtml;
    },
  },
});

const footerLinks = [
  { url: ROUTE_IMPRINT.url, text: "Impressum" },
  { url: ROUTE_PRIVACY.url, text: "Datenschutzerklärung" },
  { url: ROUTE_A11Y.url, text: "Barrierefreiheit" },
  {
    url: "https://github.com/digitalservicebund/digitalcheck-dito",
    text: "Open Source Code",
    openInNewTab: true,
  },
  { url: ROUTE_SITEMAP.url, text: "Sitemap" },
];

const findActiveParentItemText = (
  pathname: string,
  items: typeof header.items,
): string | null => {
  const cleanPathname = pathname.replace(/\/$/, "");

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
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(
    () => findActiveParentItemText(currentPathname, header.items),
  );

  useEffect(() => {
    const activeParentText = findActiveParentItemText(
      currentPathname,
      header.items,
    );
    setExpandedMobileItem(activeParentText);
    setMobileMenuOpen(false);
  }, [currentPathname]);

  // Close dropdown menus on viewport change
  useEffect(() => {
    const handleResize = () => {
      setIsDesktopDropdownOpen(false);
      setExpandedMobileItem(null);
      setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileSubitems = (itemText: string) => {
    setExpandedMobileItem((current) =>
      current === itemText ? null : itemText,
    );
  };

  const handleMobileItemClick = () => {
    setMobileMenuOpen(false);
  };

  const showOverlay = isDesktopDropdownOpen || mobileMenuOpen;

  function getParentActive(item: { href: string }[]): boolean {
    return (
      item.some(
        (subItem) => normalizePathname(subItem.href) === cleanPathname,
      ) ?? false
    );
  }

  return (
    <>
      {showOverlay && (
        <div
          className="fixed inset-0 z-20 bg-[#282828] opacity-63"
          onClick={() => {
            setIsDesktopDropdownOpen(false);
            setMobileMenuOpen(false);
          }}
          aria-hidden="true"
        />
      )}
      <header className="relative">
        <div className="relative">
          <div className="relative z-30 flex min-h-[72px] items-stretch justify-between bg-white px-16">
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
                <p className="">{header.subTitle}</p>
              </div>
            </div>
            {/* Regular View */}
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
                    onOpenChange={(isOpen) => {
                      if (isOpen && !isDesktopDropdownOpen)
                        setIsDesktopDropdownOpen(true);
                      if (!isOpen && isDesktopDropdownOpen)
                        setIsDesktopDropdownOpen(false);
                    }}
                    isActiveParent={isParentActive}
                  />
                );
              })}
            </nav>
            {/* Mobile View Trigger Buttons */}
            <div className="flex items-center space-x-16 lg:hidden">
              <a href={`tel:${header.contact.number}`}>
                <PhoneOutlined />
              </a>
              <button
                className="h-full cursor-pointer border-blue-800 px-16 hover:bg-blue-100 focus:border-b-[4px] focus:bg-blue-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menü öffnen/schließen"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                tabIndex={0}
              >
                {mobileMenuOpen ? <MenuOpen /> : <MenuOutlined />}
              </button>
            </div>
          </div>
          {/* Mobile View */}
          {/*
        TODO: position above breadcrumbs
        */}
          <div
            id="mobile-menu"
            className={`absolute top-full right-0 left-0 z-40 border-t-1 border-gray-200 bg-white transition-all duration-300 ${
              mobileMenuOpen
                ? "max-h-[80vh] overflow-y-auto"
                : "invisible max-h-0 overflow-hidden"
            }`}
            aria-hidden={!mobileMenuOpen}
          >
            {header.items.map((item) => (
              <div key={item.text} className="border-b-1 border-gray-200">
                <button
                  className={twMerge(
                    "ds-label-01-bold flex w-full cursor-pointer items-center justify-between border-blue-800 p-16 text-left duration-150 hover:bg-blue-100 focus:border-l-[4px] focus:bg-blue-100",
                    getParentActive(item.overlayContent) &&
                      "border-l-[4px] bg-blue-100",
                  )}
                  onClick={() => toggleMobileSubitems(item.text)}
                  aria-expanded={expandedMobileItem === item.text}
                  aria-controls={`mobile-subitems-${item.text}`}
                >
                  {item.text}
                  {expandedMobileItem === item.text ? (
                    <ExpandLessOutlined />
                  ) : (
                    <ExpandMoreOutlined />
                  )}
                </button>

                {expandedMobileItem === item.text && (
                  <div
                    id={`mobile-subitems-${item.text}`}
                    role="region"
                    aria-label={item.text}
                  >
                    {/*
                  TODO: consistent hasSupport
*/}
                    {item.hasSupport && (
                      <div className="px-16">
                        <div className="ds-label-02-reg px-16 pt-16 pb-24 text-gray-900">
                          {header.contact.msgMobile}
                          <a
                            href={`tel:${header.contact.number}`}
                            className="plausible-event-name=Phone+Click plausible-event-position=header ds-link-02-reg ml-8"
                          >
                            {header.contact.number}
                          </a>
                        </div>
                        <div className="border-b-1 border-gray-900" />
                      </div>
                    )}

                    <div
                      className="px-16"
                      role="menu"
                      aria-label={`${item.text} Unterpunkte`}
                    >
                      <DropdownContentList
                        data={item.overlayContent}
                        isList={item.isList}
                        onItemClick={handleMobileItemClick}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
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

function Document({
  children,
  error,
  trackingScript,
}: Readonly<{
  children: ReactNode;
  error?: boolean;
  trackingScript?: React.ReactNode;
}>) {
  const nonce = useNonce();

  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {trackingScript}
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen flex-col">
        <ScrollAndFocus />
        <PageHeader includeBreadcrumbs={!error} />
        {children}
        <Footer links={footerLinks} />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const { PLAUSIBLE_DOMAIN, PLAUSIBLE_SCRIPT, trackingDisabled, featureFlags } =
    useLoaderData<typeof loader>();

  return (
    <Document
      trackingScript={
        !trackingDisabled && (
          <script
            key={"app-tracking"}
            defer
            data-domain={PLAUSIBLE_DOMAIN}
            src={PLAUSIBLE_SCRIPT}
          />
        )
      }
    >
      {/* .parent-bg-blue can be set by child components to set the background of main to blue (e.g. used for question pages) */}
      <main className="grow [&:has(.parent-bg-blue)]:bg-blue-100">
        <Outlet context={{ featureFlags }} />
      </main>
    </Document>
  );
}

export function ErrorBoundary() {
  const loaderData = useRouteLoaderData<typeof loader>("root");
  const error = useRouteError();

  let errorStatus = `${500}`;
  let errorTitle = "Interner Serverfehler";
  let errorMessage = `Es tut uns leid, aber etwas ist schief gelaufen.
Bitte versuchen Sie es später erneut. Wenn das Problem weiterhin besteht, kontaktieren Sie uns unter [digitalcheck@digitalservice.bund.de](mailto:digitalcheck@digitalservice.bund.de) oder [0151/40 76 78 39](tel:+4915140767839).

Vielen Dank für Ihr Verständnis.`;

  if (isRouteErrorResponse(error) && error.status === 404) {
    errorStatus = `${error.status}`;
    errorTitle = "Seite konnte nicht gefunden werden";
    errorMessage = `Es tut uns leid. Diese Seite gibt es nicht mehr oder ihr Name wurde geändert.

- Wenn Sie die URL direkt eingegeben haben, überprüfen Sie die Schreibweise.
- Versuchen Sie, die Seite von der Startseite aus erneut zu finden.`;
  } else if (isRouteErrorResponse(error)) {
    errorStatus = `${error.status}`;
    errorTitle = `${error.data}`;
  }

  return (
    <Document
      error={true}
      trackingScript={
        loaderData?.trackingDisabled && (
          <script
            key={"error-tracking"}
            defer
            data-domain={CLIENT_PLAUSIBLE_DOMAIN}
            src={CLIENT_PLAUSIBLE_SCRIPT}
          />
        )
      }
    >
      <main id="error" className="grow">
        <div className="border-t-2 border-t-gray-400">
          <Container>
            <div className="ds-stack ds-stack-8 mb-32">
              <span className="ds-label-01-bold">{errorStatus}</span>
              <Heading text={errorTitle} className="ds-heading-02-reg" />
              <RichText markdown={errorMessage} className="ds-subhead" />
            </div>
            <Button
              id="error-back-button"
              text="Zurück zur Startseite"
              href={ROUTE_LANDING.url}
              look="primary"
            ></Button>
          </Container>
        </div>
      </main>
    </Document>
  );
}
