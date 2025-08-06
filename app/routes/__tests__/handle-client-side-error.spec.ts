import {
  action,
  type ClientSideError,
} from "app/routes/handle-client-side-error";
import { describe, expect, it, vi } from "vitest";

describe("endpoint to handle client-side errors", () => {
  it("logs error message and stack of client-side error to console", async () => {
    const clientSideError: ClientSideError = {
      message: "Something went wrong.",
      stack: "Something went wrong: stack here.",
    };

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const request = new Request("http://localhost/handle-client-side-error", {
      method: "POST",
      body: JSON.stringify(clientSideError),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await action({
      context: {},
      params: {},
      request,
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      `Client-side error: ${clientSideError.message}`,
      clientSideError.stack,
    );
  });

  it("logs error to console on invalid request", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const request = new Request("http://localhost/handle-client-side-error", {
      method: "POST",
      body: "bad json",
      headers: {
        "Content-Type": "application/json",
      },
    });

    await action({
      context: {},
      params: {},
      request,
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to handle client error:",
      expect.any(SyntaxError),
    );
  });

  it("returns 204 for a valid JSON request", async () => {
    const payload = {
      message: "Test error message",
      stack: "Error: stack trace",
    };

    const request = new Request("http://localhost/handle-client-side-error", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await action({
      context: {},
      params: {},
      request,
    });

    expect(response.status).toBe(204);
    expect(await response.text()).toBe(""); // No Content
  });

  it("returns 400 for an invalid JSON request", async () => {
    const badBody = "{ invalid json }";

    const request = new Request("http://localhost/handle-client-side-error", {
      method: "POST",
      body: badBody,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await action({
      context: {},
      params: {},
      request,
    });

    expect(response.status).toBe(400);
    expect(await response.text()).toBe("Invalid request");
  });
});
