import { marked, type Tokens } from "marked";
import { type ReactNode, useEffect, useRef } from "react";
import {
  type HeadersFunction,
  isRouteErrorResponse,
  Links,
  type LinksFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useRouteError,
  useRouteLoaderData,
} from "react-router";

import { LinkButton } from "~/components/Button";
import Container from "~/components/Container";
import Heading from "~/components/Heading";
import MetaTitle from "~/components/Meta";
import RichText from "~/components/RichText";
import Footer from "~/layout/Footer";
import PageHeader from "~/layout/PageHeader";
import { siteMeta } from "~/resources/content/shared/meta";
import { ROUTE_LANDING } from "~/resources/staticRoutes";
// Import CSS directly so React Router will handle it via the manifest
import "~/styles.css";
import { PLAUSIBLE_DOMAIN, PLAUSIBLE_SCRIPT } from "~/utils/constants";
import { POSTHOG_KEY } from "~/utils/constants.server";
import { getFeatureFlags } from "~/utils/featureFlags.server";
import { useNonce } from "~/utils/nonce";
import trackClientSideError from "~/utils/trackClientSideError";
import type { Route } from "./+types/root";
import { PHProvider } from "./providers/PosthogProvider";
import { genericError, notFoundError } from "./resources/content/error";
import { ZFL_ROUTE_PREFIX } from "./zfl/constants";

export function loader({ request }: Route.LoaderArgs) {
  const featureFlags = getFeatureFlags();

  const requestUrl = new URL(request.url);
  const BASE_URL = requestUrl.origin.replace(
    "http://",
    process.env.NODE_ENV === "production" ? "https://" : "http://",
  );

  return {
    BASE_URL,
    trackingEnabled: process.env.TRACKING_ENABLED === "true",
    posthogEnabled: process.env.POSTHOG_ENABLED === "true",
    featureFlags,
    posthogKey: POSTHOG_KEY,
  };
}

export const headers: HeadersFunction = () => ({
  // "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "geolocation=(), midi=(), sync-xhr=(), microphone=(), camera=(), magnetometer=(), gyroscope=(), fullscreen=(self), payment=(), usb=()",
});

export const links: LinksFunction = () => [
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
      // If we are not scrolling to a hash section, scroll to top and focus the main element
      window.scrollTo({ top: 0, behavior: "instant" });
      requestAnimationFrame(() => {
        /*
         Only focus the main element if another element is not already focused.
         This is necessary for tabs, where the user should be able to keep switching tabs without losing focus.
        */
        if (!document.activeElement) {
          mainRef.current?.focus();
        }
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
          '<a class="plausible-event-name=Mail+Click" ',
        );
      }

      if (href.startsWith("tel")) {
        return linkHtml.replace(
          /^<a /,
          '<a class="plausible-event-name=Phone+Click" ',
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
  const { trackingEnabled, posthogEnabled, posthogKey } = rootLoaderData ?? {};
  const location = useLocation();

  const isZFLPage = location.pathname.startsWith(`/${ZFL_ROUTE_PREFIX}`);

  let metaProperties = <></>;
  if (!error && rootLoaderData) {
    const url = `${rootLoaderData.BASE_URL}${location.pathname}`;
    const ogImage = `${rootLoaderData.BASE_URL}/images/og-image.png`;
    metaProperties = (
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
        {metaProperties}
        {trackingEnabled && (
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
        <PHProvider posthogEnabled={posthogEnabled} posthogKey={posthogKey}>
          <ScrollAndFocus />
          {!isZFLPage && <PageHeader />}
          {children}
          {!isZFLPage && <Footer />}
          <ScrollRestoration nonce={nonce} />
          <Scripts nonce={nonce} />
        </PHProvider>
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let errorStatus;
  let errorTitle = genericError.title;
  let errorMessage = genericError.message;

  if (isRouteErrorResponse(error)) {
    errorStatus = `${error.status}`;

    if (error.status === 404) {
      errorTitle = notFoundError.title;
      errorMessage = notFoundError.message;
    }
  } else if (error instanceof Error && typeof window !== "undefined") {
    // The error should be a native JS runtime error, not a route error response from the server
    // window is only defined on client-side making sure the code is running in the browser
    trackClientSideError(error);
  }

  return (
    <main id="error" className="grow bg-blue-100">
      <MetaTitle prefix="Fehler" />
      <Container>
        <div className="ds-stack ds-stack-8 mb-32">
          {errorStatus && (
            <span className="ds-label-01-bold">{errorStatus}</span>
          )}
          <Heading text={errorTitle} className="ds-heading-02-reg" />
          <RichText markdown={errorMessage} className="ds-subhead" />
        </div>
        <LinkButton id="error-back-button" to={ROUTE_LANDING.url}>
          Zurück zur Startseite
        </LinkButton>
      </Container>
    </main>
  );
}
