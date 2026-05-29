import { ROUTE_HANDLE_CLIENT_SIDE_ERRORS } from "~/resources/staticRoutes";

export default function trackClientSideError(error: Error) {
  const body = {
    message: error.message,
    stack: error.stack,
    url: globalThis.location.href,
  };
  fetch(ROUTE_HANDLE_CLIENT_SIDE_ERRORS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).catch((err) => {
    console.error("Failed to report error:", err);
  });
}
