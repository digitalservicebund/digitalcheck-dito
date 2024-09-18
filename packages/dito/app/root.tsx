import Background from "@digitalcheck/shared/components/Background";
import Breadcrumbs from "@digitalcheck/shared/components/Breadcrumbs";
import Button from "@digitalcheck/shared/components/Button";
import Container from "@digitalcheck/shared/components/Container";
import Footer from "@digitalcheck/shared/components/Footer";
import Heading from "@digitalcheck/shared/components/Heading";
import RichText from "@digitalcheck/shared/components/RichText";
import sharedStyles from "@digitalcheck/shared/styles.css?url";
import PhoneOutlined from "@digitalservicebund/icons/PhoneOutlined";
import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Link,
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { marked, type Tokens } from "marked";
import React, { type ReactNode } from "react";
import routes from "resources/allRoutes";
import { header, siteMeta } from "resources/content";
import {
  ROUTE_A11Y,
  ROUTE_IMPRINT,
  ROUTE_LANDING,
  ROUTE_PRIVACY,
} from "resources/staticRoutes";
import {
  PLAUSIBLE_DOMAIN as CLIENT_PLAUSIBLE_DOMAIN,
  PLAUSIBLE_SCRIPT as CLIENT_PLAUSIBLE_SCRIPT,
} from "utils/constants";
import { PLAUSIBLE_DOMAIN, PLAUSIBLE_SCRIPT } from "utils/constants.server";
import unleash, { getFeatureFlags } from "utils/featureFlags.server";
import { useNonce } from "utils/nonce";
import bundLogo from "../../shared/public/img/bund-logo.png";
import styles from "./styles.css?url";

export function loader({ request }: LoaderFunctionArgs) {
  const supportOfferingFlag = unleash.isEnabled(
    "digitalcheck.test-support-offering",
  );

  const featureFlags = getFeatureFlags();

  const requestUrl = new URL(request.url);
  const BASE_URL = requestUrl.origin.replace(
    "http://",
    requestUrl.protocol === "https:" ? "https://" : "http://",
  );

  return json({
    BASE_URL,
    PLAUSIBLE_DOMAIN,
    PLAUSIBLE_SCRIPT,
    supportOfferingFlag,
    featureFlags,
  });
}

export const meta: MetaFunction<typeof loader> = ({
  data,
  location,
  error,
}) => {
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
  const ogImage = `${BASE_URL}/assets/images/og-image.png`;

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
  { rel: "stylesheet", href: styles },
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

const renderer = new marked.Renderer();
const extension = {
  useNewRenderer: true,
  renderer: {
    link(token: Tokens.Link) {
      const { href } = token;
      const linkHtml = renderer.link.call(this, token);

      if (href.startsWith("mailto")) {
        return linkHtml.replace(
          /^<a /,
          `<a class="plausible-event-name=Mail+Click" `,
        );
      }

      if (href.startsWith("tel")) {
        return linkHtml.replace(
          /^<a /,
          `<a class="plausible-event-name=Phone+Click" `,
        );
      }

      return linkHtml;
    },
  },
};

marked.use(extension);

const footerLinks = [
  { url: ROUTE_IMPRINT.url, text: "Impressum" },
  { url: ROUTE_PRIVACY.url, text: "Datenschutzerklärung" },
  { url: ROUTE_A11Y.url, text: "Barrierefreiheit" },
  {
    url: "https://github.com/digitalservicebund/digitalcheck-apps",
    text: "Open Source Code",
    openInNewTab: true,
  },
];

const PageHeader = ({
  includeBreadcrumbs = true,
  supportOfferingFlag,
}: {
  includeBreadcrumbs?: boolean;
  supportOfferingFlag: boolean;
}) => (
  <header>
    <div className="min-h-64 p-16 flex justify-between items-center">
      <Link to={ROUTE_LANDING.url} className="ds-label-01-bold">
        <img src={bundLogo} alt="Logo des Bundes" width={54} />
      </Link>
      <span className="flex items-center">
        <span className="ds-label-02-reg text-lg max-sm:hidden">
          <span className="font-bold">{header.title}</span>
          <span className="mx-8">|</span>
          {supportOfferingFlag && (
            <>
              <Button href="/unterstuetzung" look="ghost">
                Unterstützungsangebote
              </Button>
              <span className="mx-8">|</span>
            </>
          )}
          {header.contact.msg}
        </span>
        <PhoneOutlined className="mx-8 w-18" />
        <a
          href={`tel:${header.contact.number}`}
          className="ds-link-01-bold text-lg underline plausible-event-name=Phone+Click plausible-event-position=header"
        >
          {header.contact.number}
        </a>
      </span>
    </div>
    {includeBreadcrumbs && (
      <Background backgroundColor="blue">
        <Breadcrumbs breadcrumbs={routes} useIconForHome />
      </Background>
    )}
  </header>
);

function Document({
  children,
  error,
  trackingScript,
  supportOfferingFlag,
}: Readonly<{
  children: ReactNode;
  error?: boolean;
  trackingScript: React.ReactNode;
  supportOfferingFlag: boolean;
}>) {
  const nonce = useNonce();

  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {trackingScript}
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col">
        <PageHeader
          includeBreadcrumbs={!error}
          supportOfferingFlag={supportOfferingFlag}
        />
        {children}
        <Footer links={footerLinks} />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const {
    PLAUSIBLE_DOMAIN,
    PLAUSIBLE_SCRIPT,
    supportOfferingFlag,
    featureFlags,
  } = useLoaderData<typeof loader>();

  return (
    <Document
      supportOfferingFlag={supportOfferingFlag}
      trackingScript={
        <script
          key={"app-tracking"}
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src={PLAUSIBLE_SCRIPT}
        />
      }
    >
      <main className="grow">
        <Outlet context={{ featureFlags }} />
      </main>
    </Document>
  );
}

export function ErrorBoundary() {
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
      supportOfferingFlag={false}
      trackingScript={
        <>
          <script
            key={"error-tracking"}
            defer
            data-domain={CLIENT_PLAUSIBLE_DOMAIN}
            src={CLIENT_PLAUSIBLE_SCRIPT}
          />
        </>
      }
    >
      <main id="error" className="grow">
        <div className="border-t-2 border-t-gray-400">
          <Container>
            <div className="ds-stack-8 mb-32">
              <Heading
                text={errorStatus}
                tagName="div"
                className="ds-label-01-bold"
              />
              <Heading text={errorTitle} className="ds-heading-02-reg" />
              <div className="ds-subhead">
                <RichText markdown={errorMessage} />
              </div>
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
