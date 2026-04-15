/**
 * Prefix a root-absolute asset path (e.g. "/logo/bund-logo.png") with Vite's
 * configured base URL. On normal builds BASE_URL is "/" so the path is
 * unchanged; on preview builds (PREVIEW_BASE_PATH) it becomes e.g.
 * "/digitalcheck-dito/previews/branch/logo/bund-logo.png" so assets resolve
 * under the GitHub Pages subdirectory.
 */
export function assetPath(path: string): string {
  const base = import.meta.env?.BASE_URL || "/";
  return base.replace(/\/$/, "") + path;
}
