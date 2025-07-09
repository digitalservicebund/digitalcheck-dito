import { marked, type Tokens } from "marked";
import { type ReactNode, useEffect, useRef } from "react";
import {
  type HeadersFunction,
  isRouteErrorResponse,
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

import Button from "~/components/Button";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import RichText from "~/components/RichText";
import Footer from "~/layout/Footer";
import PageHeader from "~/layout/PageHeader";
import { A11Y_MESSAGE_NEW_WINDOW } from "~/resources/constants";
import { general } from "~/resources/content/shared/general";
import { siteMeta } from "~/resources/content/shared/meta";
import { ROUTE_LANDING } from "~/resources/staticRoutes";
import sharedStyles from "~/styles.css?url";
import { PLAUSIBLE_DOMAIN, PLAUSIBLE_SCRIPT } from "~/utils/constants";
import { getFeatureFlags } from "~/utils/featureFlags.server";
import { useNonce } from "~/utils/nonce";
import type { Route } from "./+types/root";
import { notFound, serverError } from "./resources/content/error";
import constructMetaTitle from "./utils/metaTitle";

export function loader({ request }: Route.LoaderArgs) {
  const featureFlags = getFeatureFlags();

  const requestUrl = new URL(request.url);
  const BASE_URL = requestUrl.origin.replace(
    "http://",
    process.env.NODE_ENV === "production" ? "https://" : "http://",
  );

  return {
    BASE_URL,
    trackingDisabled:
      process.env.TRACKING_DISABLED === "true" ||
      process.env.NODE_ENV === "development",
    featureFlags,
  };
}

export function meta({ error }: Route.MetaArgs) {
  // We're only returning the title here, so that all other routes can safely override it
  // All other meta tags are set in the Layout component
  // TODO: When updating to React 19, dropping the meta export entirely and moving to <meta> tags everywhere
  // might be the recommended approach: https://github.com/remix-run/react-router/issues/13507#issuecomment-2856332055
  return constructMetaTitle(error ? "Fehler" : undefined);
}

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
    if (!window.location.hash) {
      // If we are not scrolling to a hash section, scroll to top and focus main element
      window.scrollTo({ top: 0, behavior: "instant" });
      requestAnimationFrame(() => {
        mainRef.current?.focus();
      });
    }
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

export function Layout({ children }: Readonly<{ children: ReactNode }>) {
  const nonce = useNonce();
  const error = useRouteError();
  const rootLoaderData = useRouteLoaderData<typeof loader>("root");
  const { trackingDisabled } = rootLoaderData ?? {};
  const location = useLocation();

  let metaTitles = <></>;
  if (!error && rootLoaderData) {
    const url = `${rootLoaderData.BASE_URL}${location.pathname}`;
    const ogImage = `${rootLoaderData.BASE_URL}/images/og-image.png`;
    metaTitles = (
      <>
        <meta property="og:site_name" content={siteMeta.siteName} />
        <meta property="og:description" content={siteMeta.description} />
        <meta property="twitter:description" content={siteMeta.description} />
        <meta property="og:url" content={url} />
        <meta property="twitter:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="twitter:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
      </>
    );
  }

  // this suggests a site name to search engines
  const jsonLdMetadata = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteMeta.siteName,
    url: siteMeta.siteURL,
  };

  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={siteMeta.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMetadata) }}
        ></script>
        {metaTitles}
        <Meta />
        {!trackingDisabled && (
          <script
            key={error ? "error-tracking" : "app-tracking"}
            defer
            data-domain={PLAUSIBLE_DOMAIN}
            src={PLAUSIBLE_SCRIPT}
          />
        )}
        <Links />
      </head>
      <body className="flex min-h-screen flex-col">
        <ScrollAndFocus />
        <PageHeader includeBreadcrumbs={!error} />
        {children}
        <Footer />
        <span
          aria-hidden="true"
          className="hidden"
          id={A11Y_MESSAGE_NEW_WINDOW}
        >
          {general.a11yMessageNewWindow}
        </span>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const { featureFlags } = useLoaderData<typeof loader>();
  return (
    <main className="grow [&:has(.parent-bg-blue)]:bg-blue-100">
      {/* .parent-bg-blue can be set by child components to set the background of main to blue (e.g. used for question pages) */}
      <Outlet context={{ featureFlags }} />
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let errorStatus = "500";
  let errorTitle = serverError.title;
  let errorMessage = serverError.message;

  if (isRouteErrorResponse(error)) {
    errorStatus = `${error.status}`;
    errorTitle = error.status === 404 ? notFound.title : `${error.data}`;
    errorMessage = error.status === 404 ? notFound.message : errorMessage;
  }

  return (
    <main id="error" className="grow bg-blue-100">
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
    </main>
  );
}
