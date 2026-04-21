import { redirect } from "react-router";
import { isPreview } from "./preview";

/**
 * Builds loader for a route whose sole purpose is to
 * redirect. In normal SSR builds the loader issues a real 30x redirect.
 * In the static preview build (PREVIEW_BUILD=true) there is no server to do that, so
 * we have to use `<Navigate to={to} replace />` for the redirect.
 */
export function createRedirectLoader(to: string, status?: number) {
  return () => (isPreview ? null : redirect(to, status));
}
