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
import Footer from "~/components/Footer";
import Heading from "~/components/Heading";
import PageHeader from "~/components/PageHeader";
import RichText from "~/components/RichText";
import { siteMeta } from "~/resources/content/shared/meta";
import { ROUTE_LANDING } from "~/resources/staticRoutes";
import sharedStyles from "~/styles.css?url";
import { PLAUSIBLE_DOMAIN, PLAUSIBLE_SCRIPT } from "~/utils/constants";
import { getFeatureFlags } from "~/utils/featureFlags.server";
import { useNonce } from "~/utils/nonce";
import type { Route } from "./+types/root";
import { notFound, serverError } from "./resources/content/error";

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

  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
  );
}
