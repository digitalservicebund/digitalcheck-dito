export function loader() {
  // eslint-disable-next-line @typescript-eslint/only-throw-error
  throw new Response("Not found", { status: 404 });
}

// Needed for the error to bubble up to the ErrorBoundary
export default function NotFound() {}
