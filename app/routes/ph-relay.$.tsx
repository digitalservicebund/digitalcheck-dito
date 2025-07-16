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

  const response = await fetch(newUrl, {
    method: request.method,
    headers,
    body: request.body,
    // @ts-expect-error duplex option is not in types
    duplex: "half",
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
};

export const loader: LoaderFunction = async ({ request }) =>
  posthogProxy(request);

export const action: ActionFunction = async ({ request }) =>
  posthogProxy(request);
