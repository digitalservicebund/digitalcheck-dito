// Reverse proxy for Posthog

import { ActionFunction, LoaderFunction } from "react-router";
import { POSTHOG_API_HOST, POSTHOG_ASSET_HOST } from "~/utils/constants";

const posthogProxy = async (request: Request) => {
  const url = new URL(request.url);
  const hostname = url.pathname.startsWith("/ph-relay/static/")
    ? POSTHOG_ASSET_HOST
    : POSTHOG_API_HOST;

  const newUrl = new URL(url);
  newUrl.protocol = "https";
  newUrl.hostname = hostname;
  newUrl.port = "443";
  newUrl.pathname = newUrl.pathname.replace(/^\/ph-relay/, "");

  const headers = new Headers(request.headers);
  headers.set("host", hostname);
  headers.delete("accept-encoding");

  const response = await fetch(newUrl, {
    method: request.method,
    headers,
    body: request.body,
    // @ts-expect-error duplex option is not in types
    duplex: "half",
  });

  const responseHeaders = new Headers(response.headers);
  /**
   * Fix loading error:
   * @see https://posthog.com/questions/config-js-doesn-t-load-with-complete-configuration-options
   */
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");

  const data = await response.arrayBuffer();

  return new Response(data, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
};

export const loader: LoaderFunction = async ({ request }) =>
  posthogProxy(request);

export const action: ActionFunction = async ({ request }) =>
  posthogProxy(request);
