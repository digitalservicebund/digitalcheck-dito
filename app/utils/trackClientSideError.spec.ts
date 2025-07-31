import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import trackClientSideError from "./trackClientSideError";

describe("Tracking client-side error by logging it server-side", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve(new Response(null, { status: 204 })),
    ) as never;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("sends error details to /handle-client-side-error", () => {
    const error = new Error("Test error");

    trackClientSideError(error);

    expect(fetch).toHaveBeenCalledOnce();
    expect(fetch).toHaveBeenCalledWith("/handle-client-side-error", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Test error",
        stack: error.stack,
      }),
    });
  });

  it("logs an error if fetch fails", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    (global.fetch as unknown) = vi.fn(() =>
      Promise.reject(new Error("Network error")),
    );

    const error = new Error("Another error");
    trackClientSideError(error);

    // Wait a tick to allow the .catch to be hit
    await new Promise((res) => setTimeout(res, 0));

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to report error:",
      expect.any(Error),
    );
  });
});
