# 22. Change routing and breadcrumb handling

## Status

- 2025-06-06: Accepted

## Context

Route configuration involves multiple elements: the route file, the URL path, the title (built and exported in `meta` with a prefix, e.g. used for tabs), the
breadcrumb (link with title without the prefix) and parent relationships (used for breadcrumbs navigation, sitemap, navigation).
Currently, file-based routing implicitly handles the file and path, while titles and parent info are spread across multiple files.
This leads to fragmentation, inconsistencies, and a brittle breadcrumb implementation that didn’t handle trailing slashes.

We considered switching to config-based routing as an alternative as it is the default routing approach in React Router 7.
While it allows centralized route definitions and a more flexible file structure, it introduces several downsides in our setup:

- One can't import route config from `app/routes.ts` into route files without creating circular dependencies or runtime issues.
  We would thus still need a separate metadata source for links, the sitemap, and tests, defeating the purpose of centralizing.
- Config-based routing requires a consistent naming scheme and maintenance when files change, increasing the risk of inconsistencies.

## Decision

We continue using file-based routing for its simplicity as it's not proven too cumbersome, but consolidate and simplify how route metadata is managed.

- All route metadata (titles, parent relationships) is centralized in a single file (`staticRoutes.ts`)
  which also defines the dynamic routes with fixed paths (e.g. questions, principles).
  The information in this file is used for breadcrumbs, links, sitemap generation, and testing.
- Breadcrumbs are now generated using `useMatches()`. If a route exports a breadcrumb `handle`, it is used; otherwise, we fall back to the static metadata.
- We consistently use `<route>.tsx` for the `handle` export and to ensure proper breadcrumb behavior, while `<route>._index.tsx` renders the content and exports the title.

We evaluated collocating metadata in each route file but decided against it. It would complicate imports and make
aggregating dynamic routes for the sitemap or tests more difficult.

## Consequences

- We remove `allRoutes.ts` and make `staticRoutes.ts` the single source of truth for route metadata.
- Completely dynamic routes (e.g. examples of legislation) must export a `handle` for the breadcrumb navigation.
- We introduce a helper function to streamline route creation, URL building, and parent relationships.
- We create missing `<route>.tsx` and `<route>._index.tsx` files and add the required exports.
- Breadcrumbs work with trailing slashes
- The breadcrumbs implementation is simpler
