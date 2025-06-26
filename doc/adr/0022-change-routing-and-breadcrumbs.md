# 22. Change routing and breadcrumb handling

## Status

- 2025-06-06: Accepted

## Context

For each route, we need to configure and connect several things: a file, a path/URL, a title, and if it has, it's parent.

Currently "implicitly" defined through file-based routing (i.e. the route URL results from the file location and name):

- The route file
- The route path/URL

What we refer to as the "route information" is configured explicitly in the code:

- The route title (exported in each routes `meta` and used e.g. for breadcrumbs, search engines and tabs)
- The route parent (needed for sitemap and currently for breadcrumbs)

### Issues with the current route and breadcrumb setup

- The configuration of routes is divided across too many files:
  - `app/routes.ts` is required by React Router and manages the routing configuration
  - `app/resources/staticRoutes.ts` connects the route URLs with their information
  - `app/resources/allRoutes.ts` extends the "static routes" and adds precheck question and example principle routes
- `<route>.tsx` and `<route>._index.tsx` are used inconsistently for a parent routes content
- Breadcrumbs do not work with trailing slashes at the end of the URL
- Breadcrumb implementation is unnecessarily complex

### General considerations

- React Router 7 went back do config based routing as the default in contrast to Remix 2's file based routing (which is also still supported)
- We can't just move all route information to `app/routes.ts`, as we can't use exports from this file in route files (leads to errors)
- We need some kind of collection of all routes to be used in tests and the sitemap
- From the two previous points follows that the URL needs to be configured twice: Once for the router and once to be imported for the links/buttons/tests/sitemap
- Using `useMatches()` to build the breadcrumbs requires the existence of `<route>.tsx` if there are `<route>.<children>.tsx`

### Success conditions fo the new implementation

- Works with trailing slashes at the end of the URL
- Reduces number of route files (optimally to one, two is acceptable)
- Consistent approach to route files and route information

#### Nice-to-haves

- No extraneous route files just for breadcrumbs
- Works for current sitemap implementation
- Simpler breadcrumbs implementation
- Better setup for SSG

## Decision

We keep using file-based routing as it works well enough at the moment. Config-based routing in contrast would follow the default from the documentation, be more flexible in the file structure and deliver a central collection of routes and their information (including parent-child relationships). It would however come with some drawbacks:

- It leads to more explicit configuration code
- We couldn't export this configuration straight from `app/routes.ts` (as mentioned in the context), so it still requires an extra route information file and a mapping between the two.
- We would need to handle the file names (naming schema and updating the configuration when files change).

We keep one extra file in addition to `app/routes.ts` to have a central collection of all routes and their information to be used for imports, tests and sitemap generation. Fixed "dynamic" routes (questions, principles) will be created in that same file. We also considered collocating the route information in each route file, but it would make getting a list of fixed "dynamic" routes (questions, principles) more complicated as well as complicate imports for links etc.

We unify route configuration by always using `<route>.tsx` to handle the title etc. and `<route>._index.tsx` for the rendered content (necessary for correct breadcrumb handling of the parent too).

We switch to `useMatches()` to create the breadcrumbs. When a route exports a handle with a breadcrumb this is used, otherwise the statically defined routes are used to find the title.

## Consequences

We remove `app/resources/allRoutes.ts` and simplify to `app/resources/staticRoutes.ts` only and only use the exports from that file.

All dynamic routes that are not part of `app/resources/staticRoutes.ts` need to export a handle with a breadcrumb. This only affects example pages at the time of writing.

We create a helper function for route creation that streamlines URL building and parent definitions and improve the naming of some select routes.

We will create the missing `<route>.tsx` and `<route>._index.tsx` files and add the required exports.

### Success conditions fo the new implementation

- [x] Works with trailing slashes at the end of the URL
- [x] Reduce number of route files (optimally to one, two is acceptable)
- [x] Consistent approach to route files and route information

#### Nice-to-haves

- [ ] No extraneous route files just for breadcrumbs
- [x] Works for current sitemap implementation
- [x] Simpler breadcrumbs implementation
- [x] Better setup for SSG
