// Documentation wizard steps only render meaningful content with user input
// stored in the browser, so they are excluded from search engines.
// Unanchored to also match paths prefixed with the preview base path.
const NOINDEX_PATH_PATTERN = /\/dokumentation\/.+/;

/** Used by Layout.astro (robots meta tag) and astro.config.mjs (sitemap). */
export const isNoIndexPath = (pathname: string) =>
  NOINDEX_PATH_PATTERN.test(pathname);
