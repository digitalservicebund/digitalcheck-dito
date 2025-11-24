import { EntryContext } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import handleRequest, { shouldRedirect } from "~/entry.server.tsx";

describe("handleRequest redirect", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createRequest = (url: string, host: string) =>
    new Request(url, {
      headers: {
        host,
        "user-agent": "test-agent",
      },
    });

  test("redirects non-www domain erarbeiten.digitalcheck.bund.de", async () => {
    const req = createRequest(
      "https://erarbeiten.digitalcheck.bund.de/some/path?query=1",
      "erarbeiten.digitalcheck.bund.de",
    );

    const response = (await handleRequest(
      req,
      200,
      new Headers(),
      {} as EntryContext,
    )) as Response;
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe(
      "https://digitalcheck.bund.de/some/path?query=1",
    );
  });

  test("redirects www.erarbeiten.digitalcheck.bund.de", async () => {
    const req = createRequest(
      "https://www.erarbeiten.digitalcheck.bund.de/another/path?x=2",
      "www.erarbeiten.digitalcheck.bund.de",
    );

    const response = (await handleRequest(
      req,
      200,
      new Headers(),
      {} as EntryContext,
    )) as Response;

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe(
      "https://digitalcheck.bund.de/another/path?x=2",
    );
  });

  for (const url of [
    "https://digitalcheck.bund.de",
    "https://www.digitalcheck.bund.de",
    "http://localhost:9000",
  ]) {
    test(`would not redirect ${url}`, () => {
      const host = new URL(url).host;
      const request = createRequest(url, host);
      expect(shouldRedirect(request)).toBe(false);
    });
  }
});
