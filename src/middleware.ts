import { allRoutes } from "@/config/routes";
import { isProduction } from "@/config/stage";
import { removeTrailingSlash, withBase } from "@/utils/path";
import { defineMiddleware } from "astro:middleware";

const stagingOnlyPaths = new Set<string>(
  allRoutes.filter((route) => route.isStagingOnly).map((route) => route.path),
);

const notFoundPath = withBase("/404");

export const onRequest = defineMiddleware((context, next) => {
  // Allow staging, preview, and development environments to access staging-only pages
  if (!isProduction) {
    return next();
  }

  const currentPath = removeTrailingSlash(context.url.pathname);
  if (stagingOnlyPaths.has(currentPath)) {
    return context.redirect(notFoundPath, 302);
  }

  return next();
});
