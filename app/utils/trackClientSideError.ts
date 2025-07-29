export default function trackClientSideError(error: Error) {
  fetch("/handle-client-side-error", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    }),
  }).catch((err) => {
    console.error("Failed to report error:", err);
  });
}
