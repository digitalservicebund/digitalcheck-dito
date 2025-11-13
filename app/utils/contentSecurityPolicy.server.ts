import { STRAPI_MEDIA_URL } from "~/resources/constants.ts";

const noncePlaceholder = "{{nonce}}";

function getBaseContentSecurityPolicy(): string {
  const config = {
    "default-src": "'self'",
    "script-src": `'self' https://*.posthog.com https: ${noncePlaceholder}`,
    /* Allow unsafe-inline styles for HeadlessUI, see https://github.com/tailwindlabs/headlessui/issues/2615 */
    "style-src": "'self' https://*.posthog.com 'unsafe-inline'",
    "font-src": "'self' https://*.posthog.com",
    "img-src": `'self' ${STRAPI_MEDIA_URL} data: https://*.posthog.com`,
    "media-src": `'self' ${STRAPI_MEDIA_URL}`,
    "frame-ancestors":
      "'self' https://calendar.google.com https://calendar.app.google https://*.posthog.com",
    "frame-src": "'self' https://calendar.google.com",
    "connect-src": "'self' https://plausible.io https://*.posthog.com",
    "worker-src": "'self' https://*.posthog.com",
  };
  const isDevelopment = process.env.NODE_ENV === "development";
  if (isDevelopment) {
    // allow blob: URLs in development to allow hot module replacement
    config["worker-src"] += " blob:";
  }
  return Object.entries(config)
    .map(([key, value]) => `${key} ${value}`)
    .join("; ");
}

const baseCSP = getBaseContentSecurityPolicy();

export function generateContentSecurityPolicy(nonce: string) {
  return baseCSP.replace(noncePlaceholder, `'nonce-${nonce}'`);
}
