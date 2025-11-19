import crypto from "node:crypto";
import { PassThrough } from "node:stream";

import { createReadableStreamFromReadable } from "@react-router/node";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { EntryContext, redirectDocument, ServerRouter } from "react-router";
import { generateContentSecurityPolicy } from "~/utils/contentSecurityPolicy.server.ts";
import logResponseStatus from "~/utils/logging";
import { NonceProvider } from "~/utils/nonce";
/*
 We need to import the mock server here (which unfortunately also happens in production)
 because we couldn't get the mocks to register in time otherwise in CI,
 as awaiting a dynamic esm import did not work with npm run build & npm run start.
*/
import { mockServer } from "./mocks/node";

if (
  process.env.MOCK_EXTERNAL_APIS === "true" &&
  process.env.NODE_ENV !== "production"
) {
  console.warn("Mocking external APIs.");
  mockServer.listen({
    onUnhandledRequest(request, print) {
      const url = new URL(request.url);

      if (url.hostname.includes("strapiapp.com")) {
        return;
      }

      print.warning();
    },
  });
}

// Reject/cancel all pending promises after 5 seconds
export const streamTimeout = 5000;

export function shouldRedirect(request: Request): boolean {
  const host = request.headers.get("host");
  return host?.endsWith("erarbeiten.digitalcheck.bund.de") ?? false;
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
) {
  const startTime = Date.now();
  const isReadinessCheck =
    request.headers.get("X-Readiness-Check") === "readiness-check";
  const userAgent = request.headers.get("user-agent");

  if (shouldRedirect(request)) {
    const url = new URL(request.url);
    const requestUri = url.pathname + url.search;

    const movedPermanentlyCode = 301;
    return redirectDocument("https://digitalcheck.bund.de" + requestUri, {
      status: movedPermanentlyCode,
    });
  }

  if (isReadinessCheck || isbot(userAgent)) {
    return handleBotRequest(
      request,
      responseStatusCode,
      responseHeaders,
      reactRouterContext,
      startTime,
    );
  } else {
    return handleBrowserRequest(
      request,
      responseStatusCode,
      responseHeaders,
      reactRouterContext,
      startTime,
    );
  }
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  startTime: number,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={reactRouterContext} url={request.url} />,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          reject(error);
        },
        onError() {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            logResponseStatus(
              responseStatusCode,
              request,
              startTime,
              true,
              "",
              "regular",
            );
          }
        },
      },
    );

    // Automatically timeout the React renderer after 6 seconds, which ensures
    // React has enough time to flush down the rejected boundary contents
    setTimeout(abort, streamTimeout + 1000);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  startTime: number,
) {
  const nonce = crypto.randomBytes(16).toString("hex");

  responseHeaders.set(
    "Content-Security-Policy",
    generateContentSecurityPolicy(nonce),
  );

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <NonceProvider value={nonce}>
        <ServerRouter
          context={reactRouterContext}
          url={request.url}
          nonce={nonce}
        />
      </NonceProvider>,
      {
        nonce,
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    // Automatically timeout the React renderer after 6 seconds, which ensures
    // React has enough time to flush down the rejected boundary contents
    setTimeout(abort, streamTimeout + 1000);
  })
    .then((response) => {
      logResponseStatus(
        (response as Response).status,
        request,
        startTime,
        false,
        "",
        "regular",
      );
      return response;
    })
    .catch((error) => {
      logResponseStatus(
        500,
        request,
        startTime,
        false,
        (error as Error).message,
        "regular",
      );
      throw error;
    });
}
