import { Navigate, redirect } from "react-router";

import { assetPath } from "~/utils/assetPath";

/**
 * Builds loader / meta / default-export for a route whose sole purpose is to
 * redirect. In normal SSR builds the loader issues a real 30x redirect; in the
 * static preview build (PREVIEW_BUILD=true) there is no server to do that, so
 * we prerender a page that both emits `<meta http-equiv="refresh">` (for the
 * initial HTML / no-JS) and renders `<Navigate>` (for hydrated navigation).
 */
export function createRedirectRoute(
  to: string,
  { status }: { status?: number } = {},
) {
  const isPreview = import.meta.env.PREVIEW_BUILD;

  function loader() {
    if (!isPreview) {
      return status ? redirect(to, status) : redirect(to);
    }
    return null;
  }

  function meta() {
    if (!isPreview) return [];
    return [
      {
        tagName: "meta",
        httpEquiv: "refresh",
        content: `0; url=${assetPath(to)}`,
      },
    ];
  }

  function RedirectComponent() {
    return <Navigate to={to} replace />;
  }

  return { loader, meta, RedirectComponent };
}
