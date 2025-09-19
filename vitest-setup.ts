import "@testing-library/jest-dom/vitest";

import { fetch, Headers, Request, Response } from "undici";

// Ensure global fetch APIs come from undici (Node's implementation)
// @ts-ignore
globalThis.fetch = fetch;
// @ts-ignore
globalThis.Headers = Headers;
// @ts-ignore
globalThis.Request = Request;
// @ts-ignore
globalThis.Response = Response;
globalThis.AbortController =
  globalThis.AbortController ?? require("abort-controller");
