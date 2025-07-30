import { ROUTE_HANDLE_CLIENT_SIDE_ERRORS } from "~/resources/staticRoutes";
import type { ClientSideError } from "~/routes/handle-client-side-error";

export default function trackClientSideError(error: Error) {
  const body: ClientSideError = {
    message: error.message,
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
