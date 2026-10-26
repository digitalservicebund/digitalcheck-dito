// These pages only render meaningful content with user input stored in the
// browser, so they are excluded from search engines.
// Unanchored at the start to also match paths prefixed with the preview base path.
const NOINDEX_PATH_PATTERNS = [
  // Documentation wizard steps
  /\/dokumentation\/.+/,
  // Pre-check result
  /\/vorpruefung\/ergebnis$/,
];

/** Used by Layout.astro (robots meta tag) and astro.config.mjs (sitemap). */
export const isNoIndexPath = (pathname: string) =>
  NOINDEX_PATH_PATTERNS.some((pattern) => pattern.test(pathname));
