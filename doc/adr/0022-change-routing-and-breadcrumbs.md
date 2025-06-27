# 22. Change routing and breadcrumb handling

## Status

- 2025-06-06: Accepted

## Context

Route configuration involves multiple elements: the file, the URL path, the title, and parent relationships
(used for breadcrumbs, sitemap, navigation). Previously, file-based routing implicitly handled the file and path,
while titles and parent info were spread across multiple files.
This led to fragmentation, inconsistencies, and a brittle breadcrumb implementation that didn’t handle trailing
slashes.

We considered switching to config-based routing as an alternative as it is the default routing approach in React Router 7.
While it allows centralized route definitions and a more flexible file structure, it introduces several downsides in our setup:

- We can't import route config from `app/routes.ts` into route files without creating circular dependencies or runtime issues.
- We would still need a separate metadata source for links, sitemap, and tests, defeating the purpose of centralizing.
- Config-based routing requires explicit naming and maintenance when files change, increasing the risk of inconsistencies.

## Decision

We continue using file-based routing for its simplicity and compatibility, but consolidate and simplify how route metadata is managed.

- All route metadata (titles, parent relationships) is centralized in a single file (`staticRoutes.ts`) which also defines the dynamic routes (e.g. questions, principles). The information in this file is used for imports, sitemap generation, and testing.
- We consistently use `<route>.tsx` for route metadata and `<route>._index.tsx` for rendering content to ensure proper breadcrumb behavior.
- Breadcrumbs are now generated using `useMatches()`. If a route exports a breadcrumb `handle`, it is used; otherwise,
  we fall back to the static metadata.

We evaluated collocating metadata in each route file but decided against it. It would complicate imports and make
aggregating dynamic routes for the sitemap or tests more difficult.

## Consequences

- `allRoutes.ts` is removed; `staticRoutes.ts` becomes the single source of truth for route metadata.
- Dynamic routes must export a `handle` to be included in the breadcrumb navigation.
- A helper function is introduced to streamline route creation, URL building, and parent relationships.
- We create missing `<route>.tsx` and `<route>._index.tsx` files and add the required exports.
