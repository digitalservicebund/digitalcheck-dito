import { action } from "app/routes/handle-client-side-error";
import { ActionFunctionArgs } from "react-router";
import { describe, expect, it, vi } from "vitest";

async function actionHandler(request: Request) {
  // FIXME if possible: Explicitly setting types here because for some reason the types of the action function do not match the expected types
  return (await action({
    request,
  } as ActionFunctionArgs)) as Response;
}

describe("endpoint to handle client-side errors", () => {
  it("returns 204 for a valid JSON request", async () => {
    const payload = {
      message: "Test error message",
    };

    const request = new Request("http://localhost/handle-client-side-error", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await actionHandler(request);

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

    const response = await actionHandler(request);

    expect(response.status).toBe(400);
    expect(await response.text()).toBe("Invalid request");
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

    await actionHandler(request);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to handle client error:",
      expect.any(SyntaxError),
    );
  });
});
